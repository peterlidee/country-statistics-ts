import getNumbersQueryData from '../getNumbersQueryData'
import validateNumbersQuery from '../validateNumbersQuery'
import isNumberFilterActive from '../isNumberFilterActive'
import filterDataMock from '../../../__mock__/data/filterDataMock'

jest.mock('../validateNumbersQuery')
jest.mock('../isNumberFilterActive')

describe('function getNumbersQueryData', () => {

  test('It returns {activeNumberFilters and currentSelections}', () => {
    const result = getNumbersQueryData(
      [], 
      {},
      filterDataMock
    )
    expect(result).toHaveProperty('activeNumberFilters')
    expect(result).toHaveProperty('currentSelections')
  })

  describe('validateNumbersQuery mock', () => {

    test('It calls validateNumbersQuery mock foreach visibleNumberFilter with the correct props (no fields hidden)', () => {
      getNumbersQueryData(
        [], 
        {},
        filterDataMock
      )
      expect(validateNumbersQuery).toHaveBeenCalledTimes(3)
      expect(validateNumbersQuery).toHaveBeenNthCalledWith(1, undefined, [0,37500000])
      expect(validateNumbersQuery).toHaveBeenNthCalledWith(2, undefined, [0,450000])
      expect(validateNumbersQuery).toHaveBeenNthCalledWith(3, undefined, [0,400])
    })

    test('It calls validateNumbersQuery mock foreach visibleNumberFilter with the correct props (area and population hidden)', () => {
      getNumbersQueryData(
        ['area', 'population'], 
        {},
        filterDataMock
      )
      expect(validateNumbersQuery).toHaveBeenCalledTimes(1)
      expect(validateNumbersQuery).toHaveBeenNthCalledWith(1, undefined, [0,400])
    })

    test('It does not call validateNumbersQuery with all fields hidden', () => {
      getNumbersQueryData(
        ['area', 'population', 'density'], 
        {},
        filterDataMock
      )
      expect(validateNumbersQuery).not.toHaveBeenCalled()
    })

    test('It returns the return value from the mock of validateNumbersQuery on currentSelections prop', () => {
      validateNumbersQuery.mockReturnValue(true)
      const result = getNumbersQueryData(
        [], 
        {},
        filterDataMock
      )
      expect(result.currentSelections).toEqual(
        { population: true, area: true, density: true }
      )
      validateNumbersQuery.mockClear()
    })

    test('It does not return a hidden value on the currentSelections prop', () => {
      validateNumbersQuery.mockReturnValue(true)
      const result = getNumbersQueryData(
        ['area', 'density'], 
        {},
        filterDataMock
      )
      expect(result.currentSelections).toEqual(
        { population: true }
      )
      validateNumbersQuery.mockClear()
    })
  
  })

  describe('isNumberFilterActive mock', () => {

    test('It gets called correctly with no fields hidden', () => {
      validateNumbersQuery.mockReturnValue(true)
      getNumbersQueryData(
        [], 
        {},
        filterDataMock
      )
      expect(isNumberFilterActive).toHaveBeenCalledTimes(3)
      expect(isNumberFilterActive).toHaveBeenNthCalledWith(1, 
        true, [0, 37500000]
      )
      expect(isNumberFilterActive).toHaveBeenNthCalledWith(2, 
        true, [0, 450000]
      )
      expect(isNumberFilterActive).toHaveBeenNthCalledWith(3, 
        true, [0, 400]
      )
      validateNumbersQuery.mockClear()
    })

    test('It get called correctly with 2 fields hidden', () => {
      validateNumbersQuery.mockReturnValue(true)
      getNumbersQueryData(
        ['population', 'density'], 
        {},
        filterDataMock
      )
      expect(isNumberFilterActive).toHaveBeenCalledTimes(1)
      expect(isNumberFilterActive).toHaveBeenNthCalledWith(1, 
        true, [0, 450000]
      )
      validateNumbersQuery.mockClear()
    })

    test('It returns all filters in the return activeNumberFilters', () => {
      isNumberFilterActive.mockReturnValue(true)
      const result = getNumbersQueryData(
        [], 
        {},
        filterDataMock
      )
      expect(result.activeNumberFilters).toEqual(["population", "area", "density"])
      isNumberFilterActive.mockClear()
    })

    test('It only returns filters in the return activeNumberFilters when mock returned true', () => {
      isNumberFilterActive.mockReturnValueOnce(false)
      isNumberFilterActive.mockReturnValueOnce(true)
      isNumberFilterActive.mockReturnValueOnce(false)
      const result = getNumbersQueryData(
        [], 
        {},
        filterDataMock
      )
      expect(result.activeNumberFilters).toEqual([ "area" ])
      isNumberFilterActive.mockClear()
    })

  })

})