/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import { render } from '@testing-library/react'

import ErrorComponent from '../ErrorComponent'
import Header from '../header/Header'
import Head from 'next/head'

jest.mock('../header/Header')
jest.mock('next/head')

/* 
TODO not quite sure how to test a Head component nested
inside another component. I tried below solution but that rendered the entire component inside html <head> tag and gave error:
Warning: validateDOMNesting(...): <div> cannot appear as a child of <head>.
(because I was putting the entire comp including divs inside <head>)

So, I reverted to an automatic mock of next/head and just test to see if the mock is called.
Assuming next tests it's own components sufficiently
*/

// not doing this anymore inside here

// eslint-disable-next-line jest/no-commented-out-tests
/* jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <>{children}</>
    },
  }
})

test("It should render the correct title tag via head mock", () => {
  render(<ErrorComponent />, { container: document.head })
  expect(document.title).toBe("404 Page not found")
})

*/

describe('components/ErrorComponent', () => {
  test('It renders', () => {
    const { container } = render(<ErrorComponent />)
    expect(Header).toHaveBeenCalled()
    expect(Head).toHaveBeenCalled()
    expect(container.querySelectorAll('div')).toHaveLength(3)
  })

  test('It gets the correct styles', () => {
    const { container } = render(<ErrorComponent />)
    expect(container.querySelectorAll('div')[0]).toHaveStyle('maxWidth: 1500px')
  })
})
