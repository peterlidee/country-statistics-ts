import { screen, render } from '@testing-library/react'

import Filters from '../Filters'
import IconFilters from '../../svgSnippets/IconFilters'
import FiltersToggle from '../FiltersToggle'
import Collapse from '../../general/Collapse'
import isFilterActive from '../../../lib/filter/isFilterActive'
import RegionFilter from '../region/RegionFilter'
import NumberFilter from '../number/NumberFilter'

import filterDataMock from '../../../__mock__/data/filterDataMock'

jest.mock('../../svgSnippets/IconFilters')
jest.mock('../FiltersToggle', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../../general/Collapse', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../../../lib/filter/isFilterActive')
jest.mock('../region/RegionFilter')
jest.mock('../number/NumberFilter')

describe('components/filters/Filters', () => {
  test('It renders', () => {
    render(
      <Filters
        activeHidden={[]}
        activeRegions={[]}
        activeNumbers={{
          activeNumberFilters: [],
          currentSelection: {},
        }}
        filterData={filterDataMock}
      />,
    )

    expect(IconFilters).toHaveBeenCalled()
    expect(screen.getByText(/filter by/i)).toBeInTheDocument()
    expect(FiltersToggle).toHaveBeenCalled()
    expect(Collapse).toHaveBeenCalledTimes(4)
    expect(isFilterActive).toHaveBeenCalledTimes(4)
    expect(RegionFilter).toHaveBeenCalledTimes(1)
    expect(NumberFilter).toHaveBeenCalledTimes(3)
  })

  test('It calls RegionFilter with correct props', () => {
    render(
      <Filters
        activeHidden={[]}
        activeRegions={[]}
        activeNumbers={{
          activeNumberFilters: [],
          currentSelection: {},
        }}
        filterData={filterDataMock}
      />,
    )
    expect(RegionFilter).toHaveBeenCalledWith(
      expect.objectContaining({
        activeRegions: [],
      }),
      expect.anything(),
    )
  })

  test('It calls NumberFilter with correct props', () => {
    render(
      <Filters
        activeHidden={[]}
        activeRegions={[]}
        activeNumbers={{
          activeNumberFilters: [],
          currentSelection: {},
        }}
        filterData={filterDataMock}
      />,
    )
    expect(NumberFilter).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ filter: 'population' }),
      expect.anything(),
    )
    expect(NumberFilter).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ filter: 'area' }),
      expect.anything(),
    )
    expect(NumberFilter).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ filter: 'density' }),
      expect.anything(),
    )
  })

  test('It correctly hides value population', () => {
    render(
      <Filters
        activeHidden={['population']}
        activeRegions={[]}
        activeNumbers={{
          activeNumberFilters: [],
          currentSelection: {},
        }}
        filterData={filterDataMock}
      />,
    )
    expect(Collapse).toHaveBeenCalledTimes(3)
    expect(NumberFilter).toHaveBeenCalledTimes(2)
  })

  test('It correctly hides value population, area and density', () => {
    render(
      <Filters
        activeHidden={['population', 'area', 'density']}
        activeRegions={[]}
        activeNumbers={{
          activeNumberFilters: [],
          currentSelection: {},
        }}
        filterData={filterDataMock}
      />,
    )
    expect(Collapse).toHaveBeenCalledTimes(1)
    expect(NumberFilter).not.toHaveBeenCalled()
  })

  test('It passed the correct boldLabel to Collapse when isFilterActive mock returns true', () => {
    isFilterActive.mockReturnValue(true)
    render(
      <Filters
        activeHidden={['population', 'area', 'density']}
        activeRegions={[]}
        activeNumbers={{
          activeNumberFilters: [],
          currentSelection: {},
        }}
        filterData={filterDataMock}
      />,
    )
    expect(Collapse).toHaveBeenCalledTimes(1)
    expect(Collapse).toHaveBeenCalledWith(
      expect.objectContaining({
        boldLabel: true,
      }),
      expect.anything(),
    )
    isFilterActive.mockReset()
  })

  test('It passed the correct boldLabel to Collapse when isFilterActive mock returns false', () => {
    isFilterActive.mockReturnValue(false)
    render(
      <Filters
        activeHidden={['population', 'area', 'density']}
        activeRegions={[]}
        activeNumbers={{
          activeNumberFilters: [],
          currentSelection: {},
        }}
        filterData={filterDataMock}
      />,
    )
    expect(Collapse).toHaveBeenCalledTimes(1)
    expect(Collapse).toHaveBeenCalledWith(
      expect.objectContaining({
        boldLabel: false,
      }),
      expect.anything(),
    )
    isFilterActive.mockReset()
  })
})
