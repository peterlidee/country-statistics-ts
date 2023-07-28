import { render } from '@testing-library/react'

import SingleCountryWeather2 from '../SingleCountryWeather2'
import WeatherComponent from '../../weather/WeatherComponent'

jest.mock('../../weather/WeatherComponent')

describe('components/single/section/SingleCountryWeather2', () => {
  test('It renders', () => {
    render(<SingleCountryWeather2 cca2='aaa' capitalName='AAAaaa' />)
    expect(WeatherComponent).toHaveBeenCalled()
  })

  test('It returns empty div when capitalName is empty string', () => {
    const { container } = render(
      <SingleCountryWeather2 capitalName='' cca2='aaa' />,
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const div = container.querySelector('.single-country__weather')
    expect(div).toBeInTheDocument()
    expect(div).toHaveTextContent('')
    expect(WeatherComponent).not.toHaveBeenCalled()
  })

  test('It calls WeatherComponent mock with the correct props', () => {
    const { container } = render(
      <SingleCountryWeather2 cca2='aaa' capitalName='AAAaaa' />,
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const div = container.querySelector('.single-country__weather')
    expect(div).toBe(null)
    expect(WeatherComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        cca2: 'aaa',
        capitalName: 'AAAaaa',
      }),
      expect.anything(),
    )
  })
})
