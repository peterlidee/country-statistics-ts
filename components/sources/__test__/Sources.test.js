import { render } from '@testing-library/react'

import Sources from '../Sources'
const ChildMock = jest.fn()

describe('components/sources/Sources', () => {
  test('It renders', () => {
    render(<Sources><ChildMock /></Sources>)
    expect(ChildMock).toHaveBeenCalled()
  })
})