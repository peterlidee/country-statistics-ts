import extractCoordinates from '../extractCoords'
import isCoordinates from '../../../types/coordinatesPredicate'

jest.mock('../../../types/coordinatesPredicate')
isCoordinates.mockReturnValue(true)

describe('lib/single/extractCoordinates', () => {
  test('It returns empty array when data is not array', () => {
    const result = extractCoordinates(undefined)
    expect(result).toEqual([])
  })
  test('It does not return a country that is null', () => {
    const result = extractCoordinates([null])
    expect(result).toEqual([])
  })
  test('It does not return a country that is not an object', () => {
    const result = extractCoordinates([null, ''])
    expect(result).toEqual([])
  })
  test('It does not return a country that does not have a latlng prop', () => {
    const result = extractCoordinates([null, '', {}])
    expect(result).toEqual([])
  })
  test('It return the country when isCoordinates mock returns true', () => {
    const result = extractCoordinates([{ latlng: ['foo', 'bar'] }])
    expect(result).toEqual([['foo', 'bar']])
  })
  test('It does not return the country when isCoordinates mock returns false', () => {
    isCoordinates.mockReturnValueOnce(false)
    const result = extractCoordinates([{ latlng: ['foo', 'bar'] }])
    expect(result).toEqual([])
  })
  test('It returns the correct countries', () => {
    const result = extractCoordinates([
      { latlng: ['foo', 'bar'] },
      null,
      { latlng: ['foo1', 'bar1'] },
      { latlng: ['foo2', 'bar2'] },
      {},
    ])
    expect(result).toEqual([
      ['foo', 'bar'],
      ['foo1', 'bar1'],
      ['foo2', 'bar2'],
    ])
  })
})
