import IconPan from '../../svgSnippets/IconPan'
import { Active } from './MapControles'
import { SingleCountryType } from '@/types/singleCountry'

/**
 * render button for capital, on click, make geocode request, zooms and centers map on capital bounds
 * @param props.singleCountry
 * @param props.active - what is map currently zoomed in on, state in MapControles
 * @param props.setActive - setState active
 * @param props.setGeoCodeLoading - MapWidget state, set loading state
 * @param props.setGeoCodeError - MapWidget state, set error state
 * @returns JSX.Elememt
 */

type Props = {
  singleCountry: SingleCountryType
  active: Active
  setActive: React.Dispatch<React.SetStateAction<Active>>
  map: google.maps.Map
  setGeoCodeLoading: React.Dispatch<React.SetStateAction<boolean>>
  setGeoCodeError: React.Dispatch<React.SetStateAction<Error | undefined>>
}

function MapCapitalButton({
  singleCountry,
  active,
  setActive,
  map,
  setGeoCodeLoading,
  setGeoCodeError,
}: Props) {
  const setMap = (bounds: google.maps.LatLngBounds) => {
    // set map to bounds
    map.fitBounds(bounds) // # auto-zoom
    map.panToBounds(bounds) // # auto-center
  }

  const handleButton = () => {
    // set loading true
    setGeoCodeLoading(true)
    // calculate the bounds
    const geoCoder = new google.maps.Geocoder()
    geoCoder.geocode(
      {
        address: `${singleCountry.capital} ${singleCountry.countryName}`,
        region: singleCountry.subregion
          ? singleCountry.subregion
          : singleCountry.region,
      },
      function (results, status) {
        if (status === 'OK') {
          // we have a result
          const bounds = new google.maps.LatLngBounds()
          const viewport = results![0].geometry.viewport
          const ne = new google.maps.LatLng(
            viewport.getNorthEast().lat(),
            viewport.getNorthEast().lng(),
          )
          const sw = new google.maps.LatLng(
            viewport.getSouthWest().lat(),
            viewport.getSouthWest().lng(),
          )
          bounds.extend(ne)
          bounds.extend(sw)

          // set map to bounds
          setMap(bounds)
          // set current active class
          setActive('capital')
          // set loading and error
          setGeoCodeLoading(false)
          setGeoCodeError(undefined)
        } else {
          // handle error
          // set error and loading
          setGeoCodeError(new Error(`No data found: ${status}`))
          setGeoCodeLoading(false)
        }
      },
    )
  }

  return (
    <div className='map-controles__button-container'>
      <IconPan active={active === 'capital'} />
      <button onClick={handleButton} className='map-controles__button'>
        {singleCountry.capital}
      </button>
    </div>
  )
}

export default MapCapitalButton
