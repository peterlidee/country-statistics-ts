import compileData from '../compileData'
import formatNumber from '../../helpers/formatNumber'
import roundNumber from '../../helpers/roundNumber'

jest.mock('../../helpers/formatNumber', () => {
  return jest.fn(param => param)
})
jest.mock('../../helpers/roundNumber', () => {
  return jest.fn(param => param)
})

describe('function compileData', () => {

  test('It returns false when called with no array', () => {
    const result = compileData()
    expect(result).toBe(false)
  })

  test('It adds property countryName', () => {
    const result = compileData([{ "name": { "common": "Test" }}])
    expect(result[0]).toHaveProperty('countryName')
    expect(result[0]).toMatchObject({
      'countryName': 'Test'
    })
  })

  test('It adds an empty string for countryName when there is no name prop or no name.common prop', () => {
    expect(compileData([{"name":{}}])[0].countryName).toBe('')
    expect(compileData([{}])[0].countryName).toBe('')
  })

  test('It adds property cca3', () => {
    const result = compileData([{ "cca3": "TES" }])
    expect(result[0].cca3).toBe('TES')
  })
    
  test('It adds a region property', () => {
    const result = compileData([{ "region": "region" }])
    expect(result[0]).toHaveProperty('region')
    expect(result[0].region).toBe('region')
  })

  test('It adds a subregion property', () => {
    const result = compileData([{ "subregion": "subregion" }])
    expect(result[0]).toHaveProperty('subregion')
    expect(result[0].subregion).toBe('subregion')
  })

  describe('It adds area or not', () => {

    test('It adds a area +prettyformat property when the item has area prop', () => {
      const result = compileData([{"area":10000}])
      expect(result[0]).toHaveProperty('area')
      expect(result[0]).toHaveProperty('areaPrettyFormat')
      expect(formatNumber).toHaveBeenCalledWith(10000)
      expect(roundNumber).toHaveBeenCalledWith(10000)
      expect(result[0]).toMatchObject({
        'area': 10000,
        'areaPrettyFormat': 10000
      })
    })
  
    test('It does not add a area +prettyformat property when the item has no area prop', () => {
      const result = compileData([{}])
      expect(result[0]).not.toHaveProperty('area')
      expect(result[0]).not.toHaveProperty('areaPrettyFormat')
    })

  })

  describe('It adds population or not', () => {

    test('It adds a population +prettyformat property when the item has population prop', () => {
      const result = compileData([{ "population": 100000 }])
      expect(result[0]).toHaveProperty('population')
      expect(result[0]).toHaveProperty('populationPrettyFormat')
      expect(formatNumber).toHaveBeenCalledWith(100000)
      expect(roundNumber).toHaveBeenCalledWith(100000)
      expect(result[0]).toMatchObject({
        'population': 100000,
        'populationPrettyFormat': 100000
      })
    })
  
    test('It does not add a population +prettyformat property when the item has no population prop', () => {
      const result = compileData([{}])
      expect(result[0]).not.toHaveProperty('population')
      expect(result[0]).not.toHaveProperty('populationPrettyFormat')
    })

  })

  describe('It adds density or not', () => {

    test('It adds a density and densityPrettyFormat prop to each country when they have an area and a population', () => {
      const result = compileData([{
        "area": 10000, "population": 100000
      }])
      expect(result[0]).toHaveProperty('density')
      expect(result[0]).toHaveProperty('densityPrettyFormat')
      expect(formatNumber).toHaveBeenCalledTimes(3)
      expect(formatNumber).toHaveBeenNthCalledWith(1, 10)
      expect(roundNumber).toHaveBeenCalledTimes(3)
      expect(roundNumber).toHaveBeenNthCalledWith(1, 10)
      expect(result[0]).toMatchObject({
        density: 10,
        densityPrettyFormat: 10,
      })
      
      // test a broken example with no area
      // expect(compiledCountries[1]).not.toHaveProperty('density')
      // expect(compiledCountries[1]).not.toHaveProperty('densityPrettyFormat')
      // test a broken example with no population
      // expect(compiledCountries[2]).not.toHaveProperty('density')
      // expect(compiledCountries[2]).not.toHaveProperty('densityPrettyFormat')
    })

    test('It does not add density or densityPrettyFormat when area is missing', () => {
      const result = compileData([{ "population": 100000 }])
      expect(result[0]).not.toHaveProperty('density')
      expect(result[0]).not.toHaveProperty('densityPrettyFormat')
      expect(formatNumber).toHaveBeenCalledTimes(1)
      expect(formatNumber).toHaveBeenCalledWith(100000)
      expect(roundNumber).toHaveBeenCalledTimes(1)
      expect(roundNumber).toHaveBeenCalledWith(100000)
    })

    test('It does not add density or densityPrettyFormat when population is missing', () => {
      const result = compileData([{ "area": 10000 }])
      expect(result[0]).not.toHaveProperty('density')
      expect(result[0]).not.toHaveProperty('densityPrettyFormat')
      expect(formatNumber).toHaveBeenCalledTimes(1)
      expect(formatNumber).toHaveBeenCalledWith(10000)
      expect(roundNumber).toHaveBeenCalledTimes(1)
      expect(roundNumber).toHaveBeenCalledWith(10000)
    })

    test('It does not add density or densityPrettyFormat when population and area are missing', () => {
      const result = compileData([{}])
      expect(result[0]).not.toHaveProperty('density')
      expect(result[0]).not.toHaveProperty('densityPrettyFormat')
      expect(formatNumber).not.toHaveBeenCalled()
      expect(roundNumber).not.toHaveBeenCalled()
    })

  })
  
  test('It replaces Åland with Aland', () => {
    const result = compileData([{"name":{"common":"Test"},"cca3":"ALA"}])
    expect(result[0].countryName).toBe('Aland Islands')
  })

})