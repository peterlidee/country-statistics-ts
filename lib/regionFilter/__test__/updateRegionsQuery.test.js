import updateRegionsQuery from '../updateRegionsQuery'

describe('lib/updateRegionsQuery', () => {

  test('It returns the same array when toAdd and toRemove are empty', () => {
    const result = updateRegionsQuery(['a', 'b', 'c'], [], [])
    expect(result).toHaveLength(3)
    expect(result).toEqual(['a','b','c'])
  })

  test('It adds the items', () => {
    const result = updateRegionsQuery(['a', 'b', 'c'], ['d', 'e'], [])
    expect(result).toHaveLength(5)
    expect(result).toEqual(['a','b','c','d','e'])
  })

  test('It does not add duplicates', () => {
    const result = updateRegionsQuery(['a', 'b', 'c'], ['d', 'b'], [])
    expect(result).toHaveLength(4)
    expect(result).toEqual(['a','b','c','d'])
  })

  test('It adds to an empty array', () => {
    const result = updateRegionsQuery([], ['a', 'b', 'c'], [])
    expect(result).toHaveLength(3)
    expect(result).toEqual(['a','b','c'])
  })

  test('It removes correctly', () => {
    const result = updateRegionsQuery(['a', 'b', 'c'], [], ['a', 'b'])
    expect(result).toHaveLength(1)
    expect(result).toEqual(['c'])
  })

  test('It works even if we ask to remove items that do not exist', () => {
    const result = updateRegionsQuery(['a', 'b', 'c'], [], ['x', 'y', 'z'])
    expect(result).toHaveLength(3)
    expect(result).toEqual(['a','b','c'])
  })

  test('It works even if we ask to remove items from an empty array', () => {
    const result = updateRegionsQuery([], [], ['x', 'y', 'z'])
    expect(result).toHaveLength(0)
    expect(result).toEqual([])
  })

  test('It adds and removes items correctly', () => {
    const result = updateRegionsQuery(['a', 'b', 'c'], ['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'c', 'x', 'y', 'z'])
    expect(result).toHaveLength(2)
    expect(result).toEqual(['d', 'e'])
  })

})