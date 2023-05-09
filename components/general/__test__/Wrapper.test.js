/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import { render } from '@testing-library/react'

import Wrapper from '../Wrapper'

const ChildMock = jest.fn()

describe('components/general/Wrapper', () => {

  test('It renders', () => {
    const { container } = render(<Wrapper base="base" modifier="modifier" />)
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  test('It prints the correct classes', () => {
    const { container } = render(<Wrapper base="base" modifier="modifier" />)
    expect(container.querySelector('div')).toHaveClass('base base--modifier')
  })

  test('It passes children correctly', () => {
    render(<Wrapper base="base" modifier="modifier"><ChildMock /></Wrapper>)
    expect(ChildMock).toHaveBeenCalled()
  })

})