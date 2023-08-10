/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import { render, screen } from '@testing-library/react'

import Wrapper from '../Wrapper'

const ChildMock = jest.fn()

describe('components/general/Wrapper', () => {
  test('It renders', () => {
    const { container } = render(<Wrapper base='base' modifier='modifier' />)
    expect(container.querySelector('.base--modifier')).toBeInTheDocument()
  })

  test('It prints the correct classes', () => {
    const { container } = render(<Wrapper base='base' modifier='modifier' />)
    expect(container.querySelector('div')).toHaveClass('base base--modifier')
  })

  test('The children are optional', () => {
    const { container } = render(<Wrapper base='base' modifier='modifier' />)
    const wrapperEl = container.querySelector('.base--modifier')
    expect(wrapperEl).toBeInTheDocument()
    expect(wrapperEl).toBeEmptyDOMElement()
  })

  describe('Children are nodes or elements, does not matter', () => {
    test('It passes element correctly', () => {
      render(
        <Wrapper base='base' modifier='modifier'>
          <ChildMock />
        </Wrapper>,
      )
      expect(ChildMock).toHaveBeenCalled()
    })
    test('It passes string correctly', () => {
      render(
        <Wrapper base='base' modifier='modifier'>
          foobar
        </Wrapper>,
      )
      expect(screen.getByText(/foobar/)).toBeInTheDocument()
    })
    test('It passes number correctly', () => {
      render(
        <Wrapper base='base' modifier='modifier'>
          123456
        </Wrapper>,
      )
      expect(screen.getByText('123456')).toBeInTheDocument()
    })
    test('It passes undefined correctly', () => {
      const { container } = render(<Wrapper base='base' modifier='modifier' />)
      const wrapperEl = container.querySelector('.base--modifier')
      expect(wrapperEl).toBeInTheDocument()
      expect(wrapperEl).toBeEmptyDOMElement()
    })
    test('It passes null correctly', () => {
      const { container } = render(
        <Wrapper base='base' modifier='modifier'>
          {null}
        </Wrapper>,
      )
      const wrapperEl = container.querySelector('.base--modifier')
      expect(wrapperEl).toBeInTheDocument()
      expect(wrapperEl).toBeEmptyDOMElement()
    })
  })
})
