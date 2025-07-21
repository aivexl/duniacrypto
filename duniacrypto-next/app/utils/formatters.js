export function formatDate(date, format = 'YYYY-MM-DD') {
  if (!date) return '';
  const d = new Date(date);
  const pad = (n) => n.toString().padStart(2, '0');
  return format
    .replace('YYYY', d.getFullYear())
    .replace('MM', pad(d.getMonth() + 1))
    .replace('DD', pad(d.getDate()))
    .replace('HH', pad(d.getHours()))
    .replace('mm', pad(d.getMinutes()));
} 