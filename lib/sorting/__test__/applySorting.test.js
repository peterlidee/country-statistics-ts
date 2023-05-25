import applySorting from '../applySorting'
import getParameterFromQuery from '../../query/getParameterFromQuery'
import validateSortQuery from '../validateSortQuery'
import sortCountries from '../sortCountries'

jest.mock('../../query/getParameterFromQuery')
jest.mock('../validateSortQuery', () => {
  return jest.fn(() => ({ sortBy: 'foobar', sortAsc: true }))
})
jest.mock('../sortCountries', () => {
  return jest.fn(() => [3, 2, 1])
})

describe('function applySorting', () => {
  test('It returns an object with props countries, sortBy and sortAsc', () => {
    const result = applySorting({ sort: 'area' }, [])
    expect(result).toHaveProperty('countries')
    expect(result).toHaveProperty('sortBy')
    expect(result).toHaveProperty('sortAsc')
  })

  test('It returns the mock return values', () => {
    const result = applySorting({ query: 'foobar' }, [1, 10, 100])
    expect(result).toEqual({
      sortBy: 'foobar',
      sortAsc: true,
      countries: [3, 2, 1],
    })
    expect(getParameterFromQuery).toHaveBeenCalledWith('sort', {
      query: 'foobar',
    })
    expect(validateSortQuery).toHaveBeenCalled()
    expect(sortCountries).toHaveBeenCalledWith([1, 10, 100], 'foobar', true)
  })
})
