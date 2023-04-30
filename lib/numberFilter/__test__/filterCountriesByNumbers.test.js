import filterCountriesByNumbers from '../filterCountriesByNumbers'
import { extraDataCountries } from '../../../__mock__/data/countriesMock'
import filterDataMock from '../../../__mock__/data/filterDataMock'

const areaSelection = [filterDataMock.area.sliderStart, filterDataMock.area.sliderEnd]
const populationSelection = [filterDataMock.population.sliderStart, filterDataMock.population.sliderEnd]
const densitySelection = [filterDataMock.density.sliderStart, filterDataMock.density.sliderEnd]

describe('function filterCountriesByNumbers(countries, activeNumberFilters, selections)', () => {

  test('It returns all countries when no active filters', () => {
    const filteredCountries = filterCountriesByNumbers(
      extraDataCountries, 
      [],
      {
        area: areaSelection,
        population: populationSelection,
        density: densitySelection,
      },
    )
    expect(filteredCountries).toHaveLength(6)
  })

  test('It returns all countries when there are activeFilters but selections were unchanged', () => {
    const filteredCountries = filterCountriesByNumbers(
      extraDataCountries, 
      ['area', 'population', 'density'],
      {
        area: areaSelection,
        population: populationSelection,
        density: densitySelection,
      },
    )
    expect(filteredCountries).toHaveLength(6)
  })

  describe('Filter by area', () => {
    
    test('steps', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['area'],
        {
          area: [25000, 450000],
          population: populationSelection,
          density: densitySelection,
        }
      )
      expect(filteredCountries).toHaveLength(4)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
      expect(filteredCountries[2].cca3).toBe('BEL')
      expect(filteredCountries[3].cca3).toBe('MAR')
      
      const filteredCountries2 = filterCountriesByNumbers(
        extraDataCountries, 
        ['area'],
        {
          area: [0, 75000],
          population: populationSelection,
          density: densitySelection,
        }
      )
      expect(filteredCountries2).toHaveLength(4)
      expect(filteredCountries2[0].cca3).toBe('DNK')
      expect(filteredCountries2[1].cca3).toBe('BEL')
      expect(filteredCountries2[2].cca3).toBe('PRI')
      expect(filteredCountries2[3].cca3).toBe('SGS')
    })
  
    test('custom numbers', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries,
        ['area'],
        {
          area: [11000, 33000],
          population: populationSelection,
          density: densitySelection,
        }
        )
      expect(filteredCountries).toHaveLength(1)
      expect(filteredCountries[0].cca3).toBe('BEL')
    })
      
  })
    
  describe('Filter by population', () => {

    test('Step', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['population'],
        {
          area: areaSelection,
          population: [2500000, 12500000],
          density: densitySelection,
        }
      )
      expect(filteredCountries).toHaveLength(4)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
      expect(filteredCountries[2].cca3).toBe('BEL')
      expect(filteredCountries[3].cca3).toBe('PRI')

      const filteredCountries2 = filterCountriesByNumbers(
        extraDataCountries, 
        ['population'],
        {
          area: areaSelection,
          population: [5000000, 8000000],
          density: densitySelection,
        }
      )
      expect(filteredCountries2).toHaveLength(1)
      expect(filteredCountries2[0].cca3).toBe('DNK')
    })

    test('Custom numbers', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['population'],
        {
          area: areaSelection,
          population: [3000123, 9000123],
          density: densitySelection,
        }
      )
      expect(filteredCountries).toHaveLength(3)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
      expect(filteredCountries[2].cca3).toBe('PRI')
    })

  })

  describe('Filter by density', () => {

    test('Steps', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['density'],
        {
          area: areaSelection,
          population: populationSelection,
          density: [75,225],
        }
      )
      expect(filteredCountries).toHaveLength(3)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
      expect(filteredCountries[2].cca3).toBe('MAR')
    })

    test('Custom numbers', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['density'],
        {
          area: areaSelection,
          population: populationSelection,
          density: [12,165],
        }
      )
      expect(filteredCountries).toHaveLength(3)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
      expect(filteredCountries[2].cca3).toBe('MAR')
    })

  })

  describe('Filtering by multiple', () => {

    test('area and population', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['area', 'population'],
        {
          area: [40000,100000],
          population: [5000000,90000000],
          density: densitySelection
        }
      )
      expect(filteredCountries).toHaveLength(2)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
    })

    test('area and density', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['area', 'density'],
        {
          area: [0,100000],
          population: populationSelection,
          density: [100,400],
        }
      )
      expect(filteredCountries).toHaveLength(4)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
      expect(filteredCountries[2].cca3).toBe('BEL')
      expect(filteredCountries[3].cca3).toBe('PRI')
    })

    test('area, population and density', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['area', 'population', 'density'],
        {
          area: [0,100000],
          population: [5000000,12000000],
          density: [100,400],
        }
      )
      expect(filteredCountries).toHaveLength(3)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
      expect(filteredCountries[2].cca3).toBe('BEL')
    })

  })

})