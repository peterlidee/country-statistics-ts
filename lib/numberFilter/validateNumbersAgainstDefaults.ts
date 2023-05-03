import isNumber from '../helpers/isNumber'

/**
 * validates @value1 and @value2 (have value and are number), else returns @defaults
 * @param value1 - number, might be NaN
 * @param value2  - number, might be NaN
 * @param defaults - [number, number]
 * @returns - either [value1, value2] or defaults: [number, number]
 */

export default function validateNumbersAgainstDefaults(
  value1: number,
  value2: number,
  defaults: [number, number],
) {
  // 1. are both values not empty
  if ((!value1 && value1 !== 0) || (!value2 && value2 !== 0)) {
    return defaults
  }
  // 2. are both values numbers
  // this will also filter out NaN
  if (!isNumber(value1) || !isNumber(value2)) {
    return defaults
  }
  // 3. if value1 > value2 flip the values
  const values: [number, number] = [
    value1 > value2 ? value2 : value1,
    value2 < value1 ? value1 : value2,
  ]
  // 4. val1 can't be lower then defaultmin and can't be higher the defaultmax
  if (values[0] < defaults[0]) values[0] = defaults[0]
  if (values[0] > defaults[1]) values[0] = defaults[1]
  // 5. val2 can't be lower then defaultmin and can't be higher the defaultmax
  if (values[1] < defaults[0]) values[1] = defaults[0]
  if (values[1] > defaults[1]) values[1] = defaults[1]

  // return values
  return values
}
