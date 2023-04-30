import isNumberFilterActive from '../isNumberFilterActive'

describe('function isNumberFilterActive', () => {

  test('It returns false when selection === defaults', () => {
    expect(isNumberFilterActive([1,2], [1,2])).toBe(false)
    expect(isNumberFilterActive([1000,22500], [1000,22500])).toBe(false)
  })

  test('It returns true when selection !== defaults', () => {
    expect(isNumberFilterActive([1,2], [1,1])).toBe(true)
    expect(isNumberFilterActive([1,2], [2,2])).toBe(true)
    expect(isNumberFilterActive([1,2], [2,1])).toBe(true)
    expect(isNumberFilterActive([1,2], [3,4])).toBe(true)
    expect(isNumberFilterActive([1000,22500], [100000,2250000])).toBe(true)
  })

})