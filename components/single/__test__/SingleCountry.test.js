import { screen, render } from '@testing-library/react'

import Header from '../../header/Header'
import Sources from '../../sources/Sources'
import Source from '../../sources/Source'
import BreadCrumb from '../BreadCrumb'

import SingleCountry from '../SingleCountry'
import SingleCountryHeader from '../sections/SingleCountryHeader'
import SingleCountryStatus from '../sections/SingleCountryStatus'
import SingleCountryFlags from '../sections/SingleCountryFlags'
import SingleCountryBasisStats from '../sections/SingleCountryBasicStats'
import SingleCountryWeather2 from '../sections/SingleCountryWeather2'
import SingleCountryMap from '../sections/SingleCountryMap'
import SingleCountryRegion from '../sections/SingleCountryRegion'
import SingleCountryPopulationChart from '../sections/SingleCountryPopulationChart'

import singleCountryMocks from '../../../__mock__/data/singleCountryMocks'

jest.mock('../../header/Header')
jest.mock('../../sources/Sources', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../../sources/Source')
jest.mock('../BreadCrumb')
jest.mock('../sections/SingleCountryHeader', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../sections/SingleCountryStatus', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../sections/SingleCountryFlags')
jest.mock('../sections/SingleCountryBasicStats')
jest.mock('../sections/SingleCountryWeather2')
jest.mock('../sections/SingleCountryMap')
jest.mock('../sections/SingleCountryRegion')
jest.mock('../sections/SingleCountryPopulationChart')

describe('components/single/SingleCountry', () => {
  test('It renders', () => {
    render(
      <SingleCountry
        countryCode={'DZA'}
        singleEndpoint={'singleEndpoint'}
        singleCountry={singleCountryMocks[0]}
        neighboursEndpoint='neighboursEndpoint'
        neighbours='neighbours'
        coordinatesData='coordinatesData'
      />,
    )
    expect(Header).toHaveBeenCalled()
    expect(BreadCrumb).toHaveBeenCalledWith(
      expect.objectContaining({ countryName: 'Algeria' }),
      expect.anything(),
    )
    expect(screen.getByRole('article')).toBeInTheDocument()
    expect(SingleCountryHeader).toHaveBeenCalledWith(
      expect.objectContaining({ countryName: 'Algeria' }),
      expect.anything(),
    )
    expect(SingleCountryStatus).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: false,
        error: false,
        countryCode: 'DZA',
      }),
      expect.anything(),
    )
    expect(Sources).toHaveBeenCalled()
    expect(Source).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'restcountries.com/{code}',
        endpoint: 'singleEndpoint',
        error: undefined,
        loading: false,
      }),
      expect.anything(),
    )
    expect(SingleCountryFlags).toHaveBeenCalledWith(
      expect.objectContaining({
        countryName: 'Algeria',
        flag: expect.stringContaining('.svg'),
        coatOfArms: expect.stringContaining('.svg'),
      }),
      expect.anything(),
    )
    expect(SingleCountryBasisStats).toHaveBeenCalledWith(
      expect.objectContaining({
        population: 44700000,
        area: 2381741,
      }),
      expect.anything(),
    )
    expect(SingleCountryWeather2).toHaveBeenCalledWith(
      expect.objectContaining({
        cca2: 'DZ',
        capitalName: 'Algiers',
      }),
      expect.anything(),
    )
    expect(SingleCountryMap).toHaveBeenCalledWith(
      expect.objectContaining({
        coordinatesData: 'coordinatesData',
      }),
      expect.anything(),
    )
    expect(SingleCountryRegion).toHaveBeenCalledWith(
      expect.objectContaining({
        singleCountry: expect.anything(),
        neighboursEndpoint: 'neighboursEndpoint',
        neighbours: 'neighbours',
      }),
      expect.anything(),
    )
    expect(SingleCountryPopulationChart).toHaveBeenCalledWith(
      expect.objectContaining({ countryCode: 'DZA' }),
      expect.anything(),
    )
  })
})
