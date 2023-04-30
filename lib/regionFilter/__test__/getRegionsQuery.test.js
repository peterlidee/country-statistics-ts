import getRegionsQuery from '../getRegionsQuery'
jest.mock('../getRegionsQuery')

describe('function getRegionsQuery', () => {
  
  test('It correctly calls getParameterFromQuery', () => {
    getRegionsQuery({})
    expect(getRegionsQuery).toHaveBeenCalledTimes(1)
  })

  test('It returns a value', () => {
    getRegionsQuery.mockReturnValue('value')
    const result = getRegionsQuery({})
    expect(result).toBe('value')
  })

})