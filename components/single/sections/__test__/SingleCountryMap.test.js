import { render } from '@testing-library/react'

import SingleCountryMap from '../SingleCountryMap'
import MapWidget from '../../map/MapWidget'

jest.mock('../../map/MapWidget')

describe('components/single/sections/SingleCountryMap', () => {
  test('It renders', () => {
    render(
      <SingleCountryMap singleCountry={'country'} coordinatesData={'data'} />,
    )
    // MapWidget is wrapped with react.memo
    // the actual widget is available on type
    expect(MapWidget.type).toHaveBeenCalled()
    expect(MapWidget.type).toHaveBeenCalledWith(
      expect.objectContaining({
        singleCountry: 'country',
        coordinatesData: 'data',
      }),
      expect.anything(),
    )
  })
})
