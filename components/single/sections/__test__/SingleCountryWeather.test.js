import { render, screen } from '@testing-library/react'

import SingleCountryWeather from '../SingleCountryWeather'
import Placeholder from '../../../svgSnippets/Placeholder'
import BoxWrapper from '../../../general/BoxWrapper'
import SingleCountryFetch from '../../SingleCountryFetch'
import WeatherWidget from '../../weather/WeatherWidget'

jest.mock('../../../svgSnippets/Placeholder')
jest.mock('../../../general/BoxWrapper', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../../SingleCountryFetch', () => {
  return jest.fn((props) => <>{props.children(false, undefined, [1, 2, 3])}</>)
})
jest.mock('../../weather/WeatherWidget')

describe('components/single/sections/SingleCountryWeather', () => {
  test('It renders with loading and no capitalName', () => {
    render(
      <SingleCountryWeather
        loading={false}
        error={new Error('Error')}
        cca2={undefined}
        capitalName={null}
        countryCode={'DZA'}
      />,
    )
    expect(BoxWrapper).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'placeholder',
        children: expect.anything(),
      }),
      expect.anything(),
    )
    expect(Placeholder).toHaveBeenCalled()
  })

  test('It renders with error', () => {
    render(
      <SingleCountryWeather
        loading={true}
        error={Error('foobar')}
        cca2={undefined}
        capitalName={null}
        countryCode={'DZA'}
      />,
    )
    expect(BoxWrapper).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'placeholder',
        children: expect.anything(),
      }),
      expect.anything(),
    )
    expect(Placeholder).toHaveBeenCalled()
  })

  test('It renders with !loading, !error and !capitalName', () => {
    const { container } = render(
      <SingleCountryWeather
        loading={false}
        error={false}
        cca2={'DZ'}
        capitalName={''}
        countryCode={'DZA'}
      />,
    )
    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('.single-country__weather'),
    ).toBeInTheDocument()
  })

  test('It renders with !loading, !error and capitalName', () => {
    render(
      <SingleCountryWeather
        loading={false}
        error={false}
        cca2={'DZ'}
        capitalName='Algiers'
        countryCode={'DZA'}
      />,
    )
    expect(SingleCountryFetch).toHaveBeenCalled()
    expect(WeatherWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        countryCode: 'DZA',
        loading: false,
        error: undefined,
        data: [1, 2, 3],
      }),
      expect.anything(),
    )
  })
})
