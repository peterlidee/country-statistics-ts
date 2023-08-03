import isCoordinates from '../coordinatesPredicate'

describe('types/coordinatesPredicate', () => {
  describe('type predicate isCoordinates', () => {
    test('It returns false when there is no latlng', () => {
      expect(isCoordinates(false)).toBe(false)
      expect(isCoordinates(null)).toBe(false)
      expect(isCoordinates(undefined)).toBe(false)
      expect(isCoordinates('')).toBe(false)
    })

    test('It returns false when latlng is no array', () => {
      expect(isCoordinates({})).toBe(false)
      expect(isCoordinates('foobar')).toBe(false)
    })

    test('It returns false when latlng is array with not length 2', () => {
      expect(isCoordinates([])).toBe(false)
      expect(isCoordinates([1])).toBe(false)
      expect(isCoordinates([1, 2, 3])).toBe(false)
    })

    test('It returns false when latlng[0] or [1] is not a number', () => {
      expect(isCoordinates([1, ''])).toBe(false)
      expect(isCoordinates([1, true])).toBe(false)
      expect(isCoordinates([1, [2]])).toBe(false)
      expect(isCoordinates([1, { value: 2 }])).toBe(false)
      expect(isCoordinates([1, undefined])).toBe(false)
      expect(isCoordinates([1, null])).toBe(false)

      expect(isCoordinates(['', 2])).toBe(false)
      expect(isCoordinates([true, 2])).toBe(false)
      expect(isCoordinates([[1], 2])).toBe(false)
      expect(isCoordinates([{ value: 1 }, 2])).toBe(false)
      expect(isCoordinates([undefined, 2])).toBe(false)
      expect(isCoordinates([null, 2])).toBe(false)
    })

    test('It returns true when all conditions are fulfilled', () => {
      expect(isCoordinates([1, 2])).toBe(true)
      expect(isCoordinates([2, 1])).toBe(true)
      expect(isCoordinates([1.1111, 2.22222222])).toBe(true)
    })
  })
})
