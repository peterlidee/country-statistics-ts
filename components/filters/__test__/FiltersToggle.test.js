import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FiltersToggle from '../FiltersToggle'
import IconFilters from '../../svgSnippets/IconFilters'

jest.mock('../../svgSnippets/IconFilters')
const ChildMock = jest.fn()

describe('components/filters/FiltersToggle', () => {
  
  test('It renders', () => {
    render(<FiltersToggle><ChildMock /></FiltersToggle>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(IconFilters).toHaveBeenCalled()
    expect(ChildMock).toHaveBeenCalled()
  })

  test('It toggles', async () => {
    const { container } = render(<FiltersToggle><ChildMock /></FiltersToggle>)
    const User = userEvent.setup()

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const divEl = container.querySelector('div')
    const button = screen.getByRole('button')

    // first render
    expect(divEl).toHaveClass('filters--closed')
    expect(button).toHaveClass('filters__toggle-button')
    // one click
    await User.click(button)
    expect(divEl).toHaveClass('filters--open')
    expect(button).toHaveClass('filters__toggle-button--active')
    // some more clicks
    await User.click(button)
    await User.click(button)
    await User.click(button)
    expect(divEl).toHaveClass('filters--closed')
    expect(button).toHaveClass('filters__toggle-button')
  })

})