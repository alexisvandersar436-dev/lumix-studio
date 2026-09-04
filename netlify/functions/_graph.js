// Shared Microsoft Graph helpers for the Lumix Studio booking webhook.
// Requires env vars: MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, MS_MAILBOX_UPN

const GRAPH_BASE = 'https://graph.microsoft.com/v1.0';
const TIME_ZONE = 'Central America Standard Time'; // Guatemala, UTC-6, no DST

let cachedToken = null; // { value, expiresAt }

async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.value;
  }
  const { MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET } = process.env;
  const res = await fetch(`https://login.microsoftonline.com/${MS_TENANT_ID}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: MS_CLIENT_ID,
      client_secret: MS_CLIENT_SECRET,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
  });
  if (!res.ok) {
    throw new Error(`Graph auth failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cachedToken.value;
}

async function graphFetch(path, options = {}) {
  const token = await getAccessToken();
  const res = await fetch(`${GRAPH_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`Graph request failed: ${res.status} ${await res.text()}`);
  }
  return res.status === 204 ? null : res.json();
}

function requireWebhookAuth(event) {
  const expected = process.env.WEBHOOK_SECRET;
  const got = event.headers['x-lumix-webhook-secret'] || event.headers['X-Lumix-Webhook-Secret'];
  return Boolean(expected) && got === expected;
}

module.exports = { graphFetch, requireWebhookAuth, TIME_ZONE, mailbox: () => process.env.MS_MAILBOX_UPN };
