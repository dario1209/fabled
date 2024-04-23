export function formatDuration(seconds: bigint): string {
  const secondsPerMinute = BigInt(60);
  const secondsPerHour = BigInt(3600);
  const secondsPerDay = BigInt(86400);

  const days = seconds / secondsPerDay;
  seconds = seconds % secondsPerDay;

  const hours = seconds / secondsPerHour;
  seconds = seconds % secondsPerHour;

  const minutes = seconds / secondsPerMinute;

  let result = "";
  if (days > 0n) result += `${days}d `;
  if (hours > 0n) result += `${hours}h `;
  if (minutes > 0n) result += `${minutes}m `;

  return result.trim();
}
