import { render, screen } from '@testing-library/react'
import FilterRow from '../../region/FilterRow'

const FilterCheckboxMock = jest.fn()
const FilterCheckboxCountMock = jest.fn()
const ChildMock = jest.fn()

describe('components/filters/region/FilterRow', () => {
  test('It renders', () => {
    render(
      <FilterRow
        filterCheckbox={<FilterCheckboxMock />}
        filterCheckboxCount={<FilterCheckboxCountMock />}
      />,
    )
    expect(FilterCheckboxMock).toHaveBeenCalled()
    expect(FilterCheckboxCountMock).toHaveBeenCalled()
  })

  test('it renders the child', () => {
    render(
      <FilterRow
        filterCheckbox={<FilterCheckboxMock />}
        filterCheckboxCount={<FilterCheckboxCountMock />}
      >
        <ChildMock />
      </FilterRow>,
    )
    expect(ChildMock).toHaveBeenCalledTimes(1)
  })

  test('It renders the multiple children', () => {
    render(
      <FilterRow
        filterCheckbox={<FilterCheckboxMock />}
        filterCheckboxCount={<FilterCheckboxCountMock />}
      >
        <ChildMock />
        <ChildMock />
        <ChildMock />
      </FilterRow>,
    )
    expect(ChildMock).toHaveBeenCalledTimes(3)
  })

  test('It renders no Child', () => {
    render(
      <FilterRow
        filterCheckbox={<FilterCheckboxMock />}
        filterCheckboxCount={<FilterCheckboxCountMock />}
      />,
    )
    expect(FilterCheckboxMock).toHaveBeenCalled()
    expect(FilterCheckboxCountMock).toHaveBeenCalled()
  })

  test('It renders string', () => {
    render(
      <FilterRow
        filterCheckbox={<FilterCheckboxMock />}
        filterCheckboxCount={<FilterCheckboxCountMock />}
      >
        foobar
      </FilterRow>,
    )
    expect(screen.getByText(/foobar/)).toBeInTheDocument()
  })
})
