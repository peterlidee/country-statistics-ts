import { screen, render } from '@testing-library/react'

import CountryListHeader from '../CountryListHeader'
import Wrapper from '../../general/Wrapper'
import IconSort from '../../svgSnippets/IconSort'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ query: {} })),
}))
jest.mock('../../general/Wrapper', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../../svgSnippets/IconSort')

function setup(sortBy, sortAsc) {
  render(
    <CountryListHeader
      field={{
        slug: 'country',
        label: 'Country',
        sortAscDefault: true,
        legend: 'legend',
        displayToggle: false,
        sortType: 'sortType',
      }}
      sortBy={sortBy}
      sortAsc={sortAsc}
    />,
  )
  const linkEl = screen.getByRole('link')
  return {
    linkEl,
  }
}

describe('components/countryList/CountryListHeader', () => {
  test('It renders', () => {
    const { linkEl } = setup('area', true)
    expect(Wrapper).toHaveBeenCalled()
    expect(linkEl).toHaveTextContent('Country')
    expect(linkEl).toHaveClass('link__sort--country')
    expect(IconSort).toHaveBeenCalled()
  })

  describe('It renders not active field country correctly', () => {
    test('It renders field country with sortBy area and sortAsc true', () => {
      const { linkEl } = setup('area', true)
      expect(linkEl).toHaveAttribute('href', '/?sort=-country')
      expect(IconSort).toHaveBeenCalledWith(
        expect.objectContaining({
          sortActive: false,
          sortAsc: true,
        }),
        expect.anything(),
      )
    })

    test('It renders field country with sortBy area and sort Asc false', () => {
      const { linkEl } = setup('area', false)
      expect(linkEl).toHaveAttribute('href', '/?sort=-country')
      expect(IconSort).toHaveBeenCalledWith(
        expect.objectContaining({
          sortActive: false,
          sortAsc: false,
        }),
        expect.anything(),
      )
    })
  })

  describe('It renders active field country correctly (active = sortBy === field.slug', () => {
    test('It renders field country with sortBy country and sortAsc true', () => {
      const { linkEl } = setup('country', true)
      expect(linkEl).toHaveAttribute('href', '/?sort=country')
      expect(IconSort).toHaveBeenCalledWith(
        expect.objectContaining({
          sortActive: true,
          sortAsc: true,
        }),
        expect.anything(),
      )
    })

    test('It renders field country with sortBy country and sortAsc false', () => {
      const { linkEl } = setup('country', false)
      expect(linkEl).toHaveAttribute('href', '/?sort=-country')
      expect(IconSort).toHaveBeenCalledWith(
        expect.objectContaining({
          sortActive: true,
          sortAsc: false,
        }),
        expect.anything(),
      )
    })
  })
})
