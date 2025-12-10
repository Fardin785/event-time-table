export function toLocalDateInputValue(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function toLocalISO(date: string, time: string) {
  return `${date}T${time}:00`;
}

export function formatLabel(d: Date) {
  const weekday = d.toLocaleDateString(undefined, { weekday: "long" });
  const local = new Date(d);
  local.setHours(0, 0, 0, 0);
  const yyyy = local.getFullYear();
  const mm = String(local.getMonth() + 1).padStart(2, "0");
  const dd = String(local.getDate()).padStart(2, "0");
  const isoDate = `${yyyy}-${mm}-${dd}`;
  return { weekday, isoDate };
}
