import { render } from '@testing-library/react'

import CountryListHeaders from '../CountryListHeaders'
import CountryListHeader from '../CountryListHeader'
import CountryListLegend from '../CountryListLegend'
import Wrapper from '../../general/Wrapper'

jest.mock('../../general/Wrapper', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../CountryListHeader')
jest.mock('../CountryListLegend')

describe('components/countryList/CountryListHeaders', () => {
  test('It renders', () => {
    render(
      <CountryListHeaders 
        activeHidden={[]}
        sortBy="country"
        sortAsc={true}
      />
    )
    expect(Wrapper).toHaveBeenCalledTimes(2)
    expect(CountryListHeader).toHaveBeenCalledTimes(4)
    expect(CountryListLegend).toHaveBeenCalledTimes(4)
  })

  test('It renders correctly with population hidden', () => {
    render(
      <CountryListHeaders 
        activeHidden={['population']}
        sortBy="country"
        sortAsc={true}
      />
    )
    expect(CountryListHeader).toHaveBeenCalledTimes(3)
    expect(CountryListLegend).toHaveBeenCalledTimes(3)
  })

  test('It renders correctly with everything hidden', () => {
    render(
      <CountryListHeaders 
        activeHidden={['population', 'area', 'density']}
        sortBy="country"
        sortAsc={true}
      />
    )
    expect(CountryListHeader).toHaveBeenCalledTimes(1)
    expect(CountryListLegend).toHaveBeenCalledTimes(1)
  })

})