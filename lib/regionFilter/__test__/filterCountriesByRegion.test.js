import filterCountriesByRegion from '../filterCountriesByRegion'
import { extraDataCountries } from '../../../__mock__/data/countriesMock'
import filterDataMock from '../../../__mock__/data/filterDataMock'

const { regionIndexes } = filterDataMock

describe('function filterCountriesByRegion(countries, regionIndexes, activeRegions)', () => {

  test('It return all countries when no activeRegions', () => {
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, [])
    expect(filteredCountries).toHaveLength(6)
  })
  
  test('It returns correct countries for region', () => {
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Americas'])
    expect(filteredCountries).toHaveLength(1)
    expect(filteredCountries[0].cca3).toBe('PRI')
    const filteredCountries2 = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Europe'])
    expect(filteredCountries2).toHaveLength(3)
  })

  test('It returns correct countries for regionS', () => {
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Americas', 'Europe'])
    expect(filteredCountries).toHaveLength(4)
  })

  test('It returns correct countries for subregion', () => {
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Western Europe'])
    expect(filteredCountries).toHaveLength(1)
    expect(filteredCountries[0].cca3).toBe('BEL')
  })

  test('It returns correct countries for subregionS', () => {
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Northern Europe', 'Caribbean'])
    expect(filteredCountries).toHaveLength(2)
    expect(filteredCountries[0].cca3).toBe('DNK')
    expect(filteredCountries[1].cca3).toBe('PRI')
  })

  test('It returns correct countries for region + subregion', () => {
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Northern Europe', 'Africa'])
    expect(filteredCountries).toHaveLength(2)
    expect(filteredCountries[0].cca3).toBe('DNK')
    expect(filteredCountries[1].cca3).toBe('MAR')
  })

  test('It returns correct countries for regionS + subregionS', () => {
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Northern Europe', 'Africa', 'Antarctic'])
    expect(filteredCountries).toHaveLength(3)
    expect(filteredCountries[0].cca3).toBe('DNK')
    expect(filteredCountries[1].cca3).toBe('MAR')
    expect(filteredCountries[2].cca3).toBe('SGS')
  })

  test('It removed duplicates from region + subregion', () => {
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Europe', 'Western Europe'])
    expect(filteredCountries).toHaveLength(3)
    expect(filteredCountries[0].cca3).toBe('AUT')
    expect(filteredCountries[1].cca3).toBe('DNK')
    expect(filteredCountries[2].cca3).toBe('BEL')
  })

  test('It removed duplicates from region + subregionS', () => {
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Europe', 'Western Europe', 'Northern Europe', 'Central Europe'])
    expect(filteredCountries).toHaveLength(3)
    expect(filteredCountries[0].cca3).toBe('AUT')
    expect(filteredCountries[1].cca3).toBe('DNK')
    expect(filteredCountries[2].cca3).toBe('BEL')
  })

  test('It removed duplicates from regionS + subregionS', () => {
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Europe', 'Western Europe', 'Caribbean', 'Africa', 'Northern Africa'])
    expect(filteredCountries).toHaveLength(5)
    expect(filteredCountries[0].cca3).toBe('AUT')
    expect(filteredCountries[1].cca3).toBe('DNK')
    expect(filteredCountries[2].cca3).toBe('BEL')
    expect(filteredCountries[3].cca3).toBe('PRI')
    expect(filteredCountries[4].cca3).toBe('MAR')
  })

})