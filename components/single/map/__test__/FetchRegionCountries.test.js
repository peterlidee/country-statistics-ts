import { screen, render } from '@testing-library/react'

import FetchRegionCountries from '../FetchRegionCountries'
import useFetch from 'react-fetch-hook'

jest.mock('react-fetch-hook')
const ChildMock = jest.fn()

describe('components/single/map/FetchRegionCountries', () => {

  test('It renders', () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: undefined,
      data: 'data'
    })
    render(
      <FetchRegionCountries 
        type="Region" 
        label="Africa">
          {(props) => <ChildMock {...props} />}
      </FetchRegionCountries>
    )
    expect(ChildMock).toHaveBeenCalledWith(
      expect.objectContaining({
        isLoading: false,
        error: undefined,
        data: 'data',
        endpoint: 'https://restcountries.com/v3.1/Region/Africa?fields=latlng'
      }),
      expect.anything()
    )
  })
  
})