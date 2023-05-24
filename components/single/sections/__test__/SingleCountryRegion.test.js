import { render } from '@testing-library/react'

import SingleCountryRegion from '../SingleCountryRegion'
import RenderLabelValue from '../../region/RenderLabelValue'
import NeighbouringCountries from '../../neighbours/NeighbouringCountries'

jest.mock('../../region/RenderLabelValue')
jest.mock('../../neighbours/NeighbouringCountries')

const data = [
  {
    region: 'Region',
    subregion: 'Subregion',
    capital: 'Capital',
  },
  {
    region: 'Region2',
    subregion: 'Subregion2',
    capital: 'Capital2',
  },
]

describe('components/single/sections/SingleCountryRegion', () => {
  test('It renders with data', () => {
    render(
      <SingleCountryRegion
        singleCountry={data[0]}
        neighbours={[]}
        neighboursEndpoint='neighbourEndpoint'
      />,
    )
    expect(RenderLabelValue.mock.calls).toHaveLength(3)
    expect(RenderLabelValue.mock.calls[0][0]).toMatchObject({
      value: 'Region',
      label: 'region',
    })
    expect(RenderLabelValue.mock.calls[1][0]).toMatchObject({
      value: 'Subregion',
      label: 'subregion',
    })
    expect(RenderLabelValue.mock.calls[2][0]).toMatchObject({
      value: 'Capital',
      label: 'capital',
    })
    expect(NeighbouringCountries).toHaveBeenCalledWith(
      expect.objectContaining({
        neighbours: [],
        neighboursEndpoint: 'neighbourEndpoint',
      }),
      expect.anything(),
    )
  })

  test('It rerenders correctly', () => {
    const { rerender } = render(
      <SingleCountryRegion
        singleCountry={data[0]}
        neighbours={[]}
        neighboursEndpoint='neighbourEndpoint'
      />,
    )
    expect(RenderLabelValue.mock.calls[0][0]).toMatchObject({ value: 'Region' })
    expect(RenderLabelValue.mock.calls[1][0]).toMatchObject({
      value: 'Subregion',
    })
    expect(RenderLabelValue.mock.calls[2][0]).toMatchObject({
      value: 'Capital',
    })

    rerender(
      <SingleCountryRegion
        neighbours={[]}
        neighboursEndpoint='neighbourEndpoint2'
        singleCountry={data[1]}
      />,
    )
    expect(RenderLabelValue.mock.calls[3][0]).toMatchObject({
      value: 'Region2',
    })
    expect(RenderLabelValue.mock.calls[4][0]).toMatchObject({
      value: 'Subregion2',
    })
    expect(RenderLabelValue.mock.calls[5][0]).toMatchObject({
      value: 'Capital2',
    })
    expect(NeighbouringCountries).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        neighboursEndpoint: 'neighbourEndpoint2',
      }),
      expect.anything(),
    )
  })
})
