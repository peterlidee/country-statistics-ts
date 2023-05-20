import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MapRegionButton from '../MapRegionButton'
import IconPan from '../../../svgSnippets/IconPan'
import { initialize } from '@googlemaps/jest-mocks'

jest.mock('../../../svgSnippets/IconPan')

beforeEach(() => {
  initialize()
})

const subregionCountries = {
  isLoading: false,
  error: undefined,
  data: [],
  endpoint: 'subregionCountriesEndpoint',
}

const subregionCountriesLoading = {
  isLoading: true,
  error: undefined,
  data: [],
  endpoint: 'subregionCountriesEndpoint',
}

const subregionCountriesNoData = {
  isLoading: false,
  error: undefined,
  data: undefined,
  endpoint: 'subregionCountriesEndpoint',
}

const subregionCountriesError = {
  isLoading: false,
  error: new Error('Foobar'),
  data: undefined,
  endpoint: 'subregionCountriesEndpoint',
}

function setup(type, label, map, setActive, countries) {
  render(
    <MapRegionButton
      type={type}
      label={label}
      map={map}
      active='country'
      setActive={setActive}
      countries={countries}
    />,
  )
}
function setupForClick(type, label, map, setActive, countries) {
  const setActiveMock = jest.fn()
  const mapMock = {
    setCenter: jest.fn(),
    setZoom: jest.fn(),
    fitBounds: jest.fn(),
    panToBounds: jest.fn(),
  }
  setup(type, label, mapMock, setActiveMock, countries)
  return { mapMock, setActiveMock }
}

describe('components/single/map/MapControles', () => {
  describe('It renders', () => {
    test('It renders null with no label', () => {
      setup('subregion', '', {}, () => {}, subregionCountries)
      expect(IconPan).not.toHaveBeenCalled()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
    test('It renders null with a country error', () => {
      setup('subregion', 'label', {}, () => {}, subregionCountriesError)
      expect(IconPan).not.toHaveBeenCalled()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
    test('It renders null with !loading and no countries.data', () => {
      setup('subregion', 'label', {}, () => {}, subregionCountriesNoData)
      expect(IconPan).not.toHaveBeenCalled()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
    test('It renders', () => {
      setup('subregion', 'label', {}, () => {}, subregionCountries)
      expect(IconPan).toHaveBeenCalledWith(
        expect.objectContaining({ active: false }),
        expect.anything(),
      )
      expect(screen.getByRole('button', { name: 'label' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'label' })).toBeEnabled()
    })
    test('It renders with loading', () => {
      setup('subregion', 'label', {}, () => {}, subregionCountriesLoading)
      expect(screen.getByRole('button', { name: 'label' })).toBeDisabled()
    })
  })

  describe('Testing button press', () => {
    test('It calls mapMock and setActiveMock correctly on click', async () => {
      const user = userEvent.setup()
      const { mapMock, setActiveMock } = setupForClick(
        'subregion',
        'label',
        false,
        false,
        subregionCountries,
      )
      const button = screen.getByRole('button', { name: /label/i })
      await user.click(button)
      expect(setActiveMock).toHaveBeenCalledWith('subregion')
      expect(mapMock.fitBounds).toHaveBeenCalled()
      expect(mapMock.panToBounds).toHaveBeenCalled()
    })
  })
  test('It correctly calls the exception Antarctic', async () => {
    const user = userEvent.setup()
    const { mapMock, setActiveMock } = setupForClick(
      'region',
      'Antarctic',
      false,
      false,
      subregionCountries,
    )
    const button = screen.getByRole('button', { name: /Antarctic/i })
    await user.click(button)
    expect(setActiveMock).toHaveBeenCalledWith('region')
    expect(mapMock.setCenter).toHaveBeenCalled()
    expect(mapMock.setZoom).toHaveBeenCalledWith(2)
  })
})
