import { screen, render } from '@testing-library/react'
import SingleCountryStatus from '../SingleCountryStatus'
import { singleCountryMock } from '../../../../__mock__/data/singleCountryMock'

const ChildMock = jest.fn()

describe('components/single/sections/SingleCountryStatus', () => {
  test('It renders with error', () => {
    render(
      <SingleCountryStatus
        loading={false}
        isError={true}
        data={singleCountryMock[0]}
        countryCode={'aaa'}
      >
        <ChildMock />
      </SingleCountryStatus>,
    )
    expect(screen.getByText('No data found for aaa')).toBeInTheDocument()
    expect(ChildMock).toHaveBeenCalled()
  })

  test('It renders with no data and no error', () => {
    render(
      <SingleCountryStatus
        loading={false}
        isError={false}
        data={undefined}
        countryCode={'aaa'}
      >
        <ChildMock />
      </SingleCountryStatus>,
    )
    expect(screen.getByText('No data found for aaa')).toBeInTheDocument()
    expect(ChildMock).toHaveBeenCalled()
  })

  test('It renders with data and no error', () => {
    render(
      <SingleCountryStatus
        loading={false}
        isError={false}
        data={singleCountryMock[0]}
        countryCode={'aaa'}
      >
        <ChildMock />
      </SingleCountryStatus>,
    )
    expect(screen.queryByText(/no data found for/i)).not.toBeInTheDocument()
    expect(ChildMock).toHaveBeenCalled()
  })

  describe('It renders children', () => {
    test('It renders single child', () => {
      render(
        <SingleCountryStatus
          loading={false}
          isError={false}
          data={singleCountryMock[0]}
          countryCode={'aaa'}
        >
          <ChildMock />
        </SingleCountryStatus>,
      )
      expect(ChildMock).toHaveBeenCalledTimes(1)
    })
    test('It renders multiple children', () => {
      render(
        <SingleCountryStatus
          loading={false}
          isError={false}
          data={singleCountryMock[0]}
          countryCode={'aaa'}
        >
          <ChildMock />
          <ChildMock />
          <ChildMock />
        </SingleCountryStatus>,
      )
      expect(ChildMock).toHaveBeenCalledTimes(3)
    })
    test('It renders string', () => {
      render(
        <SingleCountryStatus
          loading={false}
          isError={false}
          data={singleCountryMock[0]}
          countryCode={'aaa'}
        >
          foobar
        </SingleCountryStatus>,
      )
      expect(screen.getByText(/foobar/)).toBeInTheDocument()
    })
  })
})
