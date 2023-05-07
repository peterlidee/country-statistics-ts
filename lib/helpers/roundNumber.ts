/**
 * Rounds the number or returns 0 (NaN, not number or negative number)
 * @param num - a number
 * @returns a rounded number or 0
 */

export default function roundNumber(num: number | string): number {
  if (typeof num !== 'number') return 0
  if (isNaN(num)) return 0
  if (num < 0) return 0
  return Math.round(num)
}
