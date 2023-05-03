export default function isNumber(value: number) {
  return typeof value === 'number' && isFinite(value)
}
