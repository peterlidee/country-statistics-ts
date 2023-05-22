import { weatherMocks } from '../../../__mock__/data/weatherMock'
import compileWeatherData from '../compileWeatherData'

describe('function compileWeatherData', () => {
  test('It returns the default when data is not an object', () => {
    const result = compileWeatherData('foobar', 'abc')
    expect(result).toEqual(
      expect.objectContaining({
        capitalName: 'abc',
        description: '',
        dayNight: 'day',
        weather: 'nodata',
        tempMin: '__',
        tempMax: '__',
        windDeg: 90,
        windSpeed: '__',
      }),
    )
  })
  test('It returns the default when data does not have cod prop', () => {
    const result = compileWeatherData({ name: 'foobar' }, 'abc')
    expect(result).toEqual(
      expect.objectContaining({
        capitalName: 'abc',
        description: '',
        dayNight: 'day',
        weather: 'nodata',
        tempMin: '__',
        tempMax: '__',
        windDeg: 90,
        windSpeed: '__',
      }),
    )
  })
  test('It returns error when given error data', () => {
    const result = compileWeatherData(
      { cod: '404', message: 'city not found' },
      'abc',
    )
    expect(result).toEqual(
      expect.objectContaining({
        capitalName: 'abc',
        description: 'city not found',
        dayNight: 'day',
        weather: 'nodata',
        tempMin: '__',
        tempMax: '__',
        windDeg: 90,
        windSpeed: '__',
      }),
    )
  })

  test('It returns countryCode when no data.name', () => {
    expect(compileWeatherData({ cod: '01' }, 'abc').capitalName).toBe('abc')
  })
  test('It returns name when data.name', () => {
    expect(
      compileWeatherData({ cod: '01', name: 'foobar' }, 'abc').capitalName,
    ).toBe('foobar')
  })
  test('It returns description when data.weather[0].description', () => {
    const result = compileWeatherData(
      { cod: '01', weather: [{ description: 'description' }] },
      'abc',
    )
    expect(result.description).toBe('description')
  })
  test('It returns correct dayNight and weather when data.weather[0].icon', () => {
    const result = compileWeatherData(
      { cod: '01', weather: [{ icon: '50n' }] },
      'abc',
    )
    expect(result.dayNight).toBe('night')
    expect(result.weather).toBe('mist')
  })
  test('It returns correct wind deg and speed when data.wind', () => {
    const result = compileWeatherData(
      { cod: '01', wind: { deg: 10, speed: 20 } },
      'abc',
    )
    expect(result.windDeg).toBe(10)
    expect(result.windSpeed).toBe(72)
  })
  test('It correctly rounds and multiplies speed by 3.6', () => {
    const result = compileWeatherData(
      { cod: '01', wind: { speed: 10.4 } },
      'abc',
    )
    expect(result.windSpeed).toBe(37)
  })
  test('It returns correct temp min and max when data.main', () => {
    const result = compileWeatherData(
      { cod: '01', main: { temp_min: 15, temp_max: 25 } },
      'abc',
    )
    expect(result.tempMin).toBe(15)
    expect(result.tempMax).toBe(25)
  })
  test('It returns correct rounded temp numbers', () => {
    const result = compileWeatherData(
      { cod: '01', main: { temp_min: 14.4, temp_max: 24.8 } },
      'abc',
    )
    expect(result.tempMin).toBe(15)
    expect(result.tempMax).toBe(25)
  })

  describe('It works on real data', () => {
    test('It correctly compiles valid data', () => {
      const result = compileWeatherData(weatherMocks[0], 'abc')
      expect(result).toEqual(
        expect.objectContaining({
          capitalName: 'Brussels',
          description: 'broken clouds',
          dayNight: 'day',
          weather: 'broken',
          tempMin: 16,
          tempMax: 22,
          windDeg: 300,
          windSpeed: 13,
        }),
      )
    })
    test('It correctly compiles invalid data', () => {
      const result = compileWeatherData(weatherMocks[1], 'abc')
      expect(result).toEqual(
        expect.objectContaining({
          capitalName: 'abc',
          description: 'city not found',
          dayNight: 'day',
          weather: 'nodata',
          tempMin: '__',
          tempMax: '__',
          windDeg: 90,
          windSpeed: '__',
        }),
      )
    })
  })
})
