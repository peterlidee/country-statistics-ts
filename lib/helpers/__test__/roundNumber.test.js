import roundNumber from '../roundNumber'

describe('function roundNumber', () => {
  test('It returns empty string when receiving empty string', () => {
    expect(roundNumber('')).toBe('')
  })

  test('It returns 0 when receiving negative number', () => {
    expect(roundNumber(-1)).toBe(0)
    expect(roundNumber(-100)).toBe(0)
  })

  test('It rounds numbers >= 0', () => {
    expect(roundNumber(0)).toBe(0)
    expect(roundNumber(0.4)).toBe(0)
    expect(roundNumber(0.5)).toBe(1)
    expect(roundNumber(1000.1)).toBe(1000)
    expect(roundNumber(1000.9)).toBe(1001)
  })
})

// TODO: add roundnumber for nan
