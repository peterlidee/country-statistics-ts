import getNumbersQueryData from '../getNumbersQueryData'
import validateNumbersQuery from '../validateNumbersQuery'
import isNumberFilterActive from '../isNumberFilterActive'
import { filterDataMock } from '../../../__mock__/data/filterDataMock'

jest.mock('../validateNumbersQuery')
jest.mock('../isNumberFilterActive')

beforeEach(() => {
  jest.resetAllMocks()
})

describe('function getNumbersQueryData', () => {
  test('It returns {activeNumberFilters and currentSelections}', () => {
    const result = getNumbersQueryData([], {}, filterDataMock)
    expect(result).toHaveProperty('activeNumberFilters')
    expect(result).toHaveProperty('currentSelections')
  })

  describe('validateNumbersQuery mock', () => {
    test('It calls validateNumbersQuery mock foreach visibleNumberFilter (no fields hidden) with the correct props', () => {
      // no hidden, no query
      getNumbersQueryData([], {}, filterDataMock)
      expect(validateNumbersQuery).toHaveBeenCalledTimes(3)
      expect(validateNumbersQuery).toHaveBeenNthCalledWith(
        1,
        undefined,
        [0, 37500000],
      )
      expect(validateNumbersQuery).toHaveBeenNthCalledWith(
        2,
        undefined,
        [0, 450000],
      )
      expect(validateNumbersQuery).toHaveBeenNthCalledWith(
        3,
        undefined,
        [0, 400],
      )
    })

    test('It calls validateNumbersQuery mock foreach visibleNumberFilter (area and population hidden) with the correct props', () => {
      getNumbersQueryData(['area', 'population'], {}, filterDataMock)
      expect(validateNumbersQuery).toHaveBeenCalledTimes(1)
      expect(validateNumbersQuery).toHaveBeenNthCalledWith(
        1,
        undefined,
        [0, 400],
      )
    })

    test('It does not call validateNumbersQuery with all fields hidden', () => {
      getNumbersQueryData(['area', 'population', 'density'], {}, filterDataMock)
      expect(validateNumbersQuery).not.toHaveBeenCalled()
    })

    test('It returns the return value from the mock of validateNumbersQuery on currentSelections prop', () => {
      validateNumbersQuery.mockReturnValue('returnValue')
      const result = getNumbersQueryData([], {}, filterDataMock)
      expect(result.currentSelections).toEqual({
        population: 'returnValue',
        area: 'returnValue',
        density: 'returnValue',
      })
    })

    test('If a NumberFieldSlug is in hiddenFields, then currentSelections[the hidden NumberFieldSlug] will equal the default [0,0]', () => {
      validateNumbersQuery.mockReturnValue(true)
      const result = getNumbersQueryData(
        ['area', 'density'],
        {},
        filterDataMock,
      )
      expect(result.currentSelections).toEqual({
        population: true,
        area: [0, 0],
        density: [0, 0],
      })
    })
  })

  describe('isNumberFilterActive mock', () => {
    test('It gets called correctly with no fields hidden', () => {
      validateNumbersQuery.mockReturnValue(true)
      getNumbersQueryData([], {}, filterDataMock)
      expect(isNumberFilterActive).toHaveBeenCalledTimes(3)
      expect(isNumberFilterActive).toHaveBeenNthCalledWith(
        1,
        true,
        [0, 37500000],
      )
      expect(isNumberFilterActive).toHaveBeenNthCalledWith(2, true, [0, 450000])
      expect(isNumberFilterActive).toHaveBeenNthCalledWith(3, true, [0, 400])
    })

    test('It get called correctly with 2 fields hidden', () => {
      validateNumbersQuery.mockReturnValue(true)
      getNumbersQueryData(['population', 'density'], {}, filterDataMock)
      expect(isNumberFilterActive).toHaveBeenCalledTimes(1)
      expect(isNumberFilterActive).toHaveBeenNthCalledWith(1, true, [0, 450000])
    })

    test('It returns all filters in the return activeNumberFilters', () => {
      isNumberFilterActive.mockReturnValue(true)
      const result = getNumbersQueryData([], {}, filterDataMock)
      expect(result.activeNumberFilters).toEqual([
        'population',
        'area',
        'density',
      ])
    })

    test('It only returns filters in the return activeNumberFilters when mock returned true', () => {
      isNumberFilterActive.mockReturnValueOnce(false)
      isNumberFilterActive.mockReturnValueOnce(true)
      isNumberFilterActive.mockReturnValueOnce(false)
      const result = getNumbersQueryData([], {}, filterDataMock)
      expect(result.activeNumberFilters).toEqual(['area'])
    })
  })

  describe('Testing routerQuery parameter', () => {
    test('It correctly returns router.query values into the result', () => {
      validateNumbersQuery.mockImplementation(
        (queryValue, defaults) => queryValue,
      )
      const result = getNumbersQueryData(
        [],
        {
          area: 'areaValue',
          population: 'populationValue',
          density: 'densityValue',
        },
        filterDataMock,
      )
      expect(validateNumbersQuery).toHaveBeenCalledTimes(3)
      expect(validateNumbersQuery).toHaveBeenNthCalledWith(
        1,
        'populationValue',
        [0, 37500000],
      )
      expect(validateNumbersQuery).toHaveBeenNthCalledWith(
        2,
        'areaValue',
        [0, 450000],
      )
      expect(validateNumbersQuery).toHaveBeenNthCalledWith(
        3,
        'densityValue',
        [0, 400],
      )
      expect(result.currentSelections).toEqual({
        area: 'areaValue',
        population: 'populationValue',
        density: 'densityValue',
      })
    })

    test('It returns a default value for each numberFieldSlug in hiddenFields', () => {
      validateNumbersQuery.mockImplementation(
        (queryValue, defaults) => queryValue,
      )
      const result = getNumbersQueryData(
        ['area', 'density'],
        {
          area: 'areaValue',
          population: 'populationValue',
          density: 'densityValue',
        },
        filterDataMock,
      )
      expect(validateNumbersQuery).toHaveBeenCalledTimes(1)
      expect(validateNumbersQuery).toHaveBeenNthCalledWith(
        1,
        'populationValue',
        [0, 37500000],
      )
      expect(result.currentSelections).toEqual({
        area: [0, 0],
        population: 'populationValue',
        density: [0, 0],
      })
    })
  })
})
