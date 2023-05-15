import { screen, render } from '@testing-library/react'
import SingleCountryStatus from '../SingleCountryStatus'

const ChildMock = jest.fn()

describe('components/single/sections/SingleCountryStatus', () => {

  test('It renders with error', () => {
    render(
      <SingleCountryStatus 
        loading={false} 
        error={new Error('An error')} 
        data={{}} 
        countryCode={'aaa'}>
        <ChildMock />
      </SingleCountryStatus>
    )
    expect(screen.getByText('No data found for aaa')).toBeInTheDocument()
    expect(ChildMock).toHaveBeenCalled()
  })

  test('It renders with no data and no error', () => {
    render(
      <SingleCountryStatus 
        loading={false} 
        error={undefined} 
        data={undefined} 
        countryCode={'aaa'}>
        <ChildMock />
      </SingleCountryStatus>
    )
    expect(screen.getByText('No data found for aaa')).toBeInTheDocument()
    expect(ChildMock).toHaveBeenCalled()
  })

  test('It renders with data and no error', () => {
    render(
      <SingleCountryStatus 
        loading={false} 
        error={undefined} 
        data="data" 
        countryCode={'aaa'}>
        <ChildMock />
      </SingleCountryStatus>
    )
    expect(screen.queryByText(/no data found for/i)).not.toBeInTheDocument()
    expect(ChildMock).toHaveBeenCalled()
  })

})