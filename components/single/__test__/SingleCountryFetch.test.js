import { screen, render } from '@testing-library/react'

import SingleCountryFetch from '../SingleCountryFetch'
import useFetch from 'react-fetch-hook'
import Sources from '../../sources/Sources'
import Source from '../../sources/Source'

jest.mock('react-fetch-hook')
jest.mock('../../sources/Sources', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../../sources/Source')
const ChildMock = jest.fn()

function addReturnValueToMock(isLoading, error, data) {
  useFetch.mockReturnValue({
    isLoading,
    error,
    data,
  })
}

afterEach(() => {
  useFetch.mockReset()
  Source.mockReset()
})

describe('components/single/SingleCountryFetch', () => {
  test('It renders', () => {
    addReturnValueToMock(false, undefined, [])
    render(
      <SingleCountryFetch label='label' endpoint='endpoint'>
        {() => <ChildMock />}
      </SingleCountryFetch>,
    )
    expect(ChildMock).toHaveBeenCalled()
    expect(Sources).toHaveBeenCalled()
    expect(Source).toHaveBeenCalledWith(
      expect.objectContaining({
        error: undefined,
        loading: false,
        endpoint: 'endpoint',
        label: 'label',
      }),
      expect.anything(),
    )
  })

  test('It adds extra class', () => {
    addReturnValueToMock(false, undefined, [])
    const { container } = render(
      <SingleCountryFetch
        label='label'
        endpoint='endpoint'
        extraClass='extraClass'
      >
        {() => {}}
      </SingleCountryFetch>,
    )
    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('.single-country__extraClass'),
    ).toBeInTheDocument()
  })

  // we test this on Source because that element receives the extraError
  describe('It renders correct errors for type=population', () => {
    test('It renders correct error if data[0] has  message prop', () => {
      const data = [{ message: [{ value: 'foobar' }] }]
      addReturnValueToMock(false, undefined, data)
      Source.mockImplementation((props) => <>{props?.error?.message}</>)
      render(
        <SingleCountryFetch label='label' endpoint='endpoint' type='population'>
          {() => {}}
        </SingleCountryFetch>,
      )
      expect(screen.getByText(/foobar/i)).toBeInTheDocument()
    })

    test('It renders correct error if data[0] has props total = 0', () => {
      const data = [{ total: 0 }]
      addReturnValueToMock(false, undefined, data)
      Source.mockImplementation((props) => <>{props?.error?.message}</>)
      render(
        <SingleCountryFetch label='label' endpoint='endpoint' type='population'>
          {() => {}}
        </SingleCountryFetch>,
      )
      expect(screen.getByText(/no data for this country/i)).toBeInTheDocument()
    })

    test('It renders correct error if data is defined but no array', () => {
      const data = [{ total: 0 }]
      addReturnValueToMock(false, undefined, data)
      Source.mockImplementation((props) => <>{props?.error?.message}</>)
      render(
        <SingleCountryFetch label='label' endpoint='endpoint' type='population'>
          {() => {}}
        </SingleCountryFetch>,
      )
      expect(screen.getByText(/no data for this country/i)).toBeInTheDocument()
    })
  })
})
