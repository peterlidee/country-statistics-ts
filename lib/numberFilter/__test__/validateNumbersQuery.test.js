import validateNumbersQuery from '../validateNumbersQuery'
import validateNumbersAgainstDefaults from '../validateNumbersAgainstDefaults'

jest.mock('../validateNumbersAgainstDefaults', () => {
  return jest.fn((value1, value2, defaults) => [value1, value2, defaults])
})

describe('function validateNumbersQuery', () => {
  test('It returns defaults when !queryValue', () => {
    expect(validateNumbersQuery(undefined, [1, 2])).toEqual([1, 2])
    expect(validateNumbersQuery('', [1, 2])).toEqual([1, 2])
    expect(validateNumbersQuery(0, [1, 2])).toEqual([1, 2])
  })

  test('It returns defaults when no komma', () => {
    expect(validateNumbersQuery('123', [1, 2])).toEqual([1, 2])
  })

  test('It splits queryValue', () => {
    const result = validateNumbersQuery('10,90', [1, 2])
    expect(result[0]).toBe(10)
    expect(result[1]).toBe(90)
  })

  test('It calls validateNumbersAgainstDefaults', () => {
    validateNumbersQuery('10,90', [50, 100])
    expect(validateNumbersAgainstDefaults).toHaveBeenCalledTimes(1)
    expect(validateNumbersAgainstDefaults).toHaveBeenCalledWith(
      10,
      90,
      [50, 100],
    )
  })
})
