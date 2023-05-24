import { render, screen } from '@testing-library/react'

import NeighbouringCountries from '../NeighbouringCountries'
import NeighbourComponent from '../NeighbourComponent'
import Source from '../../../sources/Source'

jest.mock('../NeighbourComponent')
jest.mock('../../../sources/Source')

NeighbourComponent.mockImplementation((props) => (
  <>
    {props.source}
    {props.children}
  </>
))

describe('component/single/neighbours/NeighbouringCountries', () => {
  test('It renders with no neighbours ([])', () => {
    render(
      <NeighbouringCountries neighboursEndpoint='endpoint' neighbours={[]} />,
    )
    expect(NeighbourComponent).toHaveBeenCalled()
    expect(screen.getByText(/None/i)).toBeInTheDocument()
    expect(screen.getByText(/(island)/i)).toBeInTheDocument()
  })
  test('It renders with neighbours', () => {
    render(
      <NeighbouringCountries
        neighboursEndpoint='endpoint'
        neighbours={[
          { countryName: 'AAAAAA', cca3: 'aaa' },
          { countryName: 'BBBBBB', cca3: 'bbb' },
        ]}
      />,
    )
    expect(NeighbourComponent).toHaveBeenCalled()
    expect(Source).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: 'endpoint',
        label: 'restcountries.com/{codes}',
      }),
      expect.anything(),
    )
    expect(screen.getAllByRole('link')).toHaveLength(2)
    expect(screen.getByRole('link', { name: 'AAAAAA' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'AAAAAA' })).toHaveAttribute(
      'href',
      '/country/aaa',
    )
    expect(screen.getByRole('link', { name: 'BBBBBB' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'BBBBBB' })).toHaveAttribute(
      'href',
      '/country/bbb',
    )
  })

  test('It renders no grid with 6 or less then 6 neighbours', () => {
    const { container } = render(
      <NeighbouringCountries
        neighboursEndpoint='endpoint'
        neighbours={[
          { countryName: 'AAAAAA', cca3: 'aaa' },
          { countryName: 'BBBBBB', cca3: 'bbb' },
          { countryName: 'CCCCCC', cca3: 'ccc' },
          { countryName: 'DDDDDD', cca3: 'ddd' },
          { countryName: 'EEEEEE', cca3: 'eee' },
          { countryName: 'FFFFFF', cca3: 'fff' },
        ]}
      />,
    )
    expect(screen.getAllByRole('link')).toHaveLength(6)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.neighbours-grid')).not.toBeInTheDocument()
  })

  test('It renders a grid more then 6 neighbours', () => {
    const { container } = render(
      <NeighbouringCountries
        neighboursEndpoint='endpoint'
        neighbours={[
          { countryName: 'AAAAAA', cca3: 'aaa' },
          { countryName: 'BBBBBB', cca3: 'bbb' },
          { countryName: 'CCCCCC', cca3: 'ccc' },
          { countryName: 'DDDDDD', cca3: 'ddd' },
          { countryName: 'EEEEEE', cca3: 'eee' },
          { countryName: 'FFFFFF', cca3: 'fff' },
          { countryName: 'GGGGGG', cca3: 'ggg' },
        ]}
      />,
    )
    expect(screen.getAllByRole('link')).toHaveLength(7)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.neighbours-grid')).toBeInTheDocument()
  })

  test('It rerenders correctly', () => {
    const { rerender } = render(
      <NeighbouringCountries
        neighboursEndpoint='endpoint'
        neighbours={[
          { countryName: 'AAAAAA', cca3: 'aaa' },
          { countryName: 'BBBBBB', cca3: 'bbb' },
        ]}
      />,
    )
    expect(screen.getAllByRole('link')).toHaveLength(2)
    expect(screen.getByRole('link', { name: 'AAAAAA' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'BBBBBB' })).toBeInTheDocument()
    rerender(
      <NeighbouringCountries
        neighboursEndpoint='endpoint'
        neighbours={[
          { countryName: 'CCCCCC', cca3: 'ccc' },
          { countryName: 'DDDDDD', cca3: 'ddd' },
          { countryName: 'EEEEEE', cca3: 'eee' },
        ]}
      />,
    )
    expect(screen.getAllByRole('link')).toHaveLength(3)
    expect(
      screen.queryByRole('link', { name: 'AAAAAA' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'BBBBBB' }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'CCCCCC' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'DDDDDD' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'EEEEEE' })).toBeInTheDocument()
  })
})
