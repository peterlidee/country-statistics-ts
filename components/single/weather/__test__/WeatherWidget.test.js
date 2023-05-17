import { screen, render } from '@testing-library/react'

import weatherMock from '../../../../__mock__/data/weatherMock'
import WeatherWidget from '../WeatherWidget'
import IconWindDirection from '../../../svgSnippets/IconWindDirection'
import IconWeather from '../../../svgSnippets/IconWeather'

jest.mock('../../../svgSnippets/IconWindDirection')
jest.mock('../../../svgSnippets/IconWeather')

describe('components/single/weather/WeatherWidget', () => {

  test('It renders with data', () => {
    render(
      <WeatherWidget 
        loading={false} 
        error={false} 
        data={weatherMock} 
        countryCode="DZA" />
    )
    expect(screen.getByText(/weather in algiers/i)).toBeInTheDocument()
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument()
    expect(screen.getByText(/39/i)).toBeInTheDocument()
    expect(screen.getByText(/36/i)).toBeInTheDocument()
    expect(IconWeather).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'clear'
      }),
      expect.anything()
    )
    expect(IconWindDirection).toHaveBeenCalledWith(
      expect.objectContaining({
        deg: 360
      }),
      expect.anything()
    )
    expect(screen.getByText(/15/i)).toBeInTheDocument()
  })

  test('It renders with no data', () => {
    render(
      <WeatherWidget 
        loading={false} 
        error={false} 
        data={undefined} 
        countryCode="DZA" />
    )
    expect(screen.getByText(/weather in DZA/i)).toBeInTheDocument()
    expect(screen.getAllByText('__')).toHaveLength(3)
    expect(IconWeather).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'nodata'
      }),
      expect.anything()
    )
    expect(IconWindDirection).toHaveBeenCalledWith(
      expect.objectContaining({
        deg: 90
      }),
      expect.anything()
    )
  })

  test('It renders day correctly', () => {
    const weatherMockDay = { weather :[
      { icon: '01d' }
    ]}
    const { container } = render(
      <WeatherWidget 
        loading={false} 
        error={false} 
        data={weatherMockDay} 
        countryCode="DZA" />
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.day')).toBeInTheDocument()
  })

  test('It renders night correctly', () => {
    const weatherMockNight = { weather :[
      { icon: '01n' }
    ]}
    const { container } = render(
      <WeatherWidget 
        loading={false} 
        error={false} 
        data={weatherMockNight} 
        countryCode="DZA" />
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.night')).toBeInTheDocument()
  })

  test('It uses the correct code 01', () => {
    const weatherMockCode = { weather :[
      { icon: '01d' }
    ]}
    const { container } = render(
      <WeatherWidget 
        loading={false} 
        error={false} 
        data={weatherMockCode} 
        countryCode="DZA" />
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.clear')).toBeInTheDocument()
  })

  test('It uses the correct code 10', () => {
    const weatherMockCode = { weather :[
      { icon: '10d' }
    ]}
    const { container } = render(
      <WeatherWidget 
        loading={false} 
        error={false} 
        data={weatherMockCode} 
        countryCode="DZA" />
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.rain')).toBeInTheDocument()
  })

  test('It uses the correct no code', () => {
    const { container } = render(
      <WeatherWidget 
        loading={false} 
        error={false} 
        data={undefined} 
        countryCode="DZA" />
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.nodata')).toBeInTheDocument()
  })

})