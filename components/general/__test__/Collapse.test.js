import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Collapse from '../Collapse'
import Wrapper from '../Wrapper'

jest.mock('../Wrapper', () => {
  return jest.fn((props) => <>{props.children}</>)
})
const ChildMock = jest.fn()

const setupRender = () => {
  const { container } = render(
    <Collapse label="label" extraClass="extraClass">
      <ChildMock />
    </Collapse>
  )
  const button = screen.getByRole('button')
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const content = container.querySelector('.collapse__content')
  const label = screen.getByText(/label/i)
  return { button, label, content }
}

describe('components/general/Collapse', () => {

  test('It renders', () => {
    const { button, content } = setupRender()

    expect(Wrapper).toHaveBeenCalled()
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/label/i)
    expect(button).toHaveTextContent(/\+/)
    expect(content).toBeInTheDocument()
    expect(ChildMock).toHaveBeenCalled()
  })

  test('It passes extraClass to Wrapper', () => {
    setupRender()
    expect(Wrapper).toHaveBeenCalledWith(
      expect.objectContaining({
        modifier: 'extraClass'
      }),
      expect.anything()
    )
  })

  describe('Testing boldLabel', () => {

    test('It does not print a bold label when no boldLabel prop', () => {
      const { label } = setupRender()
      expect(label).not.toHaveStyle('fontWeight:700')
    })

    test('It has a bold label when boldLabel prop is true', () => {
      render(
        <Collapse label="label" boldLabel={true}>
          <ChildMock />
        </Collapse>
      )
      const label = screen.getByText(/label/i)
      expect(label).toHaveStyle("fontWeight:700")
    })
  
  })
    
  describe('It collapses', () => {

    test('It has the correct initial values', () => {
      const { button, content } = setupRender()

      expect(button).toHaveTextContent(/\+/)
      expect(content).toHaveStyle('display: none')
    })

    test('It toggles', async () => {
      const { button, content } = setupRender()
      const user = userEvent.setup()

      await user.click(button)
      expect(button).toHaveTextContent(/\-/)
      expect(content).toHaveStyle('display: block')
    })

    test('It toggles many times', async () => {
      const { button, content } = setupRender()
      const user = userEvent.setup()

      await user.click(button)
      await user.click(button)
      await user.click(button)
      expect(button).toHaveTextContent(/\-/)
      expect(content).toHaveStyle('display: block')
      await user.click(button)
      expect(button).toHaveTextContent(/\+/)
      expect(content).toHaveStyle('display: none')
    })

  })
})
