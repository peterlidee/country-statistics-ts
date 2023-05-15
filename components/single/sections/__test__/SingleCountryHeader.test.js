import { screen, render } from '@testing-library/react'
import SingleCountryHeader from '../SingleCountryHeader'

const ChildMock = jest.fn()

describe('components/single/sections/SingleCountryHeader', () => {

  test('It renders', () => {
    render(
      <SingleCountryHeader countryName='Algeria'>
        <ChildMock />
      </SingleCountryHeader>
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Algeria')
    expect(ChildMock).toHaveBeenCalled()
  })

})