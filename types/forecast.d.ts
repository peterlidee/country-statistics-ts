import { weatherCodes } from '@/components/single/weather/weatherCodes'

type WeatherCode = keyof typeof weatherCodes
type WeatherString = (typeof weatherCodes)[WeatherCode]

export type Forecast = {
  capitalName: string
  description: string
  dayNight: 'day' | 'night'
  weather: WeatherString
  tempMin: number | '__'
  tempMax: number | '__'
  windDeg: number
  windSpeed: number | '__'
}
