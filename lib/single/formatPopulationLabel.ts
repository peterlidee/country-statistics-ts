import formatNumber from '../helpers/formatNumber'

// of less then 10000 -> only format with . (10000 -> 10.000)
// if more then 10000 -> replace last 3 zero's with k and format with .
// 20000 -> 20k
// 15000000 -> 15.000k
export default function formatPopulationLabel(value: number | string) {
  if (typeof value === 'number') {
    if (value <= 10000) {
      return formatNumber(value)
    } else {
      return formatNumber(Math.round(value / 1000)) + 'k'
    }
  }
  return value
}
