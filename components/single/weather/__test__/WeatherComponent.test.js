import { render } from '@testing-library/react'

import WeatherComponent from '../WeatherComponent'
import SingleCountryComponent from '../../SingleCountryComponent'
import { useData } from '../../../../hooks/useData'
import Source from '../../../sources/Source'
import WeatherWidget from '../WeatherWidget'

jest.mock('../../../../hooks/useData')
jest.mock('../../SingleCountryComponent')
SingleCountryComponent.mockImplementation((props) => {
  return (
    <>
      {props.children}
      {props.sources.map((source) => source)}
    </>
  )
})
jest.mock('../../../sources/Source')
jest.mock('../WeatherWidget')

function setup(
  cca2 = 'aaa',
  capitalName = 'BBBbbb',
  data = { data: 'ccc' },
  error = undefined,
  isLoading = false,
) {
  useData.mockReturnValue({
    data,
    error,
    isLoading,
  })
  render(<WeatherComponent cca2={cca2} capitalName={capitalName} />)
}

describe('components/single/weather/WeatherComponent', () => {
  test('It renders', () => {
    setup()
    expect(useData).toHaveBeenCalled()
    expect(SingleCountryComponent).toHaveBeenCalled()
    expect(Source).toHaveBeenCalled()
    expect(WeatherWidget).toHaveBeenCalled()
  })

  test('useData mock gets called with the correct props', () => {
    setup()
    expect(useData).toHaveBeenCalledWith(
      'single-weather',
      'aaa',
      'https://api.openweathermap.org/data/2.5/weather?q=BBBbbb,aaa&APPID=undefined&units=metric',
    )
  })

  test('SingleCountryComponent mock gets called with the correct props', () => {
    setup()
    expect(SingleCountryComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        extraClass: 'weather',
        sources: [expect.anything()],
      }),
      expect.anything(),
    )
  })

  test('Source gets called with the correct props', () => {
    setup()
    expect(Source).toHaveBeenCalledWith(
      expect.objectContaining({
        error: undefined,
        loading: false,
        endpoint:
          'https://api.openweathermap.org/data/2.5/weather?q=BBBbbb,aaa&APPID=undefined&units=metric',
        type: 'CSR',
      }),
      expect.anything(),
    )
  })

  test('WeatherWidget get called with the correct props', () => {
    setup()
    expect(WeatherWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        data: 'ccc',
        code: 'aaa',
      }),
      expect.anything(),
    )
  })
})
