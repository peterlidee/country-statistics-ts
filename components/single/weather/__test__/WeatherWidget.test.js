import { screen, render } from '@testing-library/react'

import {
  validForecast,
  invalidForecast,
} from '../../../../__mock__/data/weatherMock'
import WeatherWidget from '../WeatherWidget'
import compileWeatherData from '../../../../lib/single/compileWeatherData'
import IconWindDirection from '../../../svgSnippets/IconWindDirection'
import IconWeather from '../../../svgSnippets/IconWeather'

jest.mock('../../../svgSnippets/IconWindDirection')
jest.mock('../../../svgSnippets/IconWeather')
jest.mock('../../../../lib/single/compileWeatherData')

describe('components/single/weather/WeatherWidget', () => {
  test('It renders all fixed text', () => {
    compileWeatherData.mockReturnValue(validForecast)
    render(<WeatherWidget data={{}} countryCode='ABC' />)
    expect(screen.getByText(/weather in/i)).toBeInTheDocument()
    expect(screen.getByText(/temp/i)).toBeInTheDocument()
    expect(screen.getByText(/°C/i)).toBeInTheDocument()
    expect(screen.getByText(/wind/i)).toBeInTheDocument()
    expect(screen.getByText(/km\/h/i)).toBeInTheDocument()
  })

  test('It renders the data', () => {
    compileWeatherData.mockReturnValue(validForecast)
    render(<WeatherWidget data={{}} countryCode='ABC' />)
    expect(compileWeatherData).toHaveBeenCalled()
    expect(screen.getByText(/brussels/i)).toBeInTheDocument()
    expect(screen.getByText(16)).toBeInTheDocument()
    expect(screen.getByText(22)).toBeInTheDocument()
    expect(screen.getByText(13)).toBeInTheDocument()
    expect(screen.getByText(/broken clouds/i)).toBeInTheDocument()
  })

  test('It renders the icons', () => {
    compileWeatherData.mockReturnValue(validForecast)
    render(<WeatherWidget data={{}} countryCode='ABC' />)
    expect(IconWeather).toHaveBeenCalledWith(
      { type: 'broken' },
      expect.anything(),
    )
    expect(IconWindDirection).toHaveBeenCalledWith(
      { deg: 300 },
      expect.anything(),
    )
  })

  test('It renders the correct classes', () => {
    compileWeatherData.mockReturnValue(validForecast)
    const { container } = render(<WeatherWidget data={{}} countryCode='ABC' />)

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.day')).toBeInTheDocument()
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.night')).not.toBeInTheDocument()
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.broken')).toBeInTheDocument()
  })

  test('It renders with invalid data', () => {
    compileWeatherData.mockReturnValue(invalidForecast)
    render(<WeatherWidget data={{}} countryCode='ABC' />)
    expect(screen.getByText(/ABC/i)).toBeInTheDocument()
    expect(screen.getByText(/city not found/i)).toBeInTheDocument()
    expect(screen.getAllByText('__')).toHaveLength(3)
    expect(IconWeather).toHaveBeenCalledWith(
      { type: 'nodata' },
      expect.anything(),
    )
    expect(IconWindDirection).toHaveBeenCalledWith(
      { deg: 90 },
      expect.anything(),
    )
  })
})
