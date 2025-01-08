export function extractOffset(next: string): number | null {
  const match = next.match(/offset=(\d+)/)
  return match && match[1] ? Number.parseInt(match[1], 10) : null
}
