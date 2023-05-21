import { render } from '@testing-library/react'
import Country from '../../pages/country/[countryCode]'
import SingleCountry from '../../components/single/SingleCountry'

jest.mock('../../components/single/SingleCountry')

describe('pages/country/[countryCode]', () => {
  it('Renders the SingleCountry mock', () => {
    render(<Country />)
    expect(SingleCountry).toHaveBeenCalled()
  })
  it('Passes the correct props to SingleCountry mock child', () => {
    render(
      <Country
        singleCountry='country'
        countryCode='countryCode'
        singleEndpoint='singleEndpoint'
      />,
    )
    expect(SingleCountry).toHaveBeenCalledWith(
      expect.objectContaining({
        singleCountry: 'country',
        countryCode: 'countryCode',
        singleEndpoint: 'singleEndpoint',
      }),
      expect.anything(),
    )
  })
})
