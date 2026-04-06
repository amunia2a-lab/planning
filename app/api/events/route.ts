export const dynamic = "force-dynamic";
export const revalidate = 0;

import { google } from "googleapis";

export async function GET(req: Request) {
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      undefined,
      process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/calendar.readonly"]
    );

    const calendar = google.calendar({ version: "v3", auth });

    const { searchParams } = new URL(req.url);
    const day = searchParams.get("day");

    const base = day
  ? new Date(day + "T00:00:00")
  : new Date();

    const start = new Date(base);
    start.setHours(0, 0, 0, 0);

    const end = new Date(base);
    end.setHours(23, 59, 59, 999);

    const res = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = (res.data.items || []).map((e) => ({
      time: e.start?.dateTime
        ? new Date(e.start.dateTime).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "",
      title: e.summary || "",
      url: e.htmlLink || "",
      colorId: e.colorId || "",
    }));

    return Response.json(events);
  } catch (error: any) {
    return Response.json(
      { error: error?.message || "Erreur Google Agenda" },
      { status: 500 }
    );
  }
}
