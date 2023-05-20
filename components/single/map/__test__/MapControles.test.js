import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import singleCountryMocks from '../../../../__mock__/data/singleCountryMocks'

import MapControles from '../MapControles'
import MapCapitalButton from '../MapCapitalButton'
import MapRegionButton from '../MapRegionButton'
import IconPan from '../../../svgSnippets/IconPan'

jest.mock('../MapCapitalButton')
jest.mock('../MapRegionButton')
jest.mock('../../../svgSnippets/IconPan')

const regionCountries = {
  isLoading: false,
  error: undefined,
  data: [],
  endpoint: 'regionCountriesEndpoint',
}
const subregionCountries = {
  ...regionCountries,
  endpoint: 'subregionCountriesEndpoint',
}
const map = {}
const setCountryOnMap = jest.fn()

function setup(singleCountry) {
  render(
    <MapControles
      singleCountry={singleCountry}
      map={map}
      setCountryOnMap={setCountryOnMap}
      setGeoCodeLoading={() => {}}
      setGeoCodeError={() => {}}
      regionCountries={regionCountries}
      subregionCountries={subregionCountries}
    />,
  )
}

describe('components/single/map/MapControles', () => {
  test('It renders', () => {
    setup(singleCountryMocks[0])
    expect(screen.getByText(/pan to/i)).toBeInTheDocument()
    expect(MapCapitalButton).toHaveBeenCalled()
    expect(IconPan).toHaveBeenCalledWith(
      expect.objectContaining({ active: true }),
      expect.anything(),
    )
    expect(screen.getByRole('button', { name: /Algeria/i })).toBeInTheDocument()
    expect(MapRegionButton).toHaveBeenCalledTimes(2)
  })

  test('It calls MapCapitalButton mock correctly', () => {
    setup(singleCountryMocks[0])
    expect(MapCapitalButton).toHaveBeenCalled()
    expect(MapCapitalButton).toHaveBeenCalledWith(
      expect.objectContaining({
        singleCountry: expect.objectContaining({
          countryName: 'Algeria',
          capital: 'Algiers',
          subregion: 'Northern Africa',
        }),
        active: 'country',
      }),
      expect.anything(),
    )
  })

  test('It calls MapRegionButton mocks correctly', () => {
    setup(singleCountryMocks[0])
    expect(screen.getByRole('button', { name: 'Algeria' })).toBeInTheDocument()
    expect(MapRegionButton).toHaveBeenCalledTimes(2)
    expect(MapRegionButton).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: 'subregion',
        label: 'Northern Africa',
        active: 'country',
        countries: expect.objectContaining({
          isLoading: false,
          error: undefined,
          data: [],
          endpoint: 'subregionCountriesEndpoint',
        }),
      }),
      expect.anything(),
    )
    expect(MapRegionButton).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: 'region',
        label: 'Africa',
        active: 'country',
        countries: expect.objectContaining({
          isLoading: false,
          error: undefined,
          data: [],
          endpoint: 'regionCountriesEndpoint',
        }),
      }),
      expect.anything(),
    )
  })

  test('It does not call MapCapitalButton mock when singleCountry.capital is empty string', () => {
    setup(singleCountryMocks[2])
    expect(MapCapitalButton).not.toHaveBeenCalled()
  })

  test('It does not call MapRegionButton mock with type subregion when singleCountry.subregion is empty string', () => {
    setup(singleCountryMocks[1])
    expect(MapRegionButton).toHaveBeenCalledTimes(1)
    expect(MapRegionButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Africa',
      }),
      expect.anything(),
    )
  })

  test('It calls setActive and setCountryOnMap mocks when button is clicked', async () => {
    const user = userEvent.setup()
    setup(singleCountryMocks[0])
    const button = screen.getByRole('button', { name: /algeria/i })
    await user.click(button)
    expect(setCountryOnMap).toHaveBeenCalledWith({}, 'Algeria', '.dz')
  })
})
