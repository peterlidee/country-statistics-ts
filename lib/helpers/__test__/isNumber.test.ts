import isNumber from '../isNumber'

describe('function isNumber', () => {
  test('It returns true or false when number or not', () => {
    expect(isNumber('abc' as unknown as number)).toBe(false)
    expect(isNumber('abc123' as unknown as number)).toBe(false)
    expect(isNumber('123' as unknown as number)).toBe(false)
    expect(isNumber(123)).toBe(true)
    expect(isNumber(1.23)).toBe(true)
    expect(isNumber(-1.23)).toBe(true)
  })
})
