import { screen, render } from '@testing-library/react'

import { useRouter } from 'next/router'

// functions
import getAndValidateHiddenQuery from '../../../lib/settings/getAndValidateHiddenQuery'
import getRegionsQuery from '../../../lib/regionFilter/getRegionsQuery'
import validateRegionsQuery from '../../../lib/regionFilter/validateRegionsQuery'
import filterCountriesByRegion from '../../../lib/regionFilter/filterCountriesByRegion'
import getNumberQueryData from '../../../lib/numberFilter/getNumbersQueryData'
import filterCountriesByNumbers from '../../../lib/numberFilter/filterCountriesByNumbers'
import applySorting from '../../../lib/sorting/applySorting'

// components
import CountryList from '../CountryList'
import CountryCount from '../../header/CountryCount'
import Filters from '../../filters/Filters'
import CountryListHeaders from '../CountryListHeaders'
import CountryRow from '../CountryRow'

import { extraDataCountries } from '../../../__mock__/data/countriesMock'
import filterDataMock from '../../../__mock__/data/filterDataMock'

// mocking
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
jest.mock('../../../lib/settings/getAndValidateHiddenQuery')
jest.mock('../../../lib/regionFilter/getRegionsQuery')
jest.mock('../../../lib/regionFilter/validateRegionsQuery')
jest.mock('../../../lib/regionFilter/filterCountriesByRegion')
jest.mock('../../../lib/numberFilter/getNumbersQueryData')
jest.mock('../../../lib/numberFilter/filterCountriesByNumbers')
jest.mock('../../../lib/sorting/applySorting')
jest.mock('../../header/CountryCount')
jest.mock('../../filters/Filters')
jest.mock('../CountryListHeaders')
jest.mock('../CountryRow')

function setup(){
  render(
    <CountryList 
      countries={extraDataCountries} 
      filterData={filterDataMock} />
  )
}

function setMockReturnValues( 
  activeHidden, activeRegions, activeNumbers
){
  useRouter.mockReturnValue({
    isReady: true,
    query: {},
  })
  getAndValidateHiddenQuery.mockReturnValue(activeHidden)
  validateRegionsQuery.mockReturnValue(activeRegions)
  getNumberQueryData.mockReturnValue({
    activeNumberFilters: activeNumbers,
    currentSelection: {}
  })
  applySorting.mockReturnValue({
    countries: extraDataCountries,
    sortBy: 'sortBy',
    sortAsc: true,
  })
}

beforeEach(() => {
  jest.resetAllMocks()
  setMockReturnValues([],[],[])
})

describe('components/countryList/CountryList', () => {

  test('It called all the mocked functions and hooks', () => {
    setup()
    expect(useRouter).toHaveBeenCalled()
    expect(getAndValidateHiddenQuery).toHaveBeenCalled()
    expect(getRegionsQuery).toHaveBeenCalled()
    expect(validateRegionsQuery).toHaveBeenCalled()
    expect(filterCountriesByRegion).toHaveBeenCalled()
    expect(getNumberQueryData).toHaveBeenCalled()
    expect(filterCountriesByNumbers).toHaveBeenCalled()
    expect(applySorting).toHaveBeenCalled()
  })
  
  test('It renders', () => {
    setup()
    expect(CountryCount).toHaveBeenCalled()
    expect(Filters).toHaveBeenCalled()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(CountryListHeaders).toHaveBeenCalled()
    expect(CountryRow).toHaveBeenCalledTimes(6)
  })
  
  test('It renders loading', () => {
    useRouter.mockReturnValue({ isReady: false })
    setup()
    expect(screen.getByText('...loading')).toBeInTheDocument()
  })

  describe('It renders the grid correctly', () => {
    
    test('Grid has the correct styles with none hidden', () => {
      setup()
      expect(screen.getByRole('main')).toHaveStyle('gridTemplateColumns: 1.5em minmax(9em, 15em) repeat(3, minmax(auto, 9em))')
    })
  
    test('Grid has the correct styles with 1 hidden', () => {
      getAndValidateHiddenQuery.mockReturnValue(['area'])
      setup()
      expect(screen.getByRole('main')).toHaveStyle('gridTemplateColumns: 1.5em minmax(9em, 15em) repeat(2, minmax(auto, 9em))')
    })
    
    test('Grid has the correct styles with all hidden', () => {
      getAndValidateHiddenQuery.mockReturnValue(['population', 'area', 'density'])
      setup()
      expect(screen.getByRole('main')).toHaveStyle('gridTemplateColumns: 1.5em minmax(9em, 15em)')
    })

  })
  
  test('It displays the text /no results/', () => {
    applySorting.mockReturnValue({
      countries: [],
      sortBy: 'sortBy',
      sortAsc: true,
    })
    setup()
    expect(screen.getByText(/no results/i)).toBeInTheDocument()
  })

  describe('All mocked components where called with the correct props', () => {

    test('CountryCount mock was called with correct props when all countries are displayed', () => {
      setup()
      expect(CountryCount).toHaveBeenCalledWith(
        expect.objectContaining({
          count: 6
        }),
        expect.anything()
      )
    })

    describe('Filters mock', () => {

      test('Filters mock was called with correct props', () => {
        setup()
        expect(Filters).toHaveBeenCalledWith(
          expect.objectContaining({
            activeHidden: [],
            activeRegions: [],
            activeNumbers: expect.objectContaining({
              activeNumberFilters: []
            })
          }),
          expect.anything()
        )
      })

      test('Filters mock was called with correct props when activeHidden population', () => {
        getAndValidateHiddenQuery.mockReturnValue(['population'])
        setup()
        expect(Filters).toHaveBeenCalledWith(
          expect.objectContaining({
            activeHidden: ['population'],
          }),
          expect.anything()
        )
      })

      test('Filters mock was called with correct props when activeRegions Europe', () => {
        validateRegionsQuery.mockReturnValue(['Europe'])
        setup()
        expect(Filters).toHaveBeenCalledWith(
          expect.objectContaining({
            activeRegions: ['Europe'],
          }),
          expect.anything()
        )
      })

      test('Filters mock was called with correct props when activeNumbers', () => {
        getNumberQueryData.mockReturnValue({
          activeNumberFilters: ['area'],
          currentSelection: {}
        })
        setup()
        expect(Filters).toHaveBeenCalledWith(
          expect.objectContaining({
            activeNumbers: expect.objectContaining({
              activeNumberFilters: ['area'],
            })
          }),
          expect.anything()
        )
      })

    })

    describe('CountryListHeaders', () => {

      test('It was called with the correct hidden props', () => {
        getAndValidateHiddenQuery.mockReturnValue(['population'])
        setup()
        expect(CountryListHeaders).toHaveBeenCalledWith(
          expect.objectContaining({
            activeHidden: ['population'],
            sortBy: 'sortBy',
            sortAsc: true,
          }),
          expect.anything()
        )
      })

      test('It was called with the correct sort props', () => {
        applySorting.mockReturnValue({
          countries: extraDataCountries,
          sortBy: 'density',
          sortAsc: false,
        })
        setup()
        expect(CountryListHeaders).toHaveBeenCalledWith(
          expect.objectContaining({
            activeHidden: [],
            sortBy: 'density',
            sortAsc: false,
          }),
          expect.anything()
        )
      })

    })

    describe('CountryRow was called with the correct props', () => {
      
      test('It got called the correct number of times', () => {
        setup()
        expect(CountryRow).toHaveBeenCalledTimes(6)
      })

      test('The first country was called with the correct props when activeHidden area', () => {
        getAndValidateHiddenQuery.mockReturnValue(['area'])
        setup()
        expect(CountryRow).toHaveBeenNthCalledWith(1,
          expect.objectContaining({
            country: expect.objectContaining({
              cca3: 'AUT',
            }),
            activeHidden: ['area']
          }),
          expect.anything()
        )
      })

    })
    
  })

})