// netlify/functions/hubspot-formflow.js
const HUBSPOT_BASE = 'https://api.hubapi.com'

function resp(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  }
}

async function hsFetch(path, { method = 'GET', body } = {}, token) {
  const res = await fetch(`${HUBSPOT_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
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

function normalizeKey(k) {
  return String(k || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^\w]/g, '_')
}

function pickValue(flat, candidates = []) {
  for (const c of candidates) {
    const v = flat[c]
    if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim()
  }
  return ''
}

function flattenUnknownPayload(input) {
  // Formflow “Flatten Key–Value” should already be flat, but handle nested just in case.
  if (!input || typeof input !== 'object') return {}
  const out = {}

  const walk = (obj, prefix = '') => {
    if (!obj || typeof obj !== 'object') return
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}.${k}` : k
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        walk(v, key)
      } else {
        out[normalizeKey(key)] = Array.isArray(v) ? v.join(', ') : v
      }
    }
  }

  walk(input)
  return out
}

async function findContactIdByEmail(email, token) {
  const payload = {
    filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
    properties: ['email'],
    limit: 1,
  }
  const r = await hsFetch('/crm/v3/objects/contacts/search', { method: 'POST', body: payload }, token)
  return r.ok ? (r?.data?.results?.[0]?.id || null) : null
}

async function upsertContact({ email, firstname, lastname, phone, company, website }, token) {
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

  // If already exists, locate by email and update
  if (created.status === 409) {
    const existingId = await findContactIdByEmail(email, token)
    if (existingId) {
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

  throw new Error(created?.data?.message || 'Failed to create contact')
}

async function createNoteOnContact(contactId, noteHtml, token) {
  const payload = {
    properties: {
      hs_note_body: noteHtml,
      hs_timestamp: Date.now(),
    },
    associations: [
      {
        to: { id: String(contactId) },
        types: [
          {
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: 202, // Note -> Contact
          },
        ],
      },
    ],
  }

  const r = await hsFetch('/crm/v3/objects/notes', { method: 'POST', body: payload }, token)
  if (!r.ok) throw new Error(r?.data?.message || 'Failed to create note')
  return r.data?.id
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return resp(405, { error: 'Method Not Allowed' })

  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN
  if (!token) return resp(500, { error: 'Missing HUBSPOT_PRIVATE_APP_TOKEN env var' })

  let incoming = {}
  try {
    incoming = event.body ? JSON.parse(event.body) : {}
  } catch {
    return resp(400, { error: 'Invalid JSON' })
  }

  // Normalize everything to a flat {key:value} map
  const flat = flattenUnknownPayload(incoming)

  // Try to extract common fields from Formflow
  const email =
    pickValue(flat, ['email']) ||
    // fallback: any key containing "email"
    (Object.entries(flat).find(([k, v]) => k.includes('email') && String(v).includes('@'))?.[1] || '')

  // Name can come through as first/last or full name
  let firstName = pickValue(flat, ['first_name', 'firstname', 'given_name'])
  let lastName = pickValue(flat, ['last_name', 'lastname', 'family_name'])

  const fullName =
    pickValue(flat, ['name', 'full_name']) ||
    (Object.entries(flat).find(([k]) => k.includes('name') && !k.includes('file'))?.[1] || '')

  if ((!firstName || !lastName) && fullName) {
    const parts = String(fullName).trim().split(/\s+/)
    if (!firstName) firstName = parts[0] || ''
    if (!lastName) lastName = parts.slice(1).join(' ') || ''
  }

  const phone = pickValue(flat, ['phone', 'phone_number', 'mobile'])
  const company = pickValue(flat, ['company', 'company_name', 'business'])
  const website = pickValue(flat, ['website', 'site', 'url'])

  const projectType = pickValue(flat, ['project_type', 'projecttype'])
  const budget = pickValue(flat, ['budget'])
  const timeline = pickValue(flat, ['timeline'])

  const message =
    pickValue(flat, ['message', 'notes', 'details', 'description']) ||
    (Object.entries(flat).find(([k]) => k.includes('message') || k.includes('help') || k.includes('goals'))?.[1] || '')

  if (!email) return resp(400, { error: 'Missing email in webhook payload' })

  try {
    const contactId = await upsertContact(
      {
        email: String(email).trim(),
        firstname: String(firstName || '').trim(),
        lastname: String(lastName || '').trim(),
        phone: String(phone || '').trim(),
        company: String(company || '').trim(),
        website: String(website || '').trim(),
      },
      token
    )

    const noteLines = [
      `<b>New Formflow Submission</b>`,
      ``,
      firstName || lastName ? `<b>Name:</b> ${[firstName, lastName].filter(Boolean).join(' ')}` : null,
      `<b>Email:</b> ${String(email).trim()}`,
      phone ? `<b>Phone:</b> ${String(phone).trim()}` : null,
      company ? `<b>Company:</b> ${String(company).trim()}` : null,
      website ? `<b>Website:</b> ${String(website).trim()}` : null,
      projectType ? `<b>Project Type:</b> ${String(projectType).trim()}` : null,
      budget ? `<b>Budget:</b> ${String(budget).trim()}` : null,
      timeline ? `<b>Timeline:</b> ${String(timeline).trim()}` : null,
      ``,
      message ? `<b>Message:</b><br/>${String(message).replace(/\n/g, '<br/>')}` : null,
      ``,
      `<details><summary><b>Raw Payload (flattened)</b></summary><pre>${escapeHtml(
        JSON.stringify(flat, null, 2)
      )}</pre></details>`,
    ].filter(Boolean)

    await createNoteOnContact(contactId, noteLines.join('<br/>'), token)

    return resp(200, { ok: true })
  } catch (e) {
    return resp(500, { error: 'HubSpot submission failed' })
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
