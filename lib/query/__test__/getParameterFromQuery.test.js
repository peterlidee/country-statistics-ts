import getParameterFromQuery from '../getParameterFromQuery'

describe('function getParameterFromQuery', () => {

  test('It returns [] when the query does not have the parameter', () => {
    const result1 = getParameterFromQuery('parameter1', {})
    expect(result1).toEqual([])
    const result2 = getParameterFromQuery('parameter1', { 'parameter2': 'value1,value2' })
    expect(result2).toEqual([])
  })

  test('It returns [] when the query parameter has an empty value', () => {
    const result1 = getParameterFromQuery('parameter1', {'parameter1': ''})
    expect(result1).toEqual([])
    const result2 = getParameterFromQuery('parameter1', { 'parameter1': '' ,'parameter2': 'value1,value2' })
    expect(result2).toEqual([])
  })

  test('It returns the value split by komma in an array', () => {
    const result1 = getParameterFromQuery('parameter1', {'parameter1': 'value1'})
    expect(result1).toEqual(['value1'])
    const result2 = getParameterFromQuery('parameter1', { 'parameter1': 'value1,value2,value3' ,'parameter2': 'value4,value4' })
    expect(result2).toEqual(['value1', 'value2', 'value3'])
  })

})