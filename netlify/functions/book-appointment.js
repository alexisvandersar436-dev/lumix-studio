// ElevenLabs tool: book_appointment
// Input JSON: { full_name, business_name, contact_phone_or_email, need, start_time (ISO with offset), notes? }
// Output JSON: { confirmed: true, event_id, start_time, label } or { confirmed: false, error }

const { graphFetch, requireWebhookAuth, TIME_ZONE, mailbox } = require('./_graph');

const SLOT_MINUTES = 30;
const SPANISH_LABEL = new Intl.DateTimeFormat('es-GT', {
  weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit',
  timeZone: 'America/Guatemala',
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
  if (!requireWebhookAuth(event)) return { statusCode: 401, body: 'Unauthorized' };

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { full_name, business_name, contact_phone_or_email, need, start_time, notes } = payload;
  const missing = ['full_name', 'business_name', 'need', 'start_time']
    .filter((k) => !payload[k]);
  if (missing.length) {
    return { statusCode: 400, body: JSON.stringify({ confirmed: false, error: `missing: ${missing.join(', ')}` }) };
  }

  const start = new Date(start_time);
  if (Number.isNaN(start.getTime())) {
    return { statusCode: 400, body: JSON.stringify({ confirmed: false, error: 'invalid start_time' }) };
  }
  const end = new Date(start.getTime() + SLOT_MINUTES * 60_000);
  const isEmail = contact_phone_or_email && /\S+@\S+\.\S+/.test(contact_phone_or_email);

  const event_ = {
    subject: `Consulta Lumix Studio — ${full_name} (${business_name})`,
    body: {
      contentType: 'text',
      content: [
        `Negocio: ${business_name}`,
        `Contacto: ${contact_phone_or_email || 'No proporcionado'}`,
        `Necesidad: ${need}`,
        notes ? `Notas: ${notes}` : null,
        '',
        'Agendado automáticamente por el recepcionista virtual de Lumix Studio.',
      ].filter(Boolean).join('\n'),
    },
    start: { dateTime: start.toISOString(), timeZone: 'UTC' },
    end: { dateTime: end.toISOString(), timeZone: 'UTC' },
    ...(isEmail ? { attendees: [{ emailAddress: { address: contact_phone_or_email, name: full_name }, type: 'required' }] } : {}),
  };

  let created;
  try {
    created = await graphFetch(`/users/${mailbox()}/events`, {
      method: 'POST',
      body: JSON.stringify(event_),
    });
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ confirmed: false, error: 'calendar_write_failed', detail: String(err) }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      confirmed: true,
      event_id: created.id,
      start_time: start.toISOString(),
      label: SPANISH_LABEL.format(start),
    }),
  };
};
