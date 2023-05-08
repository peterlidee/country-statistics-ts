import validateNumbersAgainstDefaults from './validateNumbersAgainstDefaults'

/**
 * validate url query value, not empty and contains ','
 * @param queryValue router.query[key]
 * @param defaults filterData[key].sliderStart, filterData[key].sliderEnd
 * @returns [number, number] either the values from query or defaults
 */

function validateNumbersQuery(
  queryValue: undefined | string,
  defaults: [number, number],
) {
  // 1. check if there is a value
  // 2. check if the value isn't empty ''
  if (!queryValue) {
    return defaults
  }
  // 3. check if the value has a ','
  if (queryValue.indexOf(',') === -1) {
    return defaults
  }
  // 4. split the value
  const queryValue1 = parseInt(queryValue.split(',')[0])
  const queryValue2 = parseInt(queryValue.split(',')[1])

  // validate values against each other and against defaults and return result
  return validateNumbersAgainstDefaults(queryValue1, queryValue2, defaults)
}

export default validateNumbersQuery
