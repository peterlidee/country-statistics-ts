import { render } from '@testing-library/react'

import Home from '../Home'
import Head from 'next/head'
import Header from '../header/Header'
import CountryList from '../countryList/CountryList'
import Sources from '../sources/Sources'
import Source from '../sources/Source'

jest.mock('next/head')
jest.mock('../header/Header')
jest.mock('../countryList/CountryList')
jest.mock('../sources/Sources', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../sources/Source')

describe('components/Home', () => {
  test('It renders', () => {
    render(<Home endpoint='endpoint' countries={[]} filterData={{}} />)

    expect(Head).toHaveBeenCalled()
    expect(Header).toHaveBeenCalledWith({ home: true }, expect.anything())
    expect(CountryList).toHaveBeenCalledWith(
      { countries: [], filterData: {} },
      expect.anything(),
    )
    expect(Sources).toHaveBeenCalled()
    expect(Source).toHaveBeenCalledWith(
      {
        error: undefined,
        loading: false,
        endpoint: 'endpoint',
        label: 'restcountries.com/{all}',
        type: 'SSG',
      },
      expect.anything(),
    )
  })
})
