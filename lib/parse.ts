export function parseTitle(title) {
  const parts = title.split("|").map(s => s.trim());
  return {
    plate: parts[0] || "",
    client: parts[1] || "",
    phone: parts[2] || "",
    intervention: parts[3] || ""
  };
}