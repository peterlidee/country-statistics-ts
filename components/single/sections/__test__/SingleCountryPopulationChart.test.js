import { render } from '@testing-library/react'

import SingleCountryPopulationChart from '../SingleCountryPopulationChart'
import SingleCountryFetch from '../../SingleCountryFetch'
import PopulationChartWidget from '../../chart/PopulationChartWidget'
import extractPopulationData from '../../../../lib/single/extractPopulationData'

jest.mock('../../chart/PopulationChartWidget')
jest.mock('../../SingleCountryFetch')
jest.mock('../../../../lib/single/extractPopulationData')

beforeEach(() => {
  jest.resetAllMocks()
})

function setup(isLoading, error, data) {
  SingleCountryFetch.mockImplementation((props) => (
    <>{props.children(isLoading, error, data)}</>
  ))
  render(<SingleCountryPopulationChart countryCode='DZA' />)
}

describe('components/single/sections/SingleCountryPopulationChart', () => {
  test('It renders empty with error', () => {
    setup(false, true, undefined)
    expect(SingleCountryFetch).toHaveBeenCalled()
    expect(PopulationChartWidget).toHaveBeenCalledTimes(1)
    expect(PopulationChartWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        years: [],
        femaleTotal: [],
        maleTotal: [],
        combinedTotal: [],
      }),
      expect.anything(),
    )
    expect(extractPopulationData).not.toHaveBeenCalled()
  })

  test('It renders empty with data !isArray', () => {
    setup(false, undefined, 'foobar')
    expect(SingleCountryFetch).toHaveBeenCalled()
    expect(PopulationChartWidget).toHaveBeenCalledTimes(1)
    expect(PopulationChartWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        years: [],
        femaleTotal: [],
        maleTotal: [],
        combinedTotal: [],
      }),
      expect.anything(),
    )
    expect(extractPopulationData).not.toHaveBeenCalled()
  })

  test('It renders empty with isLoading && !data', () => {
    setup(true, undefined, undefined)
    expect(SingleCountryFetch).toHaveBeenCalled()
    expect(PopulationChartWidget).toHaveBeenCalledTimes(1)
    expect(PopulationChartWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        years: [],
        femaleTotal: [],
        maleTotal: [],
        combinedTotal: [],
      }),
      expect.anything(),
    )
    expect(extractPopulationData).not.toHaveBeenCalled()
  })

  test('It renders empty with !data', () => {
    setup(false, undefined, undefined)
    expect(SingleCountryFetch).toHaveBeenCalled()
    expect(PopulationChartWidget).toHaveBeenCalledTimes(1)
    expect(PopulationChartWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        years: [],
        femaleTotal: [],
        maleTotal: [],
        combinedTotal: [],
      }),
      expect.anything(),
    )
    expect(extractPopulationData).not.toHaveBeenCalled()
  })

  test('It renders empty with data[0] has a message prop', () => {
    setup(false, undefined, [{ message: 'message' }])
    expect(SingleCountryFetch).toHaveBeenCalled()
    expect(PopulationChartWidget).toHaveBeenCalledTimes(1)
    expect(PopulationChartWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        years: [],
        femaleTotal: [],
        maleTotal: [],
        combinedTotal: [],
      }),
      expect.anything(),
    )
    expect(extractPopulationData).not.toHaveBeenCalled()
  })

  test('It renders empty with data[0] has a total === 0 prop', () => {
    setup(false, undefined, [{ total: 0 }])
    expect(SingleCountryFetch).toHaveBeenCalled()
    expect(PopulationChartWidget).toHaveBeenCalledTimes(1)
    expect(PopulationChartWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        years: [],
        femaleTotal: [],
        maleTotal: [],
        combinedTotal: [],
      }),
      expect.anything(),
    )
    expect(extractPopulationData).not.toHaveBeenCalled()
  })

  test('It renders with data when isLoading && data', () => {
    extractPopulationData.mockReturnValue({
      years: 1,
      femaleTotal: 2,
      maleTotal: 3,
      combinedTotal: 4,
    })
    setup(true, undefined, [])
    expect(SingleCountryFetch).toHaveBeenCalled()
    expect(extractPopulationData).toHaveBeenCalled()
    expect(PopulationChartWidget).toHaveBeenCalledTimes(1)
    expect(PopulationChartWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        years: 1,
        femaleTotal: 2,
        maleTotal: 3,
        combinedTotal: 4,
      }),
      expect.anything(),
    )
  })

  test('It renders with data when !isLoading !error && data', () => {
    extractPopulationData.mockReturnValue({
      years: 1,
      femaleTotal: 2,
      maleTotal: 3,
      combinedTotal: 4,
    })
    setup(false, undefined, [])
    expect(SingleCountryFetch).toHaveBeenCalled()
    expect(extractPopulationData).toHaveBeenCalled()
    expect(PopulationChartWidget).toHaveBeenCalledTimes(1)
    expect(PopulationChartWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        years: 1,
        femaleTotal: 2,
        maleTotal: 3,
        combinedTotal: 4,
      }),
      expect.anything(),
    )
  })
})
