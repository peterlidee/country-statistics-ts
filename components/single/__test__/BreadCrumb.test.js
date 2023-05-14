import { screen, render } from '@testing-library/react'

import BreadCrumb from '../BreadCrumb'

describe('components/single/BreadCrumb', () => {

  test('It renders', () => {
    render(<BreadCrumb countryName="Algeria" />)
    expect(screen.getByRole('link', { name: /all countries/i })).toBeInTheDocument()
    expect(screen.getByText('>')).toBeInTheDocument()
    expect(screen.getByText('Algeria')).toBeInTheDocument()
  })
  
})