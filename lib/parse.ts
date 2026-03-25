export function formatPhone(phone: string) {
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.length === 10) {
    return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  }
  return phone || "";
}

export function parseTitle(title: string) {
  const parts = (title || "").split("|").map((s) => s.trim());

  return {
    plate: parts[0] || "",
    client: parts[1] || "",
    phone: parts[2] || "",
    intervention: parts[3] || "",
  };
}