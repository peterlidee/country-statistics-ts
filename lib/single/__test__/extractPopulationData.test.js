import extractPopulationChartData from '../extractPopulationChartData'
import populationDataMock from '../../../__mock__/data/populationDataMock'

describe('function lib/extractPopulationChartData', () => {
  test('It works with the data mock', () => {
    const chartData = extractPopulationChartData(populationDataMock[1])
    expect(chartData.years).toEqual([2016,2017,2018,2019,2020])    
    expect(chartData.femaleTotal).toEqual([1000,1010,1020,1030,1040])
    expect(chartData.maleTotal).toEqual([1001,1002,1003,1004,1005])
    expect(chartData.combinedTotal).toEqual([2001,2012,2023,2034,2045])
  })
})