import getParameterFromQuery from '../../query/getParameterFromQuery'
import getAndValidateHiddenQuery from '../getAndValidateHiddenQuery'

jest.mock('../../query/getParameterFromQuery')

beforeEach(() => {
  jest.resetAllMocks()
})

describe('function getAndValidateHiddenQuery', () => {
  test('It returns an array', () => {
    getParameterFromQuery.mockReturnValue([])
    const result = getAndValidateHiddenQuery({})
    expect(result).toEqual([])
  })

  test('It only returns a valid option', () => {
    // only use a valid query here!!
    getParameterFromQuery.mockImplementation((param, query) =>
      query.hide.split(','),
    )
    const result = getAndValidateHiddenQuery({ hide: 'area' })
    expect(result).toEqual(['area'])
  })

  test('It only returns valid options', () => {
    // only use a valid query here!!
    getParameterFromQuery.mockImplementation((param, query) =>
      query.hide.split(','),
    )
    const result = getAndValidateHiddenQuery({
      hide: 'area,population,density',
    })
    expect(result).toEqual(['area', 'population', 'density'])
  })

  test('It does not return an invalid option', () => {
    getParameterFromQuery.mockImplementation((param, query) =>
      query.hide.split(','),
    )
    const result = getAndValidateHiddenQuery({
      hide: 'foo',
    })
    expect(result).toEqual([])
  })

  test('It does not return an invalid options', () => {
    getParameterFromQuery.mockImplementation((param, query) =>
      query.hide.split(','),
    )
    const result = getAndValidateHiddenQuery({
      hide: 'foo,area2',
    })
    expect(result).toEqual([])
  })

  test('It returns valid options even if there are invalid options', () => {
    getParameterFromQuery.mockImplementation((param, query) =>
      query.hide.split(','),
    )
    const result = getAndValidateHiddenQuery({
      hide: 'foo,area,bar',
    })
    expect(result).toEqual(['area'])
  })

  test('It correctly calls mock', () => {
    getParameterFromQuery.mockImplementation((param, query) =>
      query.hide.split(','),
    )
    const result = getAndValidateHiddenQuery({
      hide: 'area',
    })
    expect(getParameterFromQuery).toHaveBeenCalledWith(
      'hide',
      expect.objectContaining({ hide: 'area' }),
    )
  })
})
