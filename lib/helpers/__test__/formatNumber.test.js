import formatNumber from '../formatNumber'

describe('function formatNumber', () => {
  test('It returns empty string when given empty string', () => {
    expect(formatNumber('')).toBe('')
  })
  test('It return the input when the input < 1000', () => {
    expect(formatNumber(1)).toBe('1')
    expect(formatNumber(100)).toBe('100')
    expect(formatNumber(999)).toBe('999')
  })
  test('It formats input >= 1000', () => {
    expect(formatNumber(1000)).toEqual('1.000')
    expect(formatNumber(103999)).toEqual('103.999')
    expect(formatNumber(1000000)).toEqual('1.000.000')
    expect(formatNumber(1000000000)).toEqual('1.000.000.000')
    expect(formatNumber(1234567890)).toEqual('1.234.567.890')
  })
})