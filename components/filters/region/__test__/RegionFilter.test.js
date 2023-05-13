import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import filterDataMock from '../../../../__mock__/data/filterDataMock'
import { useRouter } from 'next/router'

import RegionFilter from '../RegionFilter'
import SubregionToggle from '../SubregionToggle'
import FilterRow from '../FilterRow'
import FilterCheckbox from '../FilterCheckbox'
import FilterCheckboxCount from '../FilterCheckboxCount'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))
const pushMock = jest.fn()
jest.mock('../SubregionToggle', () => {
  return jest.fn((props) => (
    <>
      {props.filterCheckbox}
      {props.filterCheckboxCount}
      {props.children}
    </>
  ))
})
jest.mock('../FilterCheckbox')
jest.mock('../FilterCheckboxCount')
jest.mock('../FilterRow', () => {
  return jest.fn((props) => (
    <>
      {props.filterCheckbox}
      {props.filterCheckboxCount}
    </>
  ))
})

describe('components/filters/region/RegionFilter', () => {
  test('It renders', () => {
    render(
      <RegionFilter
        regionsAndSubregions={filterDataMock.defaultRegionState}
        regionsAndSubregionsIndexes={filterDataMock.regionIndexes}
        activeRegions={[]}
      />,
    )

    expect(SubregionToggle).toHaveBeenCalledTimes(4)
    expect(FilterCheckbox).toHaveBeenCalledTimes(9)
    expect(FilterCheckboxCount).toHaveBeenCalledTimes(9)
    expect(FilterRow).toHaveBeenCalledTimes(5)

    // first region
    expect(FilterCheckbox).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ name: 'Africa' }),
      expect.anything(),
    )
    expect(FilterCheckboxCount).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ count: 1 }),
      expect.anything(),
    )

    // first subregion
    expect(FilterCheckbox).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ name: 'Northern Africa' }),
      expect.anything(),
    )
    expect(FilterCheckboxCount).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ count: 1 }),
      expect.anything(),
    )

    // second region
    expect(FilterCheckbox).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ name: 'Americas' }),
      expect.anything(),
    )
    expect(FilterCheckboxCount).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ count: 1 }),
      expect.anything(),
    )

    // second subregion
    expect(FilterCheckbox).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({ name: 'Caribbean' }),
      expect.anything(),
    )
    expect(FilterCheckboxCount).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({ count: 1 }),
      expect.anything(),
    )

    // third region
    expect(FilterCheckbox).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({ name: 'Antarctic' }),
      expect.anything(),
    )
    expect(FilterCheckboxCount).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({ count: 1 }),
      expect.anything(),
    )

    // fourth region
    expect(FilterCheckbox).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({ name: 'Europe' }),
      expect.anything(),
    )
    expect(FilterCheckboxCount).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({ count: 3 }),
      expect.anything(),
    )

    // third subregion
    expect(FilterCheckbox).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({ name: 'Central Europe' }),
      expect.anything(),
    )
    expect(FilterCheckboxCount).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({ count: 1 }),
      expect.anything(),
    )

    // fourth subregion
    expect(FilterCheckbox).toHaveBeenNthCalledWith(
      8,
      expect.objectContaining({ name: 'Northern Europe' }),
      expect.anything(),
    )
    expect(FilterCheckboxCount).toHaveBeenNthCalledWith(
      8,
      expect.objectContaining({ count: 1 }),
      expect.anything(),
    )

    // fifth subregion
    expect(FilterCheckbox).toHaveBeenNthCalledWith(
      9,
      expect.objectContaining({ name: 'Western Europe' }),
      expect.anything(),
    )
    expect(FilterCheckboxCount).toHaveBeenNthCalledWith(
      9,
      expect.objectContaining({ count: 1 }),
      expect.anything(),
    )

    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
  })

  test('The button calls router.push correctly', async () => {
    useRouter.mockReturnValue({
      query: { regions: 'Europe,Americas', sort: '-country' },
      push: pushMock,
    })
    const User = userEvent.setup()
    render(
      <RegionFilter
        regionsAndSubregions={filterDataMock.defaultRegionState}
        regionsAndSubregionsIndexes={filterDataMock.regionIndexes}
        activeRegions={['Europe,Americas']}
      />,
    )
    const button = screen.getByRole('button', { name: /clear/i })
    await User.click(button)
    expect(pushMock).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: '/',
        query: { sort: '-country' },
      }),
      undefined,
      { shallow: true },
    )
  })
})
