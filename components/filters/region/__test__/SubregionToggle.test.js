import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SubregionToggle from '../../region/SubregionToggle'
import FilterRow from '../../region/FilterRow'

jest.mock('../../region/FilterRow', () => {
  return jest.fn((props) => <>{props.children}</>)
})
const ChildMock = jest.fn()

describe('components/filters/region/SubregionToggle', () => {

  test('It renders without children', () => {
    render(
      <SubregionToggle
        filterCheckbox="FilterCheckbox"
        filterCheckboxCount="FilterCheckboxCount" />
    )
    expect(FilterRow).toHaveBeenCalledWith(
      expect.objectContaining({
        filterCheckbox: "FilterCheckbox",
        filterCheckboxCount: "FilterCheckboxCount",
      }),
      expect.anything()
    )
    expect(screen.queryByRole('button', { name: /subregions/i })).not.toBeInTheDocument()
    expect(ChildMock).not.toHaveBeenCalled()
  })

  test('It renders with children', () => {
    render(
      <SubregionToggle
        filterCheckbox="FilterCheckbox"
        filterCheckboxCount="FilterCheckboxCount"
      >
        <ChildMock />
      </SubregionToggle>
    )
    expect(screen.getByRole('button', { name: /subregions/i })).toBeInTheDocument()
    expect(ChildMock).toHaveBeenCalled()
  })

  test('It collapses', async() => {
    const { container } = render(
      <SubregionToggle
        filterCheckbox="FilterCheckbox"
        filterCheckboxCount="FilterCheckboxCount"
      >
        <ChildMock />
      </SubregionToggle>
    )
    const User = userEvent.setup()
    const button = screen.queryByRole('button', { name: /subregions/i })
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const content = container.querySelector('.collapse__content--subfilter')
    // check initial state
    expect(button).toHaveTextContent('+')
    expect(content).toHaveStyle('display: none')

    // click the button
    await User.click(button)

    expect(button).toHaveTextContent('-')
    expect(content).toHaveStyle('display: block')

    // some more clicks
    await User.click(button)
    await User.click(button)
    await User.click(button)

    expect(button).toHaveTextContent('+')
    expect(content).toHaveStyle('display: none')
  })

})