import { useRouter } from 'next/router'

import SubregionToggle from './SubregionToggle'
import FilterRow from './FilterRow'
import FilterCheckbox from './FilterCheckbox'
import FilterCheckboxCount from './FilterCheckboxCount'

import {
  DefaultRegionStateType,
  RegionIndexesType,
} from '../../../types/filterData'

type Props = {
  regionsAndSubregions: DefaultRegionStateType
  regionsAndSubregionsIndexes: RegionIndexesType
  activeRegions: string[]
}

function RegionFilter({
  regionsAndSubregions,
  regionsAndSubregionsIndexes,
  activeRegions,
}: Props) {
  const regionNames = Object.keys(regionsAndSubregions)
  const router = useRouter()

  function clearRegionFilter() {
    // take copy of query and delete regions prop
    const query = { ...router.query }
    delete query.regions
    router.push({ pathname: '/', query }, undefined, { shallow: true })
  }

  return (
    <div className='filter filter--region'>
      {regionNames.sort().map((regionName) => {
        // we pass following 2 components with composition
        const RegionFilterCheckbox = (
          <FilterCheckbox
            name={regionName}
            region={undefined}
            activeRegions={activeRegions}
            regionsAndSubregions={regionsAndSubregions}
          />
        )
        const RegionFilterCheckboxCount = (
          <FilterCheckboxCount
            count={regionsAndSubregionsIndexes[regionName].length}
          />
        )
        return (
          <div
            className='filter__block__region'
            key={`region-filter-${regionName}`}
          >
            <SubregionToggle
              filterCheckbox={RegionFilterCheckbox}
              filterCheckboxCount={RegionFilterCheckboxCount}
            >
              {regionsAndSubregions[regionName].subregionNames.length > 0 && (
                <div className='filter__block__subregion'>
                  {regionsAndSubregions[regionName].subregionNames.map(
                    (subregionName, i) => {
                      // we pass following 2 components with composition
                      const subregionFilterCheckbox = (
                        <FilterCheckbox
                          name={subregionName}
                          region={regionName}
                          activeRegions={activeRegions}
                          regionsAndSubregions={regionsAndSubregions}
                        />
                      )
                      const subregionFilterCheckboxCount = (
                        <FilterCheckboxCount
                          count={
                            regionsAndSubregionsIndexes[subregionName].length
                          }
                        />
                      )
                      return (
                        <FilterRow
                          key={`subregion-filter-${subregionName}`}
                          filterCheckbox={subregionFilterCheckbox}
                          filterCheckboxCount={subregionFilterCheckboxCount}
                        />
                      )
                    },
                  )}
                </div>
              )}
            </SubregionToggle>
          </div>
        )
      })}
      <button onClick={clearRegionFilter} className='filter__clear-button'>
        clear
      </button>
    </div>
  )
}

export default RegionFilter
