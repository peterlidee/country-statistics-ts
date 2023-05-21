import { screen, render } from '@testing-library/react'

import PopulationChartWidget from '../PopulationChartWidget'
import chartDataMock from '../../../../__mock__/data/chartDataMock'
import { Chart } from 'react-chartjs-2'

jest.mock('react-chartjs-2', () => {
  return({
    __esModule: true,
    Chart: jest.fn()
  })
})

describe('components/single/chart/PopulationChartWidget', () => {
  test('It renders', () => {
    render(<PopulationChartWidget {...chartDataMock} />)
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Population evolution 2016-2020')
    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'bar',
        // we check only one prop
        data: expect.objectContaining({
          labels: [2016,2017,2018,2019,2020]
        }),
        // we check only one prop
        options: expect.objectContaining({
          responsive: true
        }),
      }),
      expect.anything()
    )
  })
})