import { screen, render } from '@testing-library/react'

import useFetch from 'react-fetch-hook'
import NeighbouringCountries from '../NeighbouringCountries'
import Source from '../../../sources/Source'
import NeighbourComponent from '../NeighbourComponent'

jest.mock('react-fetch-hook')
jest.mock('../../../sources/Source')
jest.mock('../NeighbourComponent', () => {
  return jest.fn((props) => (
    <>
      {props.source}
      {props.children}
    </>
  ))
})

describe('components/single/sections/NeighbouringCountries', () => {
  test('It renders with no data', () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: undefined,
      data: [],
    })
    render(<NeighbouringCountries borders={['aaa', 'bbb', 'ccc']} />)
    expect(NeighbourComponent).toHaveBeenCalled()
    expect(screen.getAllByRole('link')).toHaveLength(3)
    expect(screen.getByRole('link', { name: 'aaa' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'bbb' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'ccc' })).toBeInTheDocument()
  })

  test('It renders no grid when 6 or less then 6 countries', () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: undefined,
      data: [],
    })
    const { container, rerender } = render(
      <NeighbouringCountries borders={['aaa', 'bbb', 'ccc']} />,
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.neighbours-grid')).not.toBeInTheDocument()

    rerender(
      <NeighbouringCountries
        borders={['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff']}
      />,
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.neighbours-grid')).not.toBeInTheDocument()
  })

  test('It renders a grid when more then 6 countries', () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: undefined,
      data: [],
    })
    const { container } = render(
      <NeighbouringCountries
        borders={['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg']}
      />,
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.neighbours-grid')).toBeInTheDocument()
  })

  test('It contructs the country links correctly with no data', () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: undefined,
      data: [],
    })
    render(<NeighbouringCountries borders={['aaa']} />)
    expect(screen.getByRole('link', { name: 'aaa' })).toHaveAttribute(
      'href',
      '/country/aaa',
    )
  })

  test('It contructs the country links correctly with data', () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: undefined,
      data: [{ cca3: 'aaa', name: { common: 'aaaa' } }],
    })
    render(<NeighbouringCountries borders={['aaa']} />)
    expect(screen.getByRole('link', { name: 'aaaa' })).toHaveAttribute(
      'href',
      '/country/aaa',
    )
  })

  test('It renders with data', () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: undefined,
      data: [
        { cca3: 'aaa', name: { common: 'aaaa' } },
        { cca3: 'bbb', name: { common: 'bbbb' } },
      ],
    })
    render(<NeighbouringCountries borders={['aaa', 'bbb', 'zzz']} />)
    expect(screen.getAllByRole('link')).toHaveLength(3)
    expect(screen.getByRole('link', { name: 'aaaa' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'bbbb' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'zzz' })).toBeInTheDocument()
  })

  test('It rerenders correctly', () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: undefined,
      data: [
        { cca3: 'aaa', name: { common: 'aaaa' } },
        { cca3: 'bbb', name: { common: 'bbbb' } },
        { cca3: 'ccc', name: { common: 'cccc' } },
        { cca3: 'ddd', name: { common: 'dddd' } },
      ],
    })
    const { rerender } = render(
      <NeighbouringCountries borders={['aaa', 'bbb']} />,
    )
    expect(screen.getByRole('link', { name: 'aaaa' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'bbbb' })).toBeInTheDocument()
    rerender(<NeighbouringCountries borders={['ccc', 'ddd']} />)
    expect(screen.getByRole('link', { name: 'cccc' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'dddd' })).toBeInTheDocument()
  })

  test('It passes source as prop with loading, no error', () => {
    useFetch.mockReturnValue({
      isLoading: true,
      error: undefined,
      data: [],
    })
    render(<NeighbouringCountries borders={['aaa']} />)

    expect(Source).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint:
          'https://restcountries.com/v3.1/alpha/?fields=cca3,name;codes=aaa',
        loading: true,
        error: undefined,
      }),
      expect.anything(),
    )
  })

  test('It passes source as prop with no loading, error', () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: true,
      data: [],
    })
    render(<NeighbouringCountries borders={['aaa']} />)

    expect(Source).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint:
          'https://restcountries.com/v3.1/alpha/?fields=cca3,name;codes=aaa',
        loading: false,
        error: true,
      }),
      expect.anything(),
    )
  })

  // no borders is not needed bc it only gets called when borders
})
