// netlify/functions/subscribe.js
// Node 18+ (global fetch)
require('dotenv').config();
import { createHash } from 'crypto';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',            // tighten to your domain in prod
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: 'ok' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const email = (data.email || '').trim().toLowerCase();
    if (!email) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing email' }) };

    const { fname, lname, phone, company, website, ptype, budget, timeline, message } = data;

    const apiKey = process.env.MAILCHIMP_API_KEY;      // e.g. abcdef-us21
    const listId = process.env.MAILCHIMP_AUDIENCE_ID;
    if (!apiKey || !listId) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server not configured' }) };
    }

    const dc = apiKey.split('-').pop();                // "us21"
    const hash = createHash('md5').update(email).digest('hex');
    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members/${hash}`;

    // PUT = idempotent upsert (creates or updates without 400 "Member Exists")
    const mcRes = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `apikey ${apiKey}`,
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: 'pending', // use 'subscribed' to skip double opt-in
        merge_fields: {
          FNAME: fname || '',
          LNAME: lname || '',
          PHONE: phone || '',
          COMPANY: company || '',
          WEBSITE: website || '',
          PTYPE: ptype || '',
          BUDGET: budget || '',
          TIMELINE: timeline || '',
          MESSAGE: message || '',
        },
      }),
    });

    if (!mcRes.ok) {
      const text = await mcRes.text();
      return { statusCode: mcRes.status, headers, body: text || JSON.stringify({ error: 'Mailchimp error' }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message || 'error' }) };
  }
}
