import { render } from '@testing-library/react'

import Page from "../Page"
import Footer from "../Footer"

const ChildMock = jest.fn()
jest.mock('../Footer')

describe('components/Page', () => {

  test('It renders', () => {
    render(<Page><ChildMock /></Page>)
    expect(ChildMock).toHaveBeenCalled()
    expect(Footer).toHaveBeenCalled()
  })

})