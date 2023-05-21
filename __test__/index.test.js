import { render } from '@testing-library/react'

import HomePage from "../pages"
import Home from '../components/Home'

jest.mock('../components/Home')

describe('page/index.js', () => {
  test('It renders because Home was called', () => {
    render(<HomePage />)
    expect(Home).toHaveBeenCalled()
  })
  test('Home mock is called with the correct props', () => {
    render(<HomePage countries={[1,2,3]} endpoint="url" filterData={{}} />)
    expect(Home).toHaveBeenCalledWith(
      expect.objectContaining({
      endpoint: 'url',
      countries: [1,2,3],
      filterData: expect.anything(),
    }), expect.anything())
  })
})