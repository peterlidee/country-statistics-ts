import IconPan from '../../svgSnippets/IconPan'
import { Active } from './MapControles'
import {
  CountryLatLng,
  RegionOrSubregionCountries,
} from '@/types/regionOrSubregionCountries'

/**
 * Render button for region and subregion
 * calculate coords on button click + pan and zoom map
 * set state to current type active
 * @param props.type - region or subregion
 * @param props.label - button label
 * @param props.map - ref of google.maps.Map
 * @param props.active - current active pan button, state, inherited MapControles
 * @param props.setActive - setActive @param props.active
 * @param props.countries - type RegionOrSubregionCountries
 * @returns JSX.Element
 */

type Props = {
  type: 'region' | 'subregion'
  label: string
  map: google.maps.Map
  active: Active
  setActive: React.Dispatch<React.SetStateAction<Active>>
  countries: RegionOrSubregionCountries
}

// convert data to latlng and feed them into google latlngbounds
const calculateBounds = (data: CountryLatLng[]) => {
  const bounds = new google.maps.LatLngBounds()
  for (let i = 0; i < data.length; i++) {
    bounds.extend(new google.maps.LatLng(data[i].latlng[0], data[i].latlng[1]))
  }
  // return to use
  return bounds
}

function MapRegionButton({
  type,
  label,
  map,
  active,
  setActive,
  countries,
}: Props) {
  // is there region? is there subregion?
  if (label === '') return null

  // catch errors and no data
  if (countries.error || (!countries.isLoading && !countries.data)) return null

  // button handler, on click, make the bounds calculations and set map to them
  const setMap = () => {
    // set this button to active
    setActive(type)

    // we need to set region antarctic manually cause it don't work
    if (type === 'region' && label === 'Antarctic') {
      map.setCenter(
        new google.maps.LatLng(-70.83554401282763, 2.3967306184474007),
      )
      map.setZoom(2)
    } else {
      // calculate
      const bounds = calculateBounds(countries.data)
      // set map to bounds
      map.fitBounds(bounds) // # auto-zoom
      map.panToBounds(bounds) // # auto-center
    }
  }

  return (
    <div className='map-controles__button-container'>
      <IconPan active={active === type} />
      <button
        onClick={setMap}
        className='map-controles__button'
        disabled={countries.isLoading}
      >
        {label}
      </button>
    </div>
  )
}

export default MapRegionButton
