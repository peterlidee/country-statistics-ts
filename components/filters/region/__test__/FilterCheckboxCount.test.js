import { screen, render } from '@testing-library/react'
import FilterCheckboxCount from '../FilterCheckboxCount'

describe('components/filters/region/FilterCheckboxCount', () => {

  test('It renders', () => {
    render(<FilterCheckboxCount count={10} />)
    expect(screen.getByText("10")).toBeInTheDocument()
  })

  test('It renders the correct props', () => {
    render(<FilterCheckboxCount count={199} />)
    expect(screen.getByText("199")).toBeInTheDocument()
  })
  
})