// netlify/functions/hubspot-contact.js

const HUBSPOT_BASE = 'https://api.hubapi.com'

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      // optional hardening
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(body),
  }
}

async function hsFetch(path, { method = 'GET', body } = {}, token) {
  const res = await fetch(`${HUBSPOT_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`, // Private App token as Bearer :contentReference[oaicite:1]{index=1}
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text || null
  }

  return { ok: res.ok, status: res.status, data }
}

async function findContactIdByEmail(email, token) {
  const payload = {
    filterGroups: [
      {
        filters: [{ propertyName: 'email', operator: 'EQ', value: email }],
      },
    ],
    properties: ['email'],
    limit: 1,
  }

  const r = await hsFetch('/crm/v3/objects/contacts/search', { method: 'POST', body: payload }, token)
  if (!r.ok) return null

  const id = r?.data?.results?.[0]?.id
  return id || null
}

async function upsertContact({ email, firstname, lastname, phone, company, website }, token) {
  // Try create first
  const createPayload = {
    properties: {
      email,
      firstname: firstname || '',
      lastname: lastname || '',
      phone: phone || '',
      company: company || '',
      website: website || '',
    },
  }

  const created = await hsFetch('/crm/v3/objects/contacts', { method: 'POST', body: createPayload }, token)
  if (created.ok) return created.data?.id

  // If contact already exists, HubSpot often returns 409 conflict.
  // We'll just search by email and use that ID.
  if (created.status === 409) {
    const existingId = await findContactIdByEmail(email, token)
    if (existingId) {
      // Optional: update the existing contact with latest values
      const updatePayload = {
        properties: {
          firstname: firstname || '',
          lastname: lastname || '',
          phone: phone || '',
          company: company || '',
          website: website || '',
        },
      }
      await hsFetch(`/crm/v3/objects/contacts/${existingId}`, { method: 'PATCH', body: updatePayload }, token)
      return existingId
    }
  }

  // Otherwise bubble error
  throw new Error(
    typeof created.data === 'string'
      ? created.data
      : created.data?.message || 'Failed to create contact'
  )
}

async function createNoteOnContact(contactId, noteBody, token) {
  const payload = {
    properties: {
      hs_note_body: noteBody,
      hs_timestamp: Date.now(), // required by Notes API (common requirement) :contentReference[oaicite:2]{index=2}
    },
    associations: [
      {
        to: { id: String(contactId) },
        types: [
          {
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: 202, // Note -> Contact (HubSpot-defined) :contentReference[oaicite:3]{index=3}
          },
        ],
      },
    ],
  }

  const r = await hsFetch('/crm/v3/objects/notes', { method: 'POST', body: payload }, token)
  if (!r.ok) {
    throw new Error(r?.data?.message || 'Failed to create note')
  }
  return r.data?.id
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method Not Allowed' })
  }

  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN
  if (!token) {
    return json(500, { error: 'Missing HUBSPOT_PRIVATE_APP_TOKEN env var' })
  }

  let body = {}
  try {
    body = event.body ? JSON.parse(event.body) : {}
  } catch {
    return json(400, { error: 'Invalid JSON' })
  }

  const {
    email,
    firstName,
    lastName,
    phone,
    company,
    website,
    projectType,
    budget,
    timeline,
    message,
  } = body || {}

  if (!email || !firstName || !lastName || !message) {
    return json(400, { error: 'Missing required fields' })
  }

  try {
    const contactId = await upsertContact(
      {
        email,
        firstname: firstName,
        lastname: lastName,
        phone,
        company,
        website,
      },
      token
    )

    const noteLines = [
      `<b>New Website Lead</b>`,
      ``,
      `<b>Name:</b> ${firstName} ${lastName}`,
      `<b>Email:</b> ${email}`,
      phone ? `<b>Phone:</b> ${phone}` : null,
      company ? `<b>Company:</b> ${company}` : null,
      website ? `<b>Website:</b> ${website}` : null,
      projectType ? `<b>Project Type:</b> ${projectType}` : null,
      budget ? `<b>Budget:</b> ${budget}` : null,
      timeline ? `<b>Timeline:</b> ${timeline}` : null,
      ``,
      `<b>Message:</b><br/>${String(message).replace(/\n/g, '<br/>')}`,
    ].filter(Boolean)

    await createNoteOnContact(contactId, noteLines.join('<br/>'), token)

    return json(200, { ok: true })
  } catch (err) {
    return json(500, { error: 'HubSpot submission failed' })
  }
}
