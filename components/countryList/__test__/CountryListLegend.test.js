import { screen, render } from '@testing-library/react'

import CountryListLegend from '../CountryListLegend'
import Wrapper from '../../general/Wrapper'

jest.mock('../../general/Wrapper', () => {
  return jest.fn((props) => props.children)
})

describe('components/countrylist/CountryListLegend.js', () => {
  test('It renders', () => {
    render(
      <CountryListLegend
        field={{
          sortAscDefault: false,
          slug: 'field',
          legend: 'legend',
          label: 'label',
          displayToggle: false,
          sortType: 'text',
        }}
      />,
    )
    expect(Wrapper).toHaveBeenCalledWith(
      expect.objectContaining({
        base: 'country-list-legend',
        modifier: 'field',
      }),
      expect.anything(),
    )
    expect(screen.getByText('legend')).toBeInTheDocument()
  })
})
