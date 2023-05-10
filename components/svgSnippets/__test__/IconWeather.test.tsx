/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import { render } from '@testing-library/react'
import IconWeather from '../IconWeather'

describe('svgSnippets/IconWeather.js renders', () => {

  test('It renders', () => {
    const { container } = render(<IconWeather type="" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  test('It renders the correct element given prop "clear"', () => {
    const { container } = render(<IconWeather type="clear" />)
    expect(container.querySelector('.sun')).toBeInTheDocument()
  })

  test('It renders the correct element given prop "few"', () => {
    const { container } = render(<IconWeather type="few" />)
    expect(container.querySelector('.few')).toBeInTheDocument()
  })

  test('It renders the correct element given prop "scat"', () => {
    const { container } = render(<IconWeather type="scat" />)
    expect(container.querySelector('.scat')).toBeInTheDocument()
  })

  test('It renders the correct element given prop "broken"', () => {
    const { container } = render(<IconWeather type="broken" />)
    expect(container.querySelector('.cloud1')).toBeInTheDocument()
    expect(container.querySelector('.cloud2')).toBeInTheDocument()
  })

  test('It renders the correct element given prop "shower"', () => {
    const { container } = render(<IconWeather type="shower" />)
    expect(container.querySelector('.cloud1')).toBeInTheDocument()
    expect(container.querySelector('.cloud2')).toBeInTheDocument()
    expect(container.querySelector('.raindrops')).toBeInTheDocument()
  })

  test('It renders the correct element given prop "rain"', () => {
    const { container } = render(<IconWeather type="rain" />)
    expect(container.querySelector('.cloud1')).toBeInTheDocument()
    expect(container.querySelector('.cloud2')).toBeInTheDocument()
    expect(container.querySelector('.raindrops')).toBeInTheDocument()
  })

  test('It renders the correct element given prop "mist"', () => {
    const { container } = render(<IconWeather type="mist" />)
    expect(container.querySelector('.mist')).toBeInTheDocument()
  })

  test('It renders the correct element given prop "snow"', () => {
    const { container } = render(<IconWeather type="snow" />)
    expect(container.querySelector('.snow')).toBeInTheDocument()
  })

  test('It renders the correct element given prop "thunder"', () => {
    const { container } = render(<IconWeather type="thunder" />)
    expect(container.querySelector('.cloud1')).toBeInTheDocument()
    expect(container.querySelector('.cloud2')).toBeInTheDocument()
    expect(container.querySelector('.lightning')).toBeInTheDocument()
  })

})