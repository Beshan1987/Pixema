export function getRatingLevel(rate: number) {
  if (rate > 7) {
    return 'high';
  }
  return rate < 5 ? 'superlow' : 'low';
}
