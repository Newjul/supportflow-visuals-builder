export function formatTitle(value) {
  return String(value).replace(/\b\w/g, (char) => char.toUpperCase())
}
