import { normalizeVehiclePayload } from "@/lib/vehicle";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const plate = (searchParams.get("plate") || "").trim().toUpperCase();

  if (!plate) {
    return Response.json({ error: "Plate manquante" }, { status: 400 });
  }

  const token = process.env.API_PLAQUE_TOKEN;
  const country = process.env.API_PLAQUE_COUNTRY || "FR";

  if (!token) {
    return Response.json(
      { error: "API_PLAQUE_TOKEN manquant" },
      { status: 500 }
    );
  }

  const url =
    `https://api.apiplaqueimmatriculation.com/plaque?immatriculation=${encodeURIComponent(plate)}` +
    `&token=${encodeURIComponent(token)}&pays=${encodeURIComponent(country)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const text = await res.text();
    let payload: any = {};
    try {
      payload = text ? JSON.parse(text) : {};
    } catch {
      payload = { rawText: text };
    }

    if (!res.ok) {
      return Response.json({ error: "Échec lookup plaque", status: res.status, payload }, { status: 502 });
    }

    return Response.json(normalizeVehiclePayload(plate, payload));
  } catch (error: any) {
    return Response.json(
      { error: "Erreur réseau lookup plaque", detail: error?.message || "Erreur inconnue" },
      { status: 500 }
    );
  }
}
