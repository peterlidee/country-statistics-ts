import { useRouter } from 'next/router'
import updateRegionsQuery from '../../../lib/regionFilter/updateRegionsQuery'

import { DefaultRegionStateType } from '@/types/filterData'
import PropTypes from 'prop-types'
import { defaultRegionStatePropTypes } from '@/propTypes/filterDataPropTypes'

type Props = {
  name: string
  region: string | undefined
  activeRegions: string[]
  regionsAndSubregions: DefaultRegionStateType
}

function FilterCheckbox({
  name,
  region,
  activeRegions,
  regionsAndSubregions,
}: Props) {
  const router = useRouter()
  const isActive = activeRegions.includes(name)

  const handler = () => {
    // 1. if a subregion is clicked
    // 1.1 if the subregion is active
    // 1.1.1 if the region is active -> deactivate region and subregion (all other subregion should be active)
    // 1.1.2 if the region is not active -> deactivate subregion
    // 1.2 if the subregion is not active
    // 1.2.1 if all other subregions in this region are active -> activate subregion and region
    // 1.2.2 if not all other subregions in this region are active -> activate subregion
    // 2. if a region is clicked
    // 2.1 if the region is active -> deactivate region and all subregions
    // 2.2 if the region is not active -> activate region and all subregions

    let toAdd: string[] = []
    let toRemove: string[] = []

    if (region) {
      // 1. subregion is clicked
      if (isActive) {
        // 1.1 subregion active
        if (activeRegions.includes(region)) {
          // 1.1.1 if the region is active -> deactivate region and subregion
          // toAdd = []
          toRemove = [name, region]
        } else {
          // 1.1.2 if the region is not active -> deactivate subregion
          // toAdd = []
          toRemove = [name]
        }
      } else {
        // 1.2 subregion not active
        const allOtherSubregions = regionsAndSubregions[
          region
        ].subregionNames.filter((item) => item !== name)
        const allOtherSubregionsActive = allOtherSubregions.every((subregion) =>
          activeRegions.includes(subregion),
        )
        if (allOtherSubregionsActive) {
          // 1.2.1 if all other subregions in this region are active -> activate subregion and region
          toAdd = [region, name]
          // toRemove = []
        } else {
          // 1.2.2 if not all other subregions in this region are active -> activate subregion
          toAdd = [name]
          // toRemove = []
        }
      }
    } else {
      // 2. region is clicked
      if (isActive) {
        // 2.1 if the region is active -> deactivate region and all subregions
        // toAdd = []
        toRemove = [name, ...regionsAndSubregions[name].subregionNames]
      } else {
        // 2.2 if the region is not active -> activate region and all subregions
        toAdd = [name, ...regionsAndSubregions[name].subregionNames]
        // toRemove = []
      }
    }
    const newRegionsQuery = updateRegionsQuery(activeRegions, toAdd, toRemove)

    router.push(
      {
        pathname: '/',
        query: {
          ...router.query,
          regions: newRegionsQuery.join(','),
        },
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <label className='filtercheckbox__label'>
      <input
        type='checkbox'
        className='filtercheckbox__input'
        value={''}
        checked={isActive}
        onChange={handler}
      />
      {name}
    </label>
  )
}

FilterCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  region: PropTypes.string,
  activeRegions: PropTypes.arrayOf(PropTypes.string),
  regionsAndSubregions: defaultRegionStatePropTypes.isRequired,
}

export default FilterCheckbox
