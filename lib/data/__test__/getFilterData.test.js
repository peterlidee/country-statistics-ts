import getFilterData from '../getFilterData'
import { getNumberFilterData } from '../getNumberFilterData'
import { extraDataCountries } from '../../../__mock__/data/countriesMock'

jest.mock('../getNumberFilterData', () => {
  return {
    getNumberFilterData: jest.fn(param => param)
  }
})

// function to test
const filterData = getFilterData(extraDataCountries)

describe('function getFilterData', () => {
  
  test('It returns false when no countries', () => {
    expect(getFilterData()).toBe(false)
  })

  test('It returns an object with 5 properties', () => {
    expect(filterData).toHaveProperty('defaultRegionState')
    expect(filterData).toHaveProperty('regionIndexes')
    expect(filterData).toHaveProperty('area')
    expect(filterData).toHaveProperty('population')
    expect(filterData).toHaveProperty('density')
  })

  const { defaultRegionState } = filterData
  test('defaultRegionState should have 4 regions', () => {
    expect(defaultRegionState).toHaveProperty('Africa')
    expect(defaultRegionState).toHaveProperty('Americas')
    expect(defaultRegionState).toHaveProperty('Antarctic')
    expect(defaultRegionState).toHaveProperty('Europe')
  })

  const { defaultRegionState: { Europe }} = filterData
  test('Europe should', () => {
    expect(Europe).toHaveProperty('subregionNames')
    expect(Europe.subregionNames).toEqual(
      ['Central Europe', 'Northern Europe', 'Western Europe']
    )
  })

  describe('regionIndexes', () => {
    const { regionIndexes } = filterData
    
    test('should have 9 properties', () => {
      expect(regionIndexes).toHaveProperty('Africa')
      expect(regionIndexes).toHaveProperty('Americas')
      expect(regionIndexes).toHaveProperty('Antarctic')
      expect(regionIndexes).toHaveProperty('Europe')
      expect(regionIndexes).toHaveProperty('Northern Africa')
      expect(regionIndexes).toHaveProperty('Caribbean')
      expect(regionIndexes).toHaveProperty('Central Europe')
      expect(regionIndexes).toHaveProperty('Northern Europe')
      expect(regionIndexes).toHaveProperty('Western Europe')
    })
    test('should equal', () => {
      expect(regionIndexes['Africa']).toEqual([3])
      expect(regionIndexes['Northern Africa']).toEqual([3])
      expect(regionIndexes['Americas']).toEqual([4])
      expect(regionIndexes['Caribbean']).toEqual([4])
      expect(regionIndexes['Europe']).toEqual([0,1,2])
      expect(regionIndexes['Central Europe']).toEqual([0])
      expect(regionIndexes['Northern Europe']).toEqual([1])
      expect(regionIndexes['Western Europe']).toEqual([2])
      expect(regionIndexes['Antarctic']).toEqual([5])
    })
  })

  describe('getNumberFilterData was called with the correct props', () => {

    test('It get called the correct number of times', () => {
      getFilterData(extraDataCountries)
      expect(getNumberFilterData).toHaveBeenCalledTimes(3)
    })

    test('It calls getNumberFilterData correctly for area', () => {
      const filterData = getFilterData(extraDataCountries)
      expect(getNumberFilterData).toHaveBeenNthCalledWith(1, [
        83871,
        43094,
        30528,
        446550,
        8870,
        3903,
      ])
    })

    test('It calls getNumberFilterData correctly for population', () => {
      getFilterData(extraDataCountries)
      expect(getNumberFilterData).toHaveBeenNthCalledWith(2, [
        8917205,
        5831404,
        11555997,
        36910558,
        3194034,
        30,
      ])
    })

    test('It calls getNumberFilterData correctly for density', () => {
      getFilterData(extraDataCountries)
      expect(getNumberFilterData).toHaveBeenNthCalledWith(3, [
        106,
        135,
        379,
        83,
        360,
        0,
      ])
    })

  })

})