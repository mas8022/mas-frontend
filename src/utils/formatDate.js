export default function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const day = isToday
    ? "امروز"
    : date.toLocaleDateString("fa-IR", {
        month: "long",
        day: "numeric",
        weekday: "long",
      });

  const time = date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day} - ${time}`;
}
