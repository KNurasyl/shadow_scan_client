export function normalizeTarget(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}
