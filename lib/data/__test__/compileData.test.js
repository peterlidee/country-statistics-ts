import compileData from '../compileData'
import formatNumber from '../../helpers/formatNumber'
import roundNumber from '../../helpers/roundNumber'

jest.mock('../../helpers/formatNumber', () => {
  return jest.fn((param) => param)
})
jest.mock('../../helpers/roundNumber', () => {
  return jest.fn((param) => param)
})

describe('function compileData', () => {
  test('It adds property country', () => {
    const result = compileData([{ name: { common: 'Test' } }])
    expect(result[0]).toHaveProperty('country')
    expect(result[0]).toMatchObject({
      country: 'Test',
    })
  })

  test('It adds an empty string for country when there is no name prop or no name.common prop', () => {
    expect(compileData([{ name: {} }])[0].country).toBe('')
    expect(compileData([{}])[0].country).toBe('')
  })

  test('It adds property cca3', () => {
    const result = compileData([{ cca3: 'TES' }])
    expect(result[0].cca3).toBe('TES')
  })

  test('It adds a region property', () => {
    const result = compileData([{ region: 'region' }])
    expect(result[0]).toHaveProperty('region')
    expect(result[0].region).toBe('region')
  })

  test('It adds a subregion property', () => {
    const result = compileData([{ subregion: 'subregion' }])
    expect(result[0]).toHaveProperty('subregion')
    expect(result[0].subregion).toBe('subregion')
  })

  describe('It adds area or a default', () => {
    test('It adds default area and areaPrettyFormat when item does not have area', () => {
      const result = compileData([{}])
      expect(result[0]).toMatchObject({
        area: 0,
        areaPrettyFormat: '0',
      })
    })

    test('It didn not call roundNumber or formatNumber when item did not have area prop', () => {
      const result = compileData([{}])
      expect(roundNumber).not.toHaveBeenCalled()
      expect(formatNumber).not.toHaveBeenCalled()
    })

    test('It adds a area +prettyformat property when the item has area prop', () => {
      const result = compileData([{ area: 10000 }])
      expect(formatNumber).toHaveBeenCalledWith(10000)
      expect(roundNumber).toHaveBeenCalledWith(10000)
      expect(result[0]).toMatchObject({
        area: 10000,
        areaPrettyFormat: 10000,
      })
    })
  })

  describe('It adds population or a default', () => {
    test('It adds default population and populationPrettyFormat when item does not have population', () => {
      const result = compileData([{}])
      expect(result[0]).toMatchObject({
        population: 0,
        populationPrettyFormat: '0',
      })
    })

    test('It didn not call roundNumber or formatNumber when item did not have population prop', () => {
      const result = compileData([{}])
      expect(roundNumber).not.toHaveBeenCalled()
      expect(formatNumber).not.toHaveBeenCalled()
    })

    test('It adds a population +prettyformat property when the item has population prop', () => {
      const result = compileData([{ population: 100000 }])
      expect(formatNumber).toHaveBeenCalledWith(100000)
      expect(roundNumber).toHaveBeenCalledWith(100000)
      expect(result[0]).toMatchObject({
        population: 100000,
        populationPrettyFormat: 100000,
      })
    })
  })

  describe('It adds density or a default', () => {
    test('It adds density and densityPrettyFormat even if there is no area or population', () => {
      const result = compileData([{}])
      expect(result[0]).toMatchObject({
        density: 0,
        densityPrettyFormat: '0',
      })
      expect(roundNumber).not.toHaveBeenCalled()
      expect(formatNumber).not.toHaveBeenCalled()
    })

    test('It adds density and densityPrettyFormat even if there is only area and no population', () => {
      const result = compileData([{ area: 1000 }])
      expect(result[0]).toMatchObject({
        density: 0,
        densityPrettyFormat: '0',
      })
      expect(roundNumber).toHaveBeenCalledTimes(1)
      expect(formatNumber).toHaveBeenCalledTimes(1)
    })

    test('It adds density and densityPrettyFormat even if there is only population and no area', () => {
      const result = compileData([{ population: 1000 }])
      expect(result[0]).toMatchObject({
        density: 0,
        densityPrettyFormat: '0',
      })
      expect(roundNumber).toHaveBeenCalledTimes(1)
      expect(formatNumber).toHaveBeenCalledTimes(1)
    })

    test('It adds the correct density and densityPrettyFormat when items have an area and a population', () => {
      const result = compileData([{ area: 10, population: 1000 }])
      expect(roundNumber).toHaveBeenCalledTimes(3)
      expect(roundNumber).toHaveBeenNthCalledWith(1, 10)
      expect(roundNumber).toHaveBeenNthCalledWith(2, 1000)
      expect(roundNumber).toHaveBeenNthCalledWith(3, 100)

      expect(formatNumber).toHaveBeenCalledTimes(3)
      expect(formatNumber).toHaveBeenNthCalledWith(1, 10)
      expect(formatNumber).toHaveBeenNthCalledWith(2, 1000)
      expect(formatNumber).toHaveBeenNthCalledWith(3, 100)

      expect(result[0]).toMatchObject({
        density: 100,
        densityPrettyFormat: 100,
      })
    })
  })

  test('It replaces Åland with Aland', () => {
    const result = compileData([{ name: { common: 'Test' }, cca3: 'ALA' }])
    expect(result[0].country).toBe('Aland Islands')
  })

  test('It correctly handles multiple entries', () => {
    const result = compileData([
      {},
      { area: 100 },
      { name: { common: 'Test' } },
    ])
    expect(result.length).toBe(3)
    expect(result[1].area).toBe(100)
    expect(result[2].country).toBe('Test')
  })
})
