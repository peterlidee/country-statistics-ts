import { screen, render } from '@testing-library/react'

import CountryListHeader from '../CountryListHeader'
import Wrapper from '../../general/Wrapper'
import IconSort from '../../svgSnippets/IconSort'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ query: {} }))
}))
jest.mock('../../general/Wrapper', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../../svgSnippets/IconSort')

function setup(sortBy, sortAsc){
  render(
    <CountryListHeader 
      field={{ 
        slug: 'country',
        label: 'label',
        sortAscDefault: true,
      }} 
      sortBy={sortBy}
      sortAsc={sortAsc}
    />
  )
  const linkEl = screen.getByRole('link')
  return {
    linkEl
  }
}

describe('components/countryList/CountryListHeader', () => {

  test('It renders', () => {
    const { linkEl } = setup('foobar', true)
    expect(Wrapper).toHaveBeenCalled()
    expect(linkEl).toHaveTextContent('label')
    expect(IconSort).toHaveBeenCalled()
  })

  test('It renders with sortBy empty and sort Asc true', () => {
    const { linkEl } = setup('foobar', true)
    expect(linkEl).toHaveAttribute('href', '/?sort=country')
    expect(IconSort).toHaveBeenCalledWith(
      expect.objectContaining({
        sortActive: false,
        sortAsc: true,
      }),
      expect.anything()
    )
  })

  test('It renders with sortBy empty and sort Asc false', () => {
    const { linkEl } = setup('foobar', false)
    expect(linkEl).toHaveAttribute('href', '/?sort=country')
    expect(IconSort).toHaveBeenCalledWith(
      expect.objectContaining({
        sortActive: false,
        sortAsc: false,
      }),
      expect.anything()
    )
  })

  test('It renders with sortBy country and sort Asc true', () => {
    const { linkEl } = setup('country', true)
    expect(linkEl).toHaveAttribute('href', '/?sort=-country')
    expect(IconSort).toHaveBeenCalledWith(
      expect.objectContaining({
        sortActive: true,
        sortAsc: true,
      }),
      expect.anything()
    )
  })

  test('It renders with sortBy country and sort Asc false', () => {
    setup('country', false)
    expect(IconSort).toHaveBeenCalledWith(
      expect.objectContaining({
        sortActive: true,
        sortAsc: false,
      }),
      expect.anything()
    )
  })

})