import roundNumber from '../roundNumber'

describe('function roundNumber', () => {
  test('It returns 0 when receiving string', () => {
    expect(roundNumber('')).toBe(0)
    expect(roundNumber('Hellooo?')).toBe(0)
  })

  test('It returns 0 when not a number', () => {
    expect(roundNumber({})).toBe(0)
    expect(roundNumber([])).toBe(0)
    expect(roundNumber(true)).toBe(0)
    expect(roundNumber('')).toBe(0)
  })

  test('It returns 0 when receiving negative number', () => {
    expect(roundNumber(-1)).toBe(0)
    expect(roundNumber(-100)).toBe(0)
    expect(roundNumber(-1.35)).toBe(0)
  })

  test('It rounds numbers >= 0', () => {
    expect(roundNumber(0)).toBe(0)
    expect(roundNumber(0.4)).toBe(0)
    expect(roundNumber(0.5)).toBe(1)
    expect(roundNumber(1000.1)).toBe(1000)
    expect(roundNumber(1000.9)).toBe(1001)
  })

  test('It return 0 when NaN', () => {
    expect(roundNumber(NaN)).toBe(0)
  })
})

// TODO: add roundnumber for nan
