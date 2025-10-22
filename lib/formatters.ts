export function formatEventDuration(durationInMinutes: number): string {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  const minutesString = `${minutes} ${minutes > 1 ? "mins" : "min"}`;
  const hoursString = `${hours} ${hours > 1 ? "hrs" : "hr"} `;

  return `${hoursString} ${minutesString}`;
}
