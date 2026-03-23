export function parseTitle(title: string) {
  const parts = title.split("|").map((s) => s.trim());

  const formatPhone = (p: string) => {
    const digits = p.replace(/\D/g, "");
    if (digits.length === 10) {
      return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
    }
    return p;
  };

  return {
    plate: parts[0] || "",
    client: parts[1] || "",
    phone: formatPhone(parts[2] || ""),
    intervention: parts[3] || "",
  };
}
