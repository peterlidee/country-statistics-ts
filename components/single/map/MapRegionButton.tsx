import { Coordinates } from '@/types/coordinates'
import { Active } from './MapControles'

import IconPan from '../../svgSnippets/IconPan'

/*
Render button for region and subregion zoom
calculate coords on button click + pan and zoom map
set state to current type active
*/

type Props = {
  type: 'region' | 'subregion'
  label: string
  map: google.maps.Map
  active: Active
  setActive: React.Dispatch<React.SetStateAction<Active>>
  coordinates: Coordinates[]
}

// convert data to latlng and feed them into google latlngbounds
const calculateBounds = (coordinates: Coordinates[]) => {
  const bounds = new google.maps.LatLngBounds()
  for (let i = 0; i < coordinates.length; i++) {
    bounds.extend(new google.maps.LatLng(coordinates[i][0], coordinates[i][1]))
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
  coordinates,
}: Props) {
  // is there region? is there subregion?
  if (label === '') return null

  // catch no data
  if (coordinates.length === 0) return null

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
      const bounds = calculateBounds(coordinates)
      // set map to bounds
      map.fitBounds(bounds) // # auto-zoom
      map.panToBounds(bounds) // # auto-center
    }
  }

  return (
    <div className='map-controles__button-container'>
      <IconPan active={active === type} />
      <button onClick={setMap} className='map-controles__button'>
        {label}
      </button>
    </div>
  )
}

export default MapRegionButton
