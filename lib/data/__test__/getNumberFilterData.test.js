// we don't test the actual getNumberFilterData function because it is just the same as getMinMax + calculateNumberSliderSettings

import { 
  getMinAndMax,
  closestRoundish,
  findClosestToTarget,
  stepsNeeded,
  calculateNumberSliderSetting,
} from '../getNumberFilterData'
import filterDataMock from '../../../__mock__/data/filterDataMock'

describe('function getMinMax', () => {
  test('It returns the minimum and maximum data out of an array', () => {
    const test1 = [1,2,3,4,5,6]
    const test2 = [6,5,4,3,2,1]
    const test3 = [1,1,1,1,1,1]
    const test4 = [10,1,650,1,9]
    expect(getMinAndMax(test1)).toEqual({min: 1, max: 6})
    expect(getMinAndMax(test2)).toEqual({min: 1, max: 6})
    expect(getMinAndMax(test3)).toEqual({min: 1, max: 1})
    expect(getMinAndMax(test4)).toEqual({min: 1, max: 650})
  })
  test('It does not return negative values', () => {
    expect(getMinAndMax([-3, 1]).min).not.toEqual(-3)
  })
  test('It returns 0 instead of negative value', () => {
    expect(getMinAndMax([-3, 1]).min).toEqual(0)
  })
})

describe('function closestRoundish', () => {
  test('It returns 5 roundish numbers', () => {
    expect(closestRoundish(36)).toEqual([10,25,50,75,100])
    expect(closestRoundish(2354)).toEqual([1000,2500,5000,7500,10000])
  })
  test('It returns [1,5,10] for values below 10', () => {
    expect(closestRoundish(9)).toEqual([1,5,10])
  })
})

describe('function stepsNeeded', () => {
  test('It returns the correct number of steps', () => {
    expect(stepsNeeded(10, 0, 100)).toBe(10)
    expect(stepsNeeded(5, 0, 100)).toBe(20)
  })
})

describe('function findClosestToTarget', () => {

  test('It returns the index of the number when exact match', () => {
    const arr = [1,2,3,4,5,6,7,8,9,10]
    expect(findClosestToTarget(arr, 1)).toBe(0)
    expect(findClosestToTarget(arr, 10)).toBe(9)
    expect(findClosestToTarget(arr, 8)).toBe(7)
    expect(findClosestToTarget(arr, 5)).toBe(4)
  })

  test('It returns the index of the number closest to target', () => {
    const arr = [1,10,100,1000,10000]
    expect(findClosestToTarget(arr, 110)).toBe(2)
    expect(findClosestToTarget(arr, 990)).toBe(3)
  })

  test('It returns the first matching index when 2 numbers are as close to the target', () => {
    const arr = [1,2,3,4,6,7,8,9,10]
    expect(findClosestToTarget(arr, 5)).toBe(3)
  })

  test('It selects last index when number is way bigger', () => {
    const arr = [1,2,3,4]
    expect(findClosestToTarget(arr, 1000000)).toBe(3)
  })

})

describe('function calculateNumberSliderSetting', () => {

  const test1 = calculateNumberSliderSetting(100,1000,20)
  const test2 = calculateNumberSliderSetting(38,113500,20)

  test('It returns the correct sliderStart', () => {
    expect(test1.sliderStart).toBe(100)
    expect(test2.sliderStart).toBe(0)
  })
  test('It returns the correct sliderEnd', () => {
    expect(test1.sliderEnd).toBe(1000)
    expect(test2.sliderEnd).toBe(115000)
  })
  test('It returns the correct sliderStep', () => {
    expect(test1.sliderStep).toBe(50)
    expect(test2.sliderStep).toBe(5000)
  })
  test('It returns min param as countryMin and max as countryMax', () => {
    expect(test1.countryMin).toBe(100)
    expect(test2.countryMin).toBe(38)
    expect(test1.countryMax).toBe(1000)
    expect(test2.countryMax).toBe(113500)
  })
})

describe('Running all functions with mock data', () => {

  const mock1 = [filterDataMock.area.countryMin, filterDataMock.area.countryMax]
  const mock2 = [filterDataMock.population.countryMin, filterDataMock.population.countryMax]
  const mock3 = [filterDataMock.density.countryMin, filterDataMock.density.countryMax]

  const mock1Closest = closestRoundish((mock1[1]-mock1[0])/15)
  const mock2Closest = closestRoundish((mock2[1]-mock2[0])/15)
  const mock3Closest = closestRoundish((mock3[1]-mock3[0])/15)

  test('Get correct stepOptions', () => {
    expect(mock1Closest).toEqual([10000,25000,50000,75000,100000])
    expect(mock2Closest).toEqual([1000000,2500000,5000000,7500000,10000000])
    expect(mock3Closest).toEqual([10,25,50,75,100])
  })

  const mock1StepsNeeded = mock1Closest.map(option => stepsNeeded(option, mock1[0], mock1[1]))
  const mock2StepsNeeded = mock2Closest.map(option => stepsNeeded(option, mock2[0], mock2[1]))
  const mock3StepsNeeded = mock3Closest.map(option => stepsNeeded(option, mock3[0], mock3[1]))

  test('Get correct stepsNeeded', () => {
    expect(mock1StepsNeeded).toEqual([45, 18, 9, 6, 5])
    expect(mock2StepsNeeded).toEqual([37, 15, 8, 5, 4])
    expect(mock3StepsNeeded).toEqual([38, 16, 8, 6, 4])
  })

  const mock1TargetIndex = findClosestToTarget(mock1StepsNeeded, 15)
  const mock2TargetIndex = findClosestToTarget(mock2StepsNeeded, 15)
  const mock3TargetIndex = findClosestToTarget(mock3StepsNeeded, 15)

  test('Get correct findClosestToTarget (index)', () => {
    expect(mock1TargetIndex).toEqual(1)
    expect(mock2TargetIndex).toEqual(1)
    expect(mock3TargetIndex).toEqual(1)
  })

  describe('Run calculateNumberSliderSetting with mock data', () => {
    const mock1Calculations = calculateNumberSliderSetting(mock1[0], mock1[1], 15)
    const mock2Calculations = calculateNumberSliderSetting(mock2[0], mock2[1], 15)
    const mock3Calculations = calculateNumberSliderSetting(mock3[0], mock3[1], 15)
    
    test('the mocks receive correct sliderSteps', () => {
      expect(mock1Calculations.sliderStep).toBe(25000)
      expect(mock2Calculations.sliderStep).toBe(2500000)
      expect(mock3Calculations.sliderStep).toBe(25)
    })

    test('SliderStart is correct', () => {
      expect(mock1Calculations.sliderStart).toBe(0)
      expect(mock2Calculations.sliderStart).toBe(0)
      expect(mock3Calculations.sliderStart).toBe(0)
      // extra one to check for countryMin - sliderStep > 0
      expect(calculateNumberSliderSetting(500, 600, 15).sliderStart).toBe(500)
    })

    test('SliderEnd is correct', () => {
      expect(mock1Calculations.sliderEnd).toBe(450000)
      expect(mock2Calculations.sliderEnd).toBe(37500000)
      expect(mock3Calculations.sliderEnd).toBe(400)
      // extra one to check if countryMax % sliderStep === 0
      expect(calculateNumberSliderSetting(0,100,10).sliderEnd).toBe(100)
    })

  })

})





