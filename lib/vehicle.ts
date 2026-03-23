export function normalizeVehiclePayload(plate: string, payload: any) {
  const read = (paths: string[]) => {
    for (const path of paths) {
      const parts = path.split(".");
      let cur = payload;
      for (const part of parts) {
        if (cur && typeof cur === "object" && part in cur) {
          cur = cur[part];
        } else {
          cur = undefined;
          break;
        }
      }
      if (typeof cur === "string" && cur.trim()) return cur.trim();
    }
    return "";
  };

  const brand = read([
    "brand", "marque", "make",
    "vehicle.brand", "vehicle.marque",
    "data.brand", "data.marque",
    "result.brand", "result.marque"
  ]);

  const model = read([
    "model", "modele",
    "vehicle.model", "vehicle.modele",
    "data.model", "data.modele",
    "result.model", "result.modele"
  ]);

  const fullModel =
    read(["fullModel", "modele_complet", "vehicle.fullModel", "data.fullModel", "result.fullModel"]) ||
    [brand, model].filter(Boolean).join(" ");

  return {
    plate,
    brand,
    model,
    fullModel: fullModel || model || brand || "Véhicule inconnu",
    raw: payload,
  };
}
