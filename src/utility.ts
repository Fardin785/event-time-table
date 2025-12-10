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
