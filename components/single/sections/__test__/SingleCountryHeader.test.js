import { screen, render } from '@testing-library/react'
import SingleCountryHeader from '../SingleCountryHeader'

const ChildMock = jest.fn()

describe('components/single/sections/SingleCountryHeader', () => {
  test('It renders', () => {
    render(
      <SingleCountryHeader countryName='Algeria'>
        <ChildMock />
      </SingleCountryHeader>,
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Algeria',
    )
    expect(ChildMock).toHaveBeenCalled()
  })

  describe('It renders children', () => {
    test('It renders a single element', () => {
      render(
        <SingleCountryHeader countryName='Algeria'>
          <ChildMock />
        </SingleCountryHeader>,
      )
      expect(ChildMock).toHaveBeenCalled()
    })
    test('It renders multiple elements', () => {
      render(
        <SingleCountryHeader countryName='Algeria'>
          <ChildMock />
          <ChildMock />
          <ChildMock />
        </SingleCountryHeader>,
      )
      expect(ChildMock).toHaveBeenCalledTimes(3)
    })
    test('It renders string', () => {
      render(
        <SingleCountryHeader countryName='Algeria'>foobar</SingleCountryHeader>,
      )
      expect(screen.getByText(/foobar/)).toBeInTheDocument()
    })
  })
})
