const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  day: "numeric",
  month: "short",
});

export function formatDate(timestamp: number) {
  return dateFormatter.format(timestamp);
}
