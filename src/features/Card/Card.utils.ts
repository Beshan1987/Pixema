export function getRatingLevel(rate: number) {
  if (rate >= 6.5) {
    return 'high';
  }
  return rate < 4 ? 'superlow' : 'low';
}

export function isTrend({
  year,
  audienceCount
}: {
  year: number;
  audienceCount: number;
}) {
  if (year > 2021 && audienceCount > 1_000_000) {
    return true;
  }
}
