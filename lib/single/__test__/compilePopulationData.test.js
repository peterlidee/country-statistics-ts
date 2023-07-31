import compilePopulationData from '../compilePopulationData'
import extractPopulationData from '../extractPopulationData'
jest.mock('../extractPopulationData')

const expectedDefault = {
  femaleTotal: [],
  maleTotal: [],
  combinedTotal: [],
  years: [],
}

describe('function compilePopulationData', () => {
  test('It returns default and empty extraError when no data', () => {
    const result = compilePopulationData(undefined, undefined)
    expect(result.extraError).toBeUndefined()
    expect(result.populationData).toMatchObject(expectedDefault)
    expect(extractPopulationData).not.toHaveBeenCalled()
  })
  test('It returns default and empty extraError when error', () => {
    const result = compilePopulationData(undefined, new Error('Foobar'))
    expect(result.extraError).toBeUndefined()
    expect(result.populationData).toMatchObject(expectedDefault)
    expect(extractPopulationData).not.toHaveBeenCalled()
  })
  test('It returns default and extraError when data not array', () => {
    const result = compilePopulationData('foobar', undefined)
    expect(result.extraError.message).toBe('No data for this country.')
    expect(result.populationData).toMatchObject(expectedDefault)
    expect(extractPopulationData).not.toHaveBeenCalled()
  })
  test('It returns default and extraError when data[0].message', () => {
    const result = compilePopulationData(
      [{ message: [{ value: 'Foobar' }] }],
      undefined,
    )
    expect(result.extraError.message).toBe('Foobar')
    expect(result.populationData).toMatchObject(expectedDefault)
    expect(extractPopulationData).not.toHaveBeenCalled()
  })
  test('It returns default and extraError when data[0].total is 0', () => {
    const result = compilePopulationData([{ total: 0 }], undefined)
    expect(result.extraError.message).toBe('No data for this country.')
    expect(result.populationData).toMatchObject(expectedDefault)
    expect(extractPopulationData).not.toHaveBeenCalled()
  })
  test('It calls extractPopulationData mock when valid data', () => {
    extractPopulationData.mockImplementation(() => 'mockData')
    const result = compilePopulationData([{}, 'foobar'], undefined)
    expect(extractPopulationData).toHaveBeenCalledWith('foobar')
    expect(result.extraError).toBeUndefined()
    expect(result.populationData).toBe('mockData')
  })
})
