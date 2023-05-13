import { render } from '@testing-library/react'
import FilterRow from '../../region/FilterRow'

const FilterCheckboxMock = jest.fn()
const FilterCheckboxCountMock = jest.fn()
const ChildMock = jest.fn()

describe('components/filters/region/FilterRow', () => {

  test('It renders', () => {
    render(
      <FilterRow 
        filterCheckbox={<FilterCheckboxMock />}
        filterCheckboxCount={<FilterCheckboxCountMock />} />
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
      </FilterRow>
    )
    expect(ChildMock).toHaveBeenCalledTimes(1)
  })

})