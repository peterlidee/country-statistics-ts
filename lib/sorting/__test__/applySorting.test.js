import applySorting from '../applySorting'
import sortCountries from '../sortCountries'
import { extraDataCountries } from '../../../__mock__/data/countriesMock'

// skip the sorting
jest.mock('../sortCountries', () => {
  return jest.fn(() => [3,2,1])
})

describe('function applySorting', () => {

  test('It returns an object with props countries, sortBy and sortAsc', () => {
    const result = applySorting(false, { sort: 'area' }, [])
    expect(result).toHaveProperty('countries')
    expect(result).toHaveProperty('sortBy')
    expect(result).toHaveProperty('sortAsc')
  })

  describe('sortBy and sortAsc', () => {

    test('It returns the defaults when routerReady=false', () => {
      const result1 = applySorting(false, {}, [])
      const result2 = applySorting(false, { sort: 'area' }, [])
      expect(result1.sortBy).toBe('country')
      expect(result2.sortBy).toBe('country')
      expect(result1.sortAsc).toBe(true)
      expect(result2.sortAsc).toBe(true)
    })

    test('It returns the sorting parameter when routerReady=true', () => {
      const result1 = applySorting(true, { sort: '-population' }, [])
      const result2 = applySorting(true, { sort: 'area' }, [])
      expect(result1.sortBy).toBe('population')
      expect(result2.sortBy).toBe('area')
      expect(result1.sortAsc).toBe(false)
      expect(result2.sortAsc).toBe(true)
    })

    test('It returns the defaults when no query', () => {
      const result = applySorting(true, {}, [])
      expect(result.sortBy).toBe('country')
      expect(result.sortAsc).toBe(true)
    })

    test('It returns the defaults when empty query', () => {
      const result = applySorting(true, { area: '' }, [])
      expect(result.sortBy).toBe('country')
      expect(result.sortAsc).toBe(true)
    })

    test('It returns sortAsc true when no -', () => {
      const result = applySorting(true, { sort: 'area' }, [])
      expect(result.sortAsc).toBe(true)
    })

    test('It returns sortAsc true when -', () => {
      const result = applySorting(true, { sort: '-area' }, [])
      expect(result.sortAsc).toBe(false)
    })

    test('It only returns valid sortBy', () => {
      const result1 = applySorting(true, { sort: 'blabla' }, [])
      expect(result1.sortBy).toBe('country')
      const result2 = applySorting(true, { sort: 'country1' }, [])
      expect(result2.sortBy).toBe('country')
      const result3 = applySorting(true, { sort: 'area,country' }, [])
      expect(result3.sortBy).toBe('country')
      const result4 = applySorting(true, { sort: 'country' }, [])
      expect(result4.sortBy).toBe('country')
      const result5 = applySorting(true, { sort: 'area' }, [])
      expect(result5.sortBy).toBe('area')
      const result6 = applySorting(true, { sort: 'population' }, [])
      expect(result6.sortBy).toBe('population')
      const result7 = applySorting(true, { sort: 'density' }, [])
      expect(result7.sortBy).toBe('density')
    })

  })

  describe('It returns countries array', () => {

    test('It returns the original countries when routerReady=false', () => {
      const result = applySorting(false, {}, [1,2,3])
      expect(sortCountries).not.toHaveBeenCalled()
      expect(result.countries).toEqual([1,2,3])
    })

    test('It returns mock return value when routerReady=true', () => {
      const result = applySorting(true, { sort: 'population' }, [1,2,3])
      expect(sortCountries).toHaveBeenCalledTimes(1)
      expect(result.countries).toEqual([3,2,1])
    })

    test('It returns mock return value when no query', () => {
      const result = applySorting(true, {}, [1,2,3])
      expect(sortCountries).toHaveBeenCalledTimes(1)
      expect(result.countries).toEqual([3,2,1])
    })

    test('It returns mock return value when empty query', () => {
      const result = applySorting(true, {}, [1,2,3])
      expect(sortCountries).toHaveBeenCalledTimes(1)
      expect(result.countries).toEqual([3,2,1])
    })

    test('It returns mock return when invalid sortBy', () => {
      const result = applySorting(true, { sort: 'blabla' }, [1,2,3])
      expect(sortCountries).toHaveBeenCalledTimes(1)
      expect(result.countries).toEqual([3,2,1])
    })

  })

})