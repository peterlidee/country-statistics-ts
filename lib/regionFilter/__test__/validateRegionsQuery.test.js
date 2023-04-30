import validateRegionsQuery from '../validateRegionsQuery'
import filterDataMock from '../../../__mock__/data/filterDataMock'

const regionIndexes = filterDataMock.regionIndexes
function setup(values){
  return validateRegionsQuery(values, regionIndexes)
}

describe('function validateRegionsQuery', () => {
  
  test('It returns values when value is []', () => {
    const result = setup([])
    expect(result).toEqual([])
  })

  test('It returns a valid region', () => {
    const result = setup(['Europe'])
    expect(result).toEqual(['Europe'])
  })

  test('It returns valid regions', () => {
    const result = setup(['Europe', 'Americas'])
    expect(result).toEqual(['Europe', 'Americas'])
  })

  test('It returns a valid subregion', () => {
    const result = setup(['Western Europe'])
    expect(result).toEqual(['Western Europe'])
  })

  test('It returns valid subregions', () => {
    const result = setup(['Western Europe', 'Caribbean'])
    expect(result).toEqual(['Western Europe', 'Caribbean'])
  })

  test('It returns a valid region and a valid subregion', () => {
    const result = setup(['Europe', 'Caribbean'])
    expect(result).toEqual(['Europe', 'Caribbean'])
  })

  test('It returns an empty array when given an invalid (sub)region', () => {
    const result = setup(['Foo'])
    expect(result).toEqual([])
  })

  test('It returns an empty array when given invalid (sub)regions', () => {
    const result = setup(['Foo', 'bar'])
    expect(result).toEqual([])
  })

  test('It returns only valid (sub)regions when given mixed values', () => {
    const result = setup(['Europe', 'Foo', 'Caribbean', 'bar'])
    expect(result).toEqual(['Europe', 'Caribbean'])
  })

})