// round the number or return 0 when num is not number or when number is smaller then 0
export default function roundNumber(num: number | string): number {
  if (typeof num !== 'number') return 0
  if (num < 0) return 0
  return Math.round(num)
}
