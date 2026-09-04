// ElevenLabs tool: check_availability
// Input JSON: { preferred_date: "2026-09-10", preferred_time_range?: "mañana" | "tarde" | "10:00-12:00" }
// Output JSON: { slots: [{ start_time: ISO, label: "miércoles 10 de septiembre, 10:00 AM" }] }

const { graphFetch, requireWebhookAuth, TIME_ZONE, mailbox } = require('./_graph');

const FALLBACK_HOURS = { from: 9, to: 17 }; // used only if Graph doesn't return workingHours
const SLOT_MINUTES = 30;
const MAX_SLOTS = 3;
const WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function rangeForPreference(pref, businessHours) {
  if (!pref) return businessHours;
  const explicit = pref.match(/^(\d{1,2}):?(\d{2})?\s*-\s*(\d{1,2}):?(\d{2})?$/);
  if (explicit) return { from: Number(explicit[1]), to: Number(explicit[3]) };
  const p = pref.toLowerCase();
  const midpoint = Math.round((businessHours.from + businessHours.to) / 2);
  if (p.includes('mañana')) return { from: businessHours.from, to: midpoint };
  if (p.includes('tarde')) return { from: midpoint, to: businessHours.to };
  return businessHours;
}

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

  const { preferred_date, preferred_time_range } = payload;
  if (!preferred_date) return { statusCode: 400, body: JSON.stringify({ error: 'preferred_date is required' }) };

  const dayStart = `${preferred_date}T00:00:00`;
  const dayEnd = `${preferred_date}T23:59:59`;

  let schedule;
  try {
    schedule = await graphFetch(`/users/${mailbox()}/calendar/getSchedule`, {
      method: 'POST',
      body: JSON.stringify({
        schedules: [mailbox()],
        startTime: { dateTime: dayStart, timeZone: TIME_ZONE },
        endTime: { dateTime: dayEnd, timeZone: TIME_ZONE },
        availabilityViewInterval: SLOT_MINUTES,
      }),
    });
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: 'calendar_lookup_failed', detail: String(err) }) };
  }

  const info = schedule?.value?.[0];
  const workingHours = info?.workingHours;
  const businessHours = workingHours
    ? { from: Number(workingHours.startTime.slice(0, 2)), to: Number(workingHours.endTime.slice(0, 2)) }
    : FALLBACK_HOURS;
  const workingDays = workingHours?.daysOfWeek || ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  const requestedWeekday = WEEKDAYS[new Date(`${preferred_date}T12:00:00-06:00`).getUTCDay()];
  if (!workingDays.includes(requestedWeekday)) {
    return { statusCode: 200, body: JSON.stringify({ slots: [], reason: 'not_a_working_day' }) };
  }

  const { from, to } = rangeForPreference(preferred_time_range, businessHours);
  const availabilityView = info?.availabilityView || '';
  const slotsPerHour = 60 / SLOT_MINUTES;
  const dayStartHourIndex = 0; // availabilityView starts at 00:00 local per requested window

  const freeSlots = [];
  for (let i = 0; i < availabilityView.length && freeSlots.length < MAX_SLOTS; i++) {
    const hour = dayStartHourIndex + Math.floor(i / slotsPerHour);
    const minute = (i % slotsPerHour) * SLOT_MINUTES;
    if (hour < from || hour >= to) continue;
    if (availabilityView[i] !== '0') continue; // 0 = free
    const iso = `${preferred_date}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
    const local = new Date(`${iso}-06:00`);
    freeSlots.push({
      start_time: `${iso}-06:00`,
      label: SPANISH_LABEL.format(local),
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ slots: freeSlots }),
  };
};
