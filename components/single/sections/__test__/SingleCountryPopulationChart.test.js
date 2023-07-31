import { render } from '@testing-library/react'

import SingleCountryPopulationChart from '../SingleCountryPopulationChart'
import ChartComponent from '../../chart/ChartComponent'

jest.mock('../../chart/ChartComponent')

describe('components/single/sections/SingleCountryPopulationChart', () => {
  test('It renders', () => {
    render(<SingleCountryPopulationChart countryCode='AAA' />)
    expect(ChartComponent).toHaveBeenCalled()
    expect(ChartComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        countryCode: 'AAA',
      }),
      expect.anything(),
    )
  })
})
