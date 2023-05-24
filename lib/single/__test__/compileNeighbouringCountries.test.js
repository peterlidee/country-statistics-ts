import compileNeighbouringCountries from '../compileNeighbouringCountries'
import { neighboursMock } from '../../../__mock__/data/neighboursMock'

describe('function compileNeighbouringCountries', () => {
  test('It returns valid data when given valid rawData', () => {
    const result = compileNeighbouringCountries(neighboursMock)
    expect(result).toHaveLength(4)
    expect(result[0]).toMatchObject({
      countryName: 'Mali',
      cca3: 'MLI',
    })
    expect(result[1]).toMatchObject({
      countryName: 'Western Sahara',
      cca3: 'ESH',
    })
    expect(result[2]).toMatchObject({
      countryName: 'Mauritania',
      cca3: 'MRT',
    })
    expect(result[3]).toMatchObject({
      countryName: 'Niger',
      cca3: 'NER',
    })
  })
  test('It does not return item if item is not an object', () => {
    const result = compileNeighbouringCountries(['foobar'])
    expect(result).toEqual([])
  })
  test('It does not return item if item is null', () => {
    const result = compileNeighbouringCountries([null])
    expect(result).toEqual([])
  })

  describe('validate name when valid cca3', () => {
    test('It does not return item if item does not have property name', () => {
      const result = compileNeighbouringCountries([{ cca3: 'foo' }])
      expect(result).toEqual([])
    })
    test('It does not return item if item.name is null', () => {
      const result = compileNeighbouringCountries([{ name: null, cca3: 'foo' }])
      expect(result).toEqual([])
    })
    test('It does not return item if item.name is not an object', () => {
      const result = compileNeighbouringCountries([
        { name: 'foobar', cca3: 'foo' },
      ])
      expect(result).toEqual([])
    })
    test('It does not return item if item.name object does not have property common', () => {
      const result = compileNeighbouringCountries([{ name: {}, cca3: 'foo' }])
      expect(result).toEqual([])
    })
    test('When item.name.common is valid, it returns the item (if item.cca3 is valid)', () => {
      const result = compileNeighbouringCountries([
        { name: { common: 'foobar' }, cca3: 'foo' },
      ])
      expect(result[0]).toEqual({
        countryName: 'foobar',
        cca3: 'foo',
      })
    })
  })

  describe('validate cca3 with valid name', () => {
    test('When item does not have prop cca3 it does not return the item', () => {
      const result = compileNeighbouringCountries([
        { name: { common: 'foobar' } },
      ])
      expect(result).toEqual([])
    })
    test('When item.cca3 is valid, it returns the item (if item.name is valid)', () => {
      const result = compileNeighbouringCountries([
        { name: { common: 'foobar' }, cca3: 'foo' },
      ])
      expect(result[0]).toEqual({
        countryName: 'foobar',
        cca3: 'foo',
      })
    })
  })

  test('It correctly compiles mixed valid/invalid array', () => {
    const result = compileNeighbouringCountries([
      neighboursMock[0],
      { name: { common: 'foobar' } },
      neighboursMock[1],
      {},
    ])
    expect(result).toHaveLength(2)
    expect(result[0]).toMatchObject({
      countryName: 'Mali',
      cca3: 'MLI',
    })
    expect(result[1]).toMatchObject({
      countryName: 'Western Sahara',
      cca3: 'ESH',
    })
  })
})
