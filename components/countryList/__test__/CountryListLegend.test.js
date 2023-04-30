import { screen, render } from '@testing-library/react'

import CountryListLegend from '../CountryListLegend'
import Wrapper from '../../general/Wrapper'

jest.mock('../../general/Wrapper', () => {
  return jest.fn((props) => <>{props.children}</>)
})

describe('components/countrylist/CountryListLegend.js', () => {
  test('It renders', () => {
    render(<CountryListLegend field={{
      slug: 'field',
      legend: 'legend',
    }} />)
    expect(Wrapper).toHaveBeenCalled()
    expect(screen.getByText('legend')).toBeInTheDocument()
  })
})