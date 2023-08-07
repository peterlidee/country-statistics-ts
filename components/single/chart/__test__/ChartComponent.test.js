import { render } from '@testing-library/react'

import ChartComponent from '../ChartComponent'
import { useData } from '../../../../hooks/useData'
import compilePopulationData from '../../../../lib/single/compilePopulationData'
import Source from '../../../sources/Source'
import SingleCountryComponent from '../../SingleCountryComponent'
import PopulationChartWidget from '../PopulationChartWidget'

jest.mock('../../../../hooks/useData')
jest.mock('../../../../lib/single/compilePopulationData')
jest.mock('../../../sources/Source')
jest.mock('../../SingleCountryComponent')
jest.mock('../PopulationChartWidget')

useData.mockReturnValue({
  data: { data: 'foobar' },
  isLoading: false,
  error: undefined,
  isError: false,
})
compilePopulationData.mockReturnValue({
  populationData: {
    years: [2000, 2001, 2002],
    femaleTotal: [10, 20, 30],
    maleTotal: [11, 22, 33],
    combinedTotal: [55, 66, 77],
  },
  extraError: undefined,
})
SingleCountryComponent.mockImplementation((props) => (
  <>
    {props.children}
    {props.sources.map((source) => source)}
  </>
))

describe('components/single/chart/ChartComponent', () => {
  test('It renders', () => {
    render(<ChartComponent countryCode='AAA' />)
    expect(useData).toHaveBeenCalled()
    expect(compilePopulationData).toHaveBeenCalled()
    expect(Source).toHaveBeenCalled()
    expect(SingleCountryComponent).toHaveBeenCalled()
    expect(PopulationChartWidget).toHaveBeenCalled()
  })
  test('It calls useData mock with the correct props', () => {
    render(<ChartComponent countryCode='AAA' />)
    expect(useData).toHaveBeenCalledWith(
      'single-chart',
      'AAA',
      'https://api.worldbank.org/v2/country/aaa/indicator/SP.POP.TOTL.FE.IN;SP.POP.TOTL.MA.IN?format=json&source=2&date=2002:2021&per_page=100',
      expect.anything(),
    )
  })
  test('It calls compilePopulationData mock with the correct props', () => {
    render(<ChartComponent countryCode='AAA' />)
    expect(compilePopulationData).toHaveBeenCalledWith('foobar', false)
  })
  test('It calls Sources mock with the correct props', () => {
    render(<ChartComponent countryCode='AAA' />)
    expect(Source).toHaveBeenCalledWith(
      expect.objectContaining({
        error: undefined,
        loading: false,
        endpoint:
          'https://api.worldbank.org/v2/country/aaa/indicator/SP.POP.TOTL.FE.IN;SP.POP.TOTL.MA.IN?format=json&source=2&date=2002:2021&per_page=100',
        label: 'api.worldbank.org/{country}',

        type: 'CSR',
      }),
      expect.anything(),
    )
  })
  test('It calls SingleCountryComponent mock with the correct props', () => {
    render(<ChartComponent countryCode='AAA' />)
    expect(SingleCountryComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        extraClass: 'population-chart',
      }),
      expect.anything(),
    )
  })
  test('It calls PopulationChartWidget mock with the correct props', () => {
    render(<ChartComponent countryCode='AAA' />)
    expect(PopulationChartWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        years: [2000, 2001, 2002],
        femaleTotal: [10, 20, 30],
        maleTotal: [11, 22, 33],
        combinedTotal: [55, 66, 77],
      }),
      expect.anything(),
    )
  })
})
