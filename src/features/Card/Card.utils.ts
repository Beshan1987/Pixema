export function getRatingLevel(rate: number) {
  if (rate > 7) {
    return 'high';
  }
  return rate < 5 ? 'superlow' : 'low';
}

export function isTrend({
  year,
  audienceCount
}: {
  year: number;
  audienceCount: number;
}) {
  if (year === 2023 && audienceCount > 10_000) {
    return 'trend';
  }
}
