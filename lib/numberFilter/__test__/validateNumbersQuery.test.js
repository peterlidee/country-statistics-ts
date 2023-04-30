import validateNumbersQuery from '../validateNumbersQuery'
import validateNumbersAgainstDefaults from '../validateNumbersAgainstDefaults'

jest.mock('../validateNumbersAgainstDefaults', () => {
  return jest.fn((value1, value2, defaults) => [ value1, value2, defaults ])
})

describe('function validateNumbersQuery', () => {
  
  test('It returns defaults when !queryValue', () => {
    expect(validateNumbersQuery(undefined, [1])).toEqual([1])
    expect(validateNumbersQuery('', [2])).toEqual([2])
    expect(validateNumbersQuery(0, [3])).toEqual([3])
  })

  test('It returns defaults when no komma', () => {
    expect(validateNumbersQuery('123', [4])).toEqual([4])
  })

  test('It splits queryValue', () => {
    const result = validateNumbersQuery('10,90', [0]);
    expect(result[0]).toBe(10)
    expect(result[1]).toBe(90)
    expect(result[2]).toEqual([0])
  })

  test('It calls validateNumbersAgainstDefaults', () => {
    validateNumbersQuery('10,90', [50])
    expect(validateNumbersAgainstDefaults).toHaveBeenCalledTimes(1)
    expect(validateNumbersAgainstDefaults).toHaveBeenCalledWith(10,90, [50])
  })

})

