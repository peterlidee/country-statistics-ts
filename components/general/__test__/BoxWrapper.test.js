import { render } from '@testing-library/react'

import BoxWrapper from '../BoxWrapper'
const ChildMock = jest.fn()

describe('components/general/BoxWrapper', () => {

  test('It renders', () => {
    const { container } = render(<BoxWrapper name="test" />)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.single-country__test')).toBeInTheDocument()
  })

  test('It passes children correctly', () => {
    render(<BoxWrapper name="test"><ChildMock /></BoxWrapper>)
    expect(ChildMock).toHaveBeenCalled()
  })
  
})