import { screen, render } from '@testing-library/react'

import singleCountryMocks from '../../../../__mock__/data/singleCountryMocks'
import SingleCountryMap from '../SingleCountryMap'
import BoxWrapper from '../../../general/BoxWrapper'
import FetchRegionCountries from '../../map/FetchRegionCountries'
import MapWidget from '../../map/MapWidget'
import Placeholder from '../../../svgSnippets/Placeholder'

jest.mock('../../../general/BoxWrapper', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../../../svgSnippets/Placeholder')
jest.mock('../../map/FetchRegionCountries', () => {
  return jest.fn((props) => (
    <>
      {props.children({
        loading: false,
        error: undefined,
        data: 'data',
        endpoint: 'endpoint',
      })}
    </>
  ))
})
jest.mock('../../map/MapWidget')

describe('components/single/sections/SingleCountryMap', () => {
  test('It renders with no country', () => {
    render(<SingleCountryMap />)
    expect(BoxWrapper).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'map' }),
      expect.anything(),
    )
    expect(Placeholder).toHaveBeenCalled()
    expect(FetchRegionCountries).not.toHaveBeenCalled()
  })

  test('It renders with country but no subregion', () => {
    render(<SingleCountryMap singleCountry={singleCountryMocks[1]} />)
    expect(FetchRegionCountries).toHaveBeenCalledTimes(1)
    expect(FetchRegionCountries).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'region',
        label: 'Africa',
      }),
      expect.anything(),
    )
    // MapWidget is wrapped with react.memo
    // the actual widget is available on type
    expect(MapWidget.type).toHaveBeenCalledWith(
      expect.objectContaining({
        regionCountries: expect.objectContaining({
          data: 'data',
          endpoint: 'endpoint',
          error: undefined,
          loading: false,
        }),
      }),
      expect.anything(),
    )
  })

  test('It renders with country and subregion', () => {
    render(<SingleCountryMap singleCountry={singleCountryMocks[0]} />)
    expect(FetchRegionCountries).toHaveBeenCalledTimes(2)
    expect(FetchRegionCountries).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: 'region',
        label: 'Africa',
      }),
      expect.anything(),
    )
    expect(FetchRegionCountries).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: 'subregion',
        label: 'Northern Africa',
      }),
      expect.anything(),
    )
    // MapWidget is wrapped with react.memo
    // the actual widget is available on type
    expect(MapWidget.type).toHaveBeenCalledWith(
      expect.objectContaining({
        singleCountry: expect.objectContaining({
          cca3: 'DZA',
        }),
        regionCountries: expect.objectContaining({
          loading: false,
          error: undefined,
          data: 'data',
          endpoint: 'endpoint',
        }),
        subregionCountries: expect.objectContaining({
          loading: false,
          error: undefined,
          data: 'data',
          endpoint: 'endpoint',
        }),
      }),
      expect.anything(),
    )
  })
})
