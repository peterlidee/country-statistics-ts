import { render } from '@testing-library/react'
import CustomErrorPage from '../pages/404'
import ErrorComponent from '../components/ErrorComponent'

jest.mock('../components/ErrorComponent')

describe('pages/404.js', () => {
  test('It renders because the mock was called', () => {
    render(<CustomErrorPage />)
    expect(ErrorComponent).toHaveBeenCalled()
  })
})
