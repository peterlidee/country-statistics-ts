import { render } from '@testing-library/react'

import SingleCountryMap from '../SingleCountryMap'
import MapWidget from '../../map/MapWidget'
import { singleCountryMock } from '../../../../__mock__/data/singleCountryMock'
import { coordinatesDataMock } from '../../../../__mock__/data/coordinatesDataMock'

jest.mock('../../map/MapWidget')

describe('components/single/sections/SingleCountryMap', () => {
  test('It renders', () => {
    render(
      <SingleCountryMap
        singleCountry={singleCountryMock[0]}
        coordinatesData={coordinatesDataMock}
      />,
    )
    // MapWidget is wrapped with react.memo
    // the actual widget is available on type
    expect(MapWidget.type).toHaveBeenCalled()
    expect(MapWidget.type).toHaveBeenCalledWith(
      expect.objectContaining({
        singleCountry: expect.anything(),
        coordinatesData: expect.anything(),
      }),
      expect.anything(),
    )
  })
})
