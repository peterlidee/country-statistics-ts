import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MapRegionButton from '../MapRegionButton'
import IconPan from '../../../svgSnippets/IconPan'
import { initialize } from '@googlemaps/jest-mocks'

jest.mock('../../../svgSnippets/IconPan')

beforeEach(() => {
  initialize()
})

function setup(type, label, map, setActive) {
  render(
    <MapRegionButton
      type={type}
      label={label}
      map={map}
      active='country'
      setActive={setActive}
      coordinates={[[1, 2]]}
    />,
  )
}
function setupForClick(type, label) {
  const setActiveMock = jest.fn()
  const mapMock = {
    setCenter: jest.fn(),
    setZoom: jest.fn(),
    fitBounds: jest.fn(),
    panToBounds: jest.fn(),
  }
  setup(type, label, mapMock, setActiveMock)
  return { mapMock, setActiveMock }
}

describe('components/single/map/MapControles', () => {
  describe('It renders', () => {
    test('It renders null with no label', () => {
      setup('subregion', '', {}, () => {})
      expect(IconPan).not.toHaveBeenCalled()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
    test('It renders', () => {
      setup('subregion', 'label', {}, () => {})
      expect(IconPan).toHaveBeenCalledWith(
        expect.objectContaining({ active: false }),
        expect.anything(),
      )
      expect(screen.getByRole('button', { name: 'label' })).toBeInTheDocument()
    })
  })

  describe('Testing button press', () => {
    test('It calls mapMock and setActiveMock correctly on click', async () => {
      const user = userEvent.setup()
      const { mapMock, setActiveMock } = setupForClick('subregion', 'label')
      const button = screen.getByRole('button', { name: /label/i })
      await user.click(button)
      expect(setActiveMock).toHaveBeenCalledWith('subregion')
      expect(mapMock.fitBounds).toHaveBeenCalled()
      expect(mapMock.panToBounds).toHaveBeenCalled()
    })
  })
  test('It correctly calls the exception Antarctic', async () => {
    const user = userEvent.setup()
    const { mapMock, setActiveMock } = setupForClick('region', 'Antarctic')
    const button = screen.getByRole('button', { name: /Antarctic/i })
    await user.click(button)
    expect(setActiveMock).toHaveBeenCalledWith('region')
    expect(mapMock.setCenter).toHaveBeenCalled()
    expect(mapMock.setZoom).toHaveBeenCalledWith(2)
  })
})
