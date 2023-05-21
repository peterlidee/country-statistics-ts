import {
  extractStringValueFromProp,
  extractNumberValueFromProp,
  compileSingleCountry,
} from '../compileSingleCountry'

describe('function extractStringValueFromProp', () => {
  test('It returns value when obj has key', () => {
    const result = extractStringValueFromProp({ foo: 'bar' }, 'foo')
    expect(result).toBe('bar')
  })
  test('It returns "" when obj does not have key', () => {
    const result = extractStringValueFromProp({ foo: 'bar' }, 'test')
    expect(result).toBe('')
  })
  test('It returns "" when obj is {}', () => {
    const result = extractStringValueFromProp({ foo: 'bar' }, 'test')
    expect(result).toBe('')
  })
  test('It returns "" when obj is undefined', () => {
    const result = extractStringValueFromProp(undefined, 'test')
    expect(result).toBe('')
  })
})

describe('function extractNumberValueFromProp', () => {
  test('It returns value when obj has key', () => {
    const result = extractNumberValueFromProp({ foo: 1 }, 'foo')
    expect(result).toBe(1)
  })
  test('It returns 0 when obj does not have key', () => {
    const result = extractNumberValueFromProp({ foo: 'bar' }, 'test')
    expect(result).toBe(0)
  })
  test('It returns "" when obj is {}', () => {
    const result = extractNumberValueFromProp({ foo: 'bar' }, 'test')
    expect(result).toBe(0)
  })
  test('It returns "" when obj is undefined', () => {
    const result = extractNumberValueFromProp(undefined, 'test')
    expect(result).toBe(0)
  })
})

describe('function compileSingleCountry', () => {
  test('It returns default empty string for every key', () => {
    const result = compileSingleCountry(undefined)
    expect(result.countryName).toBe('')
    expect(result.tld).toBe('')
    expect(result.cca2).toBe('')
    expect(result.cca3).toBe('')
    expect(result.capital).toBe('')
    expect(result.region).toBe('')
    expect(result.subregion).toBe('')
    expect(result.borders).toEqual([])
    expect(result.area).toBe(0)
    expect(result.population).toBe(0)
    expect(result.flag).toBe('')
    expect(result.coatOfArms).toBe('')
  })

  describe('It returns correct values for key name', () => {
    test('Valid object', () => {
      const result = compileSingleCountry({
        name: { common: 'countryName' },
      })
      expect(result.countryName).toBe('countryName')
    })
    test('Invalid object', () => {
      const result = compileSingleCountry({
        name: { foo: 'countryName' },
      })
      expect(result.countryName).toBe('')
    })
  })

  describe('It returns correct values for keys capital, tld, cca2, cca3, region and subregion', () => {
    test('Valid object', () => {
      const result = compileSingleCountry({
        tld: ['tld'],
        cca2: 'ab',
        cca3: 'abc',
        region: 'region',
        subregion: 'subregion',
      })
      expect(result.tld).toBe('tld')
      expect(result.cca2).toBe('ab')
      expect(result.cca3).toBe('abc')
      expect(result.region).toBe('region')
      expect(result.subregion).toBe('subregion')
    })
  })

  describe('It returns correct values for capital', () => {
    test('Valid object', () => {
      const result = compileSingleCountry({
        capital: ['capital1'],
      })
      expect(result.capital).toBe('capital1')
    })
    test('Valid object with multiple results', () => {
      const result = compileSingleCountry({
        capital: ['capital1', 'capital2', 'capital3'],
      })
      expect(result.capital).toBe('capital1')
    })
    test('Invalid object', () => {
      const result = compileSingleCountry({
        capital: 'capital1',
      })
      expect(result.capital).toBe('')
    })
  })

  describe('It returns the correct value for key area and population', () => {
    test('Valid object', () => {
      const result = compileSingleCountry({
        area: 'area',
        population: 'population',
      })
      expect(result.area).toBe('area')
      expect(result.population).toBe('population')
    })
  })

  describe('It returns the correct value for key borders', () => {
    test('Valid object', () => {
      const result = compileSingleCountry({
        borders: ['a', 'b', 'c'],
      })
      expect(result.borders).toEqual(['a', 'b', 'c'])
    })
  })

  describe('It returns the correct value for keys flags and coatOfArms', () => {
    test('Valid object returns svgs', () => {
      const result = compileSingleCountry({
        flags: {
          svg: 'flagsvg',
          png: 'flagpng',
        },
        coatOfArms: {
          svg: 'coasvg',
          png: 'coapng',
        },
      })
      expect(result.flag).toBe('flagsvg')
      expect(result.coatOfArms).toBe('coasvg')
    })

    test('Valid object with no svg returns png', () => {
      const result = compileSingleCountry({
        flags: {
          png: 'flagpng',
        },
        coatOfArms: {
          png: 'coapng',
        },
      })
      expect(result.flag).toBe('flagpng')
      expect(result.coatOfArms).toBe('coapng')
    })
  })
})
