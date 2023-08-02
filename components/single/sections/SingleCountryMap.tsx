/**
 * validates prop and renders MapWidget with region and optionally subregion
 * @param singleCountry - SingleCountry type
 */

import BoxWrapper from '../../general/BoxWrapper'
import SingleCountryComponent from '../SingleCountryComponent'
import FetchRegionCountries from '../map/FetchRegionCountries'
import MapWidget from '../map/MapWidget'
import Placeholder from '../../svgSnippets/Placeholder'
import { SingleCountryType } from '@/types/singleCountry'

type Props = {
  singleCountry: SingleCountryType
}

function SingleCountryMap({ singleCountry }: Props) {
  // wait for the parent query in SingleCountry to load
  if (!singleCountry)
    return (
      <SingleCountryComponent extraClass='map'>
        <Placeholder />
      </SingleCountryComponent>
    )

  if (singleCountry.subregion === '') {
    return (
      <FetchRegionCountries type='region' label={singleCountry.region}>
        {(regionCountries) => (
          <MapWidget
            singleCountry={singleCountry}
            regionCountries={regionCountries}
          />
        )}
      </FetchRegionCountries>
    )
  }

  return (
    <FetchRegionCountries type='region' label={singleCountry.region}>
      {(regionCountries) => (
        <FetchRegionCountries type='subregion' label={singleCountry.subregion}>
          {(subregionCountries) => (
            <MapWidget
              singleCountry={singleCountry}
              regionCountries={regionCountries}
              subregionCountries={subregionCountries}
            />
          )}
        </FetchRegionCountries>
      )}
    </FetchRegionCountries>
  )
}

export default SingleCountryMap
