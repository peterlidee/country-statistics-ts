/**
 * Takes number and returns formatted string
 * f.e. 100000 returns '100.000'
 * @param num - a number
 * @returns - a formated string
 */

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString

export default function formatNumber(num: number): string {
  return num.toLocaleString('nl-BE')
}
