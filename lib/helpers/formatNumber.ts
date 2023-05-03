// take number return formatted number
// 100000 -> 100.000
function formatNumber(num: number): string {
  // format number
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
  return num.toLocaleString('nl-BE')
}

export default formatNumber
