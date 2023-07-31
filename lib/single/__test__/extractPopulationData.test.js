import extractPopulationData from '../extractPopulationData'
import populationDataMock from '../../../__mock__/data/populationDataMock'

const expectedObject = {
  combinedTotal: [],
  femaleTotal: [],
  maleTotal: [],
  years: [],
}

describe('function lib/extractPopulationData', () => {
  test('It works with the data mock', () => {
    const chartData = extractPopulationData(populationDataMock[1])
    expect(chartData.years).toEqual([2016, 2017, 2018, 2019, 2020])
    expect(chartData.femaleTotal).toEqual([1000, 1010, 1020, 1030, 1040])
    expect(chartData.maleTotal).toEqual([1001, 1002, 1003, 1004, 1005])
    expect(chartData.combinedTotal).toEqual([2001, 2012, 2023, 2034, 2045])
  })

  describe('When given faulty data, it returns the default', () => {
    test('Empty object', () => {
      const chartData = extractPopulationData([{}])
      expect(chartData).toMatchObject(expectedObject)
    })
    test('Null', () => {
      const chartData = extractPopulationData([null])
      expect(chartData).toMatchObject(expectedObject)
    })
    test('indicator is no object', () => {
      const chartData = extractPopulationData([
        {
          indicator: 'foobar',
          date: 'date',
          value: 1,
        },
      ])
      expect(chartData).toMatchObject(expectedObject)
    })
    test('date is no string', () => {
      const chartData = extractPopulationData([
        {
          indicator: {
            id: 1,
          },
          date: false,
          value: 1,
        },
      ])
      expect(chartData).toMatchObject(expectedObject)
    })
    test('value is no number', () => {
      const chartData = extractPopulationData([
        {
          indicator: {
            id: 1,
          },
          date: 'date',
          value: 'foobar',
        },
      ])
      expect(chartData).toMatchObject(expectedObject)
    })
    test('id is no number', () => {
      const chartData = extractPopulationData([
        {
          indicator: {
            id: 'foobar',
          },
          date: 'date',
          value: 1,
        },
      ])
      expect(chartData).toMatchObject(expectedObject)
    })
  })
})
