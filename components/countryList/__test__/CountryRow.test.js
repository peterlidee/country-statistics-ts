import { screen, render } from '@testing-library/react'

import { extraDataCountries } from '../../../__mock__/data/countriesMock'
import CountryRow from '../CountryRow'
import Wrapper from '../../general/Wrapper'

jest.mock('../../general/Wrapper', () => {
  return jest.fn((props) => <>{props.children}</>)
})

describe('components/countryList/CountryRow', () => {

  test('It renders', () => {
    render(
      <CountryRow 
        country={extraDataCountries[0]} 
        index={0} 
        activeHidden={[]} />
    )
    expect(Wrapper).toHaveBeenCalledTimes(5)
    expect(Wrapper).toHaveBeenNthCalledWith(
      1, 
      expect.objectContaining({
        children: 1
      }),
      expect.anything()
    )
    expect(screen.getByText(/1/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Austria' })).toBeInTheDocument()
    expect(Wrapper).toHaveBeenNthCalledWith(
      3, 
      expect.objectContaining({
        children: '8.917.205'
      }),
      expect.anything()
    )
    expect(screen.getByText(/8.917.205/)).toBeInTheDocument()
    expect(Wrapper).toHaveBeenNthCalledWith(
      4, 
      expect.objectContaining({
        children: '83.871'
      }),
      expect.anything()
    )
    expect(screen.getByText(/83.871/)).toBeInTheDocument()
    expect(Wrapper).toHaveBeenNthCalledWith(
      5, 
      expect.objectContaining({
        children: 106
      }),
      expect.anything()
    )
    expect(screen.getByText(/106/)).toBeInTheDocument()
  })

  test('It correctly hides fields population and area', () => {
    render(
      <CountryRow 
        country={extraDataCountries[0]} 
        index={0} 
        activeHidden={['population', 'area']} />
    )
    expect(Wrapper).toHaveBeenCalledTimes(3)
    expect(screen.queryByText(/8.917.205/)).not.toBeInTheDocument()
    expect(screen.queryByText(/83.871/)).not.toBeInTheDocument()
  })

  test('It correctly hides field density', () => {
    render(
      <CountryRow 
        country={extraDataCountries[0]} 
        index={0} 
        activeHidden={['density']} />
    )
    expect(Wrapper).toHaveBeenCalledTimes(4)
    expect(screen.queryByText(/106/)).not.toBeInTheDocument()
  })

  test('It correctly hides all fields', () => {
    render(
      <CountryRow 
        country={extraDataCountries[0]} 
        index={0} 
        activeHidden={['population', 'density', 'area']} />
    )
    expect(Wrapper).toHaveBeenCalledTimes(2)
    expect(screen.queryByText(/8.917.205/)).not.toBeInTheDocument()
    expect(screen.queryByText(/106/)).not.toBeInTheDocument()
    expect(screen.queryByText(/83.871/)).not.toBeInTheDocument()
  })

})