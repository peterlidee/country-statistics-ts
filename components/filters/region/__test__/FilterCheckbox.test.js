import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useRouter } from 'next/router'
import FilterCheckBox from '../../region/FilterCheckbox'
import updateRegionsQuery from '../../../../lib/regionFilter/updateRegionsQuery'
import filterDataMock from '../../../../__mock__/data/filterDataMock'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))
const mockPush = jest.fn()
useRouter.mockReturnValue({
  push: mockPush,
})
jest.mock('../../../../lib/regionFilter/updateRegionsQuery')

beforeEach(() => {
  updateRegionsQuery.mockReset()
})

describe('components/filters/region/FilterCheckBox', () => {
  test('It renders', () => {
    render(
      <FilterCheckBox
        name='name'
        region={undefined}
        activeRegions={[]}
        regionsAndSubregions={{}}
      />,
    )
    expect(screen.getByRole('checkbox', { name: 'name' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'name' })).not.toBeChecked()
  })

  test('It renders checked when activeRegions == props.name', () => {
    render(
      <FilterCheckBox
        name='name'
        region={undefined}
        activeRegions={['name']}
        regionsAndSubregions={{}}
      />,
    )
    expect(screen.getByRole('checkbox', { name: 'name' })).toBeChecked()
  })
})

describe('It calls router.push with the correct props', () => {
  test('A click on a subregion that is active and region is also active [1.1.1]', async () => {
    updateRegionsQuery.mockReturnValue(['Western Europe', 'Central Europe'])
    render(
      <FilterCheckBox
        name='Northern Europe'
        region={'Europe'}
        activeRegions={[
          'Northern Europe',
          'Western Europe',
          'Europe',
          'Central Europe',
        ]}
        regionsAndSubregions={filterDataMock.defaultRegionState}
      />,
    )
    const User = userEvent.setup()
    const checkBoxEl = screen.getByRole('checkbox', { name: 'Northern Europe' })
    await User.click(checkBoxEl)
    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({
          regions: 'Western Europe,Central Europe',
        }),
      }),
      undefined,
      expect.anything(),
    )
  })

  test('A click on a subregion that is active and region is not active [1.1.2]', async () => {
    updateRegionsQuery.mockReturnValue(['Southeast Europe', 'Central Europe'])
    render(
      <FilterCheckBox
        name='Northern Europe'
        region={'Europe'}
        activeRegions={[
          'Northern Europe',
          'Southeast Europe',
          'Europe',
          'Central Europe',
        ]}
        regionsAndSubregions={filterDataMock.defaultRegionState}
      />,
    )
    const User = userEvent.setup()
    const checkBoxEl = screen.getByRole('checkbox', { name: 'Northern Europe' })
    await User.click(checkBoxEl)
    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({
          regions: 'Southeast Europe,Central Europe',
        }),
      }),
      undefined,
      expect.anything(),
    )
  })

  test('A click on a subregion that is not active and all the other subregions are active [1.2.1]', async () => {
    updateRegionsQuery.mockReturnValue([
      'Northern Europe',
      'Western Europe',
      'Europe',
      'Central Europe',
    ])
    render(
      <FilterCheckBox
        name='Central Europe'
        region={'Europe'}
        activeRegions={['Northern Europe', 'Western Europe']}
        regionsAndSubregions={filterDataMock.defaultRegionState}
      />,
    )
    const User = userEvent.setup()
    const checkBoxEl = screen.getByRole('checkbox', { name: 'Central Europe' })
    await User.click(checkBoxEl)
    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({
          regions: 'Northern Europe,Western Europe,Europe,Central Europe',
        }),
      }),
      undefined,
      expect.anything(),
    )
  })

  test('A click on a subregion that is not active and NOT all the other subregions are active [1.2.2]', async () => {
    updateRegionsQuery.mockReturnValue([
      'Southeast Europe',
      'Central Europe',
      'Northern Europe',
    ])
    render(
      <FilterCheckBox
        name='Northern Europe'
        region={'Europe'}
        activeRegions={['Southeast Europe', 'Central Europe']}
        regionsAndSubregions={filterDataMock.defaultRegionState}
      />,
    )
    const User = userEvent.setup()
    const checkBoxEl = screen.getByRole('checkbox', { name: 'Northern Europe' })
    await User.click(checkBoxEl)
    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({
          regions: 'Southeast Europe,Central Europe,Northern Europe',
        }),
      }),
      undefined,
      expect.anything(),
    )
  })

  test('A click on a region that is active [2.1]', async () => {
    updateRegionsQuery.mockReturnValue([])
    render(
      <FilterCheckBox
        name='Africa'
        region={undefined}
        activeRegions={['Africa']}
        regionsAndSubregions={filterDataMock.defaultRegionState}
      />,
    )
    const User = userEvent.setup()
    const checkBoxEl = screen.getByRole('checkbox', { name: 'Africa' })
    await User.click(checkBoxEl)
    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: '/',
        query: expect.objectContaining({
          regions: '',
        }),
      }),
      undefined,
      expect.anything(),
    )
  })

  test('A click on a region that is not active [2.2]', async () => {
    updateRegionsQuery.mockReturnValue(['Africa', 'Northern Africa'])
    render(
      <FilterCheckBox
        name='Africa'
        region={undefined}
        activeRegions={[]}
        regionsAndSubregions={filterDataMock.defaultRegionState}
      />,
    )
    const User = userEvent.setup()
    const checkBoxEl = screen.getByRole('checkbox', { name: 'Africa' })
    await User.click(checkBoxEl)
    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: '/',
        query: expect.objectContaining({
          regions: 'Africa,Northern Africa',
        }),
      }),
      undefined,
      expect.anything(),
    )
  })
})
