import { render, screen } from '@testing-library/react'
import SingleCountryBox from '../SingleCountryBox'

const ChildMock = jest.fn()

describe('components/general/SingleCountryBox', () => {
  test('It renders', () => {
    const { container } = render(
      <SingleCountryBox>
        <ChildMock />
      </SingleCountryBox>,
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const divEl = container.querySelector('div')
    expect(divEl).toBeInTheDocument()
    expect(divEl).toHaveClass('single-country__box')
    expect(ChildMock).toHaveBeenCalled()
  })
  test('It works with multiple children', () => {
    render(
      <SingleCountryBox>
        <ChildMock />
        <ChildMock />
        <ChildMock />
      </SingleCountryBox>,
    )
    expect(ChildMock).toHaveBeenCalledTimes(3)
  })
  test('It works with nodes', () => {
    render(<SingleCountryBox>foobar</SingleCountryBox>)
    expect(screen.getByText(/foobar/)).toBeInTheDocument()
  })
})
