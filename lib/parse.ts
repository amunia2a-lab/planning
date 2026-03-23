export function parseTitle(title) {
  const parts = title.split("|").map(s => s.trim());

  const digits = p => p.replace(/\D/g, "");
  const formatPhone = p => {
    const d = digits(p);
    if (d.length === 10) return d.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
    return p;
  };

  return {
    plate: parts[0] || "",
    client: parts[1] || "",
    phone: formatPhone(parts[2] || ""),
    intervention: parts[3] || ""
  };
}