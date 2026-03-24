export function parseTitle(title: string) {
  const parts = title.split("|").map((s) => s.trim());

  const digits = (p: string) => p.replace(/\D/g, "");
  const formatPhone = (p: string) => {
    const d = digits(p);
    if (d.length === 10) return d.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
    return p;
  };

  return {
    plate: parts[0] || "",
    client: parts[1] || "",
    phone: formatPhone(parts[2] || ""),
    intervention: parts[3] || "",
  };
}