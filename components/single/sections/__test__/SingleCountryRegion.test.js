import { screen, render } from '@testing-library/react'

import SingleCountryRegion from '../SingleCountryRegion'
import RenderLabelValue from '../../region/RenderLabelValue'
import ValidateNeighbouringCountries from '../../neighbours/ValidateNeighbouringCountries'

jest.mock('../../region/RenderLabelValue')
jest.mock('../../neighbours/ValidateNeighbouringCountries')

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
      <SingleCountryRegion loading={false} error={undefined} data={data[0]} />,
    )
    expect(RenderLabelValue.mock.calls).toHaveLength(3)
    expect(RenderLabelValue.mock.calls[0][0]).toMatchObject({
      loading: false,
      value: 'Region',
      label: 'region',
    })
    expect(RenderLabelValue.mock.calls[1][0]).toMatchObject({
      loading: false,
      value: 'Subregion',
      label: 'subregion',
    })
    expect(RenderLabelValue.mock.calls[2][0]).toMatchObject({
      loading: false,
      value: 'Capital',
      label: 'capital',
    })
    expect(ValidateNeighbouringCountries).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: false,
        error: undefined,
        data: data[0],
      }),
      expect.anything(),
    )
  })

  test('It renders with loading', () => {
    jest.resetAllMocks()
    render(<SingleCountryRegion loading={true} error={undefined} data={{}} />)
    expect(RenderLabelValue.mock.calls[0][0]).toMatchObject({
      loading: true,
      value: undefined,
    })
    expect(RenderLabelValue.mock.calls[1][0]).toMatchObject({
      loading: true,
      value: undefined,
    })
    expect(RenderLabelValue.mock.calls[2][0]).toMatchObject({
      loading: true,
      value: undefined,
    })
    expect(ValidateNeighbouringCountries).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: true,
        error: undefined,
        data: {},
      }),
      expect.anything(),
    )
  })

  test('It rerenders correctly', () => {
    const { rerender } = render(
      <SingleCountryRegion loading={false} error={undefined} data={data[0]} />,
    )
    expect(RenderLabelValue.mock.calls[0][0]).toMatchObject({ value: 'Region' })
    expect(RenderLabelValue.mock.calls[1][0]).toMatchObject({
      value: 'Subregion',
    })
    expect(RenderLabelValue.mock.calls[2][0]).toMatchObject({
      value: 'Capital',
    })

    rerender(
      <SingleCountryRegion loading={false} error={undefined} data={data[1]} />,
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
    expect(ValidateNeighbouringCountries).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        loading: false,
        error: undefined,
        data: data[1],
      }),
      expect.anything(),
    )
  })
})
