import validateNumbersAgainstDefaults from '../validateNumbersAgainstDefaults'
import isNumber from '../../helpers/isNumber'

jest.mock('../../helpers/isNumber')
isNumber.mockReturnValue(true)

beforeEach(() => {
  jest.clearAllMocks()
  isNumber.mockReturnValue(true)
})

describe('function validateNumbersAgainstDefaults', () => {

  describe('not empty', () => {

    test('It returns default when !value1 and/or !value2', () => {
      expect(validateNumbersAgainstDefaults(undefined, 2, [0,100])).toEqual([0,100])
      expect(validateNumbersAgainstDefaults("", 2, [0,100])).toEqual([0,100])
      expect(validateNumbersAgainstDefaults(1, undefined, [0,100])).toEqual([0,100])
      expect(validateNumbersAgainstDefaults(1, "", [0,100])).toEqual([0,100])
      expect(validateNumbersAgainstDefaults(undefined, undefined, [0,100])).toEqual([0,100])
      expect(validateNumbersAgainstDefaults(undefined, "", [0,100])).toEqual([0,100])
      expect(validateNumbersAgainstDefaults("", "", [0,100])).toEqual([0,100])
    })

    test('It returns the values when both values are defined', () => {
      expect(validateNumbersAgainstDefaults(30, 70, [0,100])).toEqual([30,70])
    })

    test('It does not consider value1 = 0 to be falsy', () => {
      expect(validateNumbersAgainstDefaults(0, 50, [0,100])).toEqual([0,50])
    })

    test('It does not consider both values = 0 tobe falsy', () => {
      expect(validateNumbersAgainstDefaults(0, 50, [0,100])).toEqual([0,50])
      expect(validateNumbersAgainstDefaults(0, 0, [0,100])).toEqual([0,0])
    })
  })

  describe('test isNumber', () => {

    test('It returns defaults when first value is not a number', () => {
      isNumber.mockReturnValueOnce(false)
      expect(validateNumbersAgainstDefaults('aaa', 123, [0,100])).toEqual([0,100])
    })
  
    test('It returns defaults when second value is not a number', () => {
      isNumber.mockReturnValueOnce(true)
      isNumber.mockReturnValue(false)
      expect(validateNumbersAgainstDefaults(123, 'aaa', [0,100])).toEqual([0,100])
    })
  
    test('It returns defaults when both values are not a number', () => {
      isNumber.mockReturnValue(false)
      expect(validateNumbersAgainstDefaults('bbb', 'aaa', [0,100])).toEqual([0,100])
    })
  
    // isNumber is mocked to force 'aaa' to return true
    test('It returns values when both values are numbers', () => {
      const result = validateNumbersAgainstDefaults('aaa', 'bbb', [0,100])
      expect(result).toEqual(['aaa','bbb'])
    })
  })

  describe('It flips the values', () => {

    test('If value1 < value2, return them', () => {
      isNumber.mockReturnValue(true)
      expect(validateNumbersAgainstDefaults(30, 70, [0, 100])).toEqual([30,70])
    })
  
    test('If value1 > value2, flip them around', () => {
      isNumber.mockReturnValue(true)
      expect(validateNumbersAgainstDefaults(70, 30, [0, 100])).toEqual([30,70])
    })

  })

  describe('It checks against default values', () => {

    test('value1 cannot be smaller then defaults[0]', () => {
      expect(validateNumbersAgainstDefaults(0, 90, [10, 100])).toEqual([10,90])
    })
  
    test('value2 cannot be smaller then defaults[0]', () => {
      expect(validateNumbersAgainstDefaults(0, 0 , [10, 100])).toEqual([10,10])
    })

    test('value1 cannot be larger then defaults[1]', () => {
      expect(validateNumbersAgainstDefaults(100, 100, [0, 90])).toEqual([90,90])
    })
  
    test('value2 cannot be larger then defaults[1]', () => {
      expect(validateNumbersAgainstDefaults(20, 100, [0, 90])).toEqual([20,90])
    })

    test('value1 and value2 are accepted even if defaults are equal', () => {
      expect(validateNumbersAgainstDefaults(50, 50, [50, 50])).toEqual([50,50])
      expect(validateNumbersAgainstDefaults(0, 0, [0, 0])).toEqual([0,0])
    })

  })

})