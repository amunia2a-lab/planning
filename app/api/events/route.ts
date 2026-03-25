import { google } from "googleapis";

export async function GET() {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    undefined,
    process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/calendar.readonly"]
  );

  const calendar = google.calendar({ version: "v3", auth });

  const now = new Date();
  const start = new Date(now.setHours(0,0,0,0)).toISOString();
  const end = new Date(now.setHours(23,59,59,999)).toISOString();

  const res = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    timeMin: start,
    timeMax: end,
    singleEvents: true,
    orderBy: "startTime"
  });

  const events = res.data.items.map(e => ({
    time: new Date(e.start.dateTime).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),
    title: e.summary,
    url: e.htmlLink
  }));

  return Response.json(events);
}