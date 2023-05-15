import { render } from '@testing-library/react'
import NeighbourComponent from '../NeighbourComponent'
import NeighbouringCountries from '../NeighbouringCountries'
import ValidateNeighbouringCountries from '../ValidateNeighbouringCountries'

jest.mock('../NeighbourComponent')
jest.mock('../NeighbouringCountries')

describe('components/single/neighbours/ValidateNeighbouringCountries', () => {
  test('It renders with loading and no data', () => {
    render(
      <ValidateNeighbouringCountries
        loading={true}
        error={undefined}
        data={undefined}
      />,
    )
    expect(NeighbourComponent).toHaveBeenCalledWith(
      expect.objectContaining({ children: '...' }),
      expect.anything(),
    )
  })
  test('It renders with error', () => {
    render(
      <ValidateNeighbouringCountries
        loading={false}
        error={new Error('Error!')}
        data={undefined}
      />,
    )
    expect(NeighbourComponent).toHaveBeenCalledWith(
      expect.objectContaining({ children: 'No data found.' }),
      expect.anything(),
    )
  })
  test('It renders with data.borders.length = 0', () => {
    render(
      <ValidateNeighbouringCountries
        loading={false}
        error={undefined}
        data={{ borders: [] }}
      />,
    )
    expect(NeighbourComponent).toHaveBeenCalledWith(
      expect.objectContaining({ children: 'None (island).' }),
      expect.anything(),
    )
  })
  test('It renders with data.borders.length > 0', () => {
    render(
      <ValidateNeighbouringCountries
        loading={false}
        error={undefined}
        data={{ borders: ['item'] }}
      />,
    )
    expect(NeighbouringCountries).toHaveBeenCalledWith(
      expect.objectContaining({ borders: ['item'] }),
      expect.anything(),
    )
  })
})
