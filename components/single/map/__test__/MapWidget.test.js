import { render } from '@testing-library/react'

import singleCountriesMock from '../../../../__mock__/data/singleCountryMocks'
import SingleCountryComponent from '../../SingleCountryComponent'
import MapControles from '../MapControles'
import Source from '../../../sources/Source'
import Placeholder from '../../../svgSnippets/Placeholder'
import MapWidget from '../MapWidget'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

jest.mock('../MapControles')
jest.mock('../../SingleCountryComponent')
SingleCountryComponent.mockImplementation((props) => (
  <>
    {props.children}
    {props.sources}
  </>
))
jest.mock('../../../sources/Source')
jest.mock('../../../svgSnippets/Placeholder')
jest.mock('@react-google-maps/api', () => {
  return {
    __esModule: true,
    GoogleMap: jest.fn(),
    useJsApiLoader: jest.fn(() => ({
      isLoaded: false,
      loadError: undefined,
    })),
  }
})

const coordinatesData = {
  region: {
    endpoint: 'regionurl',
    coordinates: [
      [1, 2],
      [3, 4],
    ],
  },
  subregion: {
    endpoint: 'subregionurl',
    coordinates: [
      [5, 6],
      [7, 8],
    ],
  },
}

describe('components/single/map/MapWidget', () => {
  test('It loads useJSApiLoader', () => {
    render(
      <MapWidget
        singleCountry={singleCountriesMock[0]}
        coordinatesData={coordinatesData}
      />,
    )
    expect(useJsApiLoader).toHaveBeenCalled()
  })
  test('It behaves correctly when isLoaded is false', () => {
    render(
      <MapWidget
        singleCountry={singleCountriesMock[0]}
        coordinatesData={coordinatesData}
      />,
    )
    expect(useJsApiLoader).toHaveBeenCalled()
    expect(Placeholder).toHaveBeenCalled()
    expect(GoogleMap).not.toHaveBeenCalled()
    expect(MapControles).not.toHaveBeenCalled()
    expect(Source).toHaveBeenCalledTimes(4)
  })
  test('It renders Sources correctly', () => {
    render(
      <MapWidget
        singleCountry={singleCountriesMock[0]}
        coordinatesData={coordinatesData}
      />,
    )
    expect(Source).toHaveBeenCalledTimes(4)
    expect(Source).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Google Maps API',
        loading: true,
        error: undefined,
        type: 'API',
      }),
      expect.anything(),
    )
    expect(Source).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Google GeoCode API',
        loading: true,
        error: undefined,
        type: 'API',
      }),
      expect.anything(),
    )
    expect(Source).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        endpoint: 'regionurl',
        loading: false,
        error: undefined,
        type: 'SSG',
      }),
      expect.anything(),
    )
    expect(Source).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        endpoint: 'subregionurl',
        loading: false,
        error: undefined,
        type: 'SSG',
      }),
      expect.anything(),
    )
  })

  test('It renders only 3 sources when coordinatesData does not have subregion coordinates', () => {
    render(
      <MapWidget
        singleCountry={singleCountriesMock[0]}
        coordinatesData={{
          ...coordinatesData,
          subregion: { coordinates: [], endpoint: 'subregionurl' },
        }}
      />,
    )
    expect(Source).toHaveBeenCalledTimes(3)
    expect(Source.mock.calls[0][0].label).toBe('Google Maps API')
    expect(Source.mock.calls[1][0].label).toBe('Google GeoCode API')
    expect(Source.mock.calls[2][0].label).toBe('restcountries.com/{region}')
  })

  test('It renders with isLoaded true and loadError', () => {
    useJsApiLoader.mockReturnValue({
      isLoaded: true,
      loadError: new Error('Foobar'),
    })
    render(
      <MapWidget
        singleCountry={singleCountriesMock[0]}
        coordinatesData={coordinatesData}
      />,
    )
    expect(SingleCountryComponent).toHaveBeenCalled()
    expect(Placeholder).toHaveBeenCalled()
    expect(GoogleMap).not.toHaveBeenCalled()
    expect(MapControles).not.toHaveBeenCalled()
  })

  test('It renders with isLoaded and no loadError', () => {
    useJsApiLoader.mockReturnValue({
      isLoaded: true,
      loadError: undefined,
    })
    render(
      <MapWidget
        singleCountry={singleCountriesMock[0]}
        coordinatesData={coordinatesData}
      />,
    )
    expect(SingleCountryComponent).toHaveBeenCalled()
    expect(Placeholder).not.toHaveBeenCalled()
    expect(GoogleMap).toHaveBeenCalled()
    // we mocked GoogleMap so the onLoad event don't work
    // hence MapControles will not be called
    expect(MapControles).not.toHaveBeenCalled()
    expect(Source).toHaveBeenCalledTimes(4)
  })
})
