import {
  isNumberField,
  isNumberFieldSlug,
  isTextField,
  isTextFieldSlug,
} from '../fieldsPredicates'

describe('types/fieldsPredicates', () => {
  describe('function isNumberField', () => {
    test('It identifies a field as numberField', () => {
      const result = isNumberField({ sortType: 'number' })
      expect(result).toBe(true)
    })
    test('It returns false when not a numberField', () => {
      const result = isNumberField({ sortType: 'text' })
      expect(result).toBe(false)
    })
  })

  describe('function isTextField', () => {
    test('It identifies a field as textField', () => {
      const result = isTextField({ sortType: 'text' })
      expect(result).toBe(true)
    })
    test('It returns false when not a textField', () => {
      const result = isTextField({ sortType: 'number' })
      expect(result).toBe(false)
    })
  })

  describe('function isNumberFieldSlug', () => {
    test('It identifies slugs as numberFieldSlugs', () => {
      expect(isNumberFieldSlug('area')).toBe(true)
      expect(isNumberFieldSlug('density')).toBe(true)
      expect(isNumberFieldSlug('population')).toBe(true)
    })
    test('It returns false when not numberFieldSlug', () => {
      expect(isNumberFieldSlug('foobar')).toBe(false)
      expect(isNumberFieldSlug('')).toBe(false)
      expect(isNumberFieldSlug(false)).toBe(false)
      expect(isNumberFieldSlug('are')).toBe(false)
      expect(isNumberFieldSlug('ulation')).toBe(false)
    })
  })

  describe('function isTextFieldSlug', () => {
    test('It identifies slugs as textFieldSlugs', () => {
      expect(isTextFieldSlug('country')).toBe(true)
    })
    test('It returns false when not textFieldSlug', () => {
      expect(isTextFieldSlug('foobar')).toBe(false)
      expect(isTextFieldSlug('')).toBe(false)
      expect(isTextFieldSlug(false)).toBe(false)
      expect(isTextFieldSlug('ountry')).toBe(false)
      expect(isTextFieldSlug('countr')).toBe(false)
    })
  })
})
