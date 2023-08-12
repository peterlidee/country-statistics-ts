import { screen, render } from '@testing-library/react'

import MapCapitalButton from '../MapCapitalButton'
import IconPan from '../../../svgSnippets/IconPan'
import singleCountryMocks from '../../../../__mock__/data/singleCountryMocks'

jest.mock('../../../svgSnippets/IconPan')

describe('components/single/map/MapControles', () => {
  test('It renders', () => {
    render(
      <MapCapitalButton
        singleCountry={singleCountryMocks[0]}
        map={{}}
        active='country'
        setActive={() => {}}
        setGeoCodeLoading={() => {}}
        setGeoCodeError={() => {}}
      />,
    )
    expect(IconPan).toHaveBeenCalledWith(
      expect.objectContaining({
        active: false,
      }),
      expect.anything(),
    )
    expect(screen.getByRole('button', { name: 'Algiers' })).toBeInTheDocument()
  })
})
