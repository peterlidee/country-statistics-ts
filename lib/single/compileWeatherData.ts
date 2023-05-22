import { weatherCodes } from '@/components/single/weather/weatherCodes'

type WeatherCode = keyof typeof weatherCodes
type WeatherString = (typeof weatherCodes)[WeatherCode]

type Forecast = {
  capitalName: string
  description: string
  dayNight: 'day' | 'night'
  weather: WeatherString
  tempMin: number | '__'
  tempMax: number | '__'
  windDeg: number
  windSpeed: number | '__'
}

export default function compileWeatherData(data: unknown, countryCode: string) {
  // construct a default forecast
  const forecast: Forecast = {
    capitalName: countryCode,
    description: '',
    dayNight: 'day',
    weather: 'nodata',
    tempMin: '__',
    tempMax: '__',
    windDeg: 90,
    windSpeed: '__',
  }
  // first check if data is object
  const isObject = typeof data === 'object' && data !== null
  if (isObject && 'cod' in data) {
    // check if there was a valid result
    // invalid -> {"cod":"404","message":"city not found"}
    if (data.cod === '404' && 'message' in data) {
      forecast.description = data.message as string
    } else {
      // valid response
      // fill in the data
      if ('name' in data) forecast.capitalName = data.name as string
      if (
        'weather' in data &&
        data.weather !== null &&
        typeof data.weather === 'object'
      ) {
        const weatherObj = data.weather
        if ('description' in weatherObj) {
          forecast.description = weatherObj.description as string
        }
        if ('icon' in weatherObj) {
          const icon = weatherObj.icon as string
          forecast.dayNight = icon[2] == 'd' ? 'day' : 'night'
          const code = icon.slice(0, 2) as WeatherCode
          forecast.weather = weatherCodes[code]
        }
      }
      // get the temps
      if (
        'main' in data &&
        data.main !== null &&
        typeof data.main === 'object'
      ) {
        const temp = data.main
        if ('temp_min' in temp) forecast.tempMin = temp.temp_min as number
        if ('temp_max' in temp) forecast.tempMax = temp.temp_max as number
      }
      // get the wind
      if (
        'wind' in data &&
        data.wind !== null &&
        typeof data.wind === 'object'
      ) {
        const wind = data.wind
        if ('speed' in wind) forecast.windSpeed = wind.speed as number
        if ('deg' in wind) forecast.windDeg = wind.deg as number
      }
    }
  }
  return forecast
}
