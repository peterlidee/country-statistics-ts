import { render, screen } from '@testing-library/react'

import CountryCount from '../CountryCount'

describe('components/header/CountryCount', () => {
  test('It renders', () => {
    render(<CountryCount count={100} />)
    expect(screen.getByText(/displaying/i)).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText(/countries/i)).toBeInTheDocument()
  })

  test('It displays the correct count 100', () => {
    render(<CountryCount count={100} />)
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  test('It displays the correct count 10', () => {
    render(<CountryCount count={10} />)
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  test('It displays the correct count 1', () => {
    render(<CountryCount count={1} />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('It displays country singular', () => {
    render(<CountryCount count={1} />)
    expect(screen.getByText(/country/i)).toBeInTheDocument()
  })

  test('It displays countries plural', () => {
    render(<CountryCount count={100} />)
    expect(screen.getByText(/countries/i)).toBeInTheDocument()
  })
})
