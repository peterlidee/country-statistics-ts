import { screen, render } from '@testing-library/react'
import SingleCountryBasisStats from '../SingleCountryBasicStats'
import formatNumber from '../../../../lib/helpers/formatNumber'
import roundNumber from '../../../../lib/helpers/roundNumber'
import BoxWrapper from '../../../general/BoxWrapper'

jest.mock('../../../../lib/helpers/formatNumber', () => {
  return jest.fn(num => num)
})
jest.mock('../../../../lib/helpers/roundNumber', () => {
  return jest.fn(num => num)
})
jest.mock('../../../general/BoxWrapper', () => {
  return jest.fn((props) => <>{props.children}</>)
})

describe('components/single/sections/SingleCountryBasicStats', () => {
  
  test('It renders', () => {
    render(
      <SingleCountryBasisStats 
        population={100}
        area={25} />
    )
    expect(BoxWrapper).toHaveBeenCalled()
    expect(screen.getByText(/Total population/i)).toBeInTheDocument()
    expect(screen.getByText(/100/i)).toBeInTheDocument()
    expect(screen.getByText(/Size/i)).toBeInTheDocument()
    expect(screen.getByText(/25/i)).toBeInTheDocument()
    expect(screen.getByText(/Population density/i)).toBeInTheDocument()
    expect(screen.getByText(/4 inhabitants \/ km²/i)).toBeInTheDocument()
  })

  test('It rerenders correctly', () => {
    const { rerender } = render(
      <SingleCountryBasisStats 
        population={100}
        area={25} />
    )
    expect(screen.getByText(/100/i)).toBeInTheDocument()
    expect(screen.getByText(/25 km²/i)).toBeInTheDocument()
    rerender(
      <SingleCountryBasisStats 
        population={400}
        area={200}
      />
    )
    expect(screen.getByText(/400/i)).toBeInTheDocument()
    expect(screen.getByText(/200 km²/)).toBeInTheDocument()
  })
  
})