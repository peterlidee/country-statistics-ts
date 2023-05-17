import useFetch from 'react-fetch-hook'

/**
 * this function calls useFetch to get all the countries latlng in a (sub)region
 * @param props
 * @returns it returns isLoading, error, data and endpoint as function prop
 */

// 1.
// to render MapRegionButton, we need bounds
// however, the <Source> of <MapWidget>, also needs access to endpoint, isLoading and error
// therefore, we use them in SingleCountryMap, the parent of <MapWidget>

// 2.
// also, not all countries have a subregion, so we have to call the useFetch hook conditionally
// if there is a subregion, make a fetch
// you can run functions conditionally but not hooks,
// so we created this function just for that

type Props = {
  type: string
  label: string
  children: (key: {
    isLoading: boolean
    error: undefined | useFetch.UseFetchError
    data: unknown
    endpoint: string
  }) => JSX.Element
}

function FetchRegionCountries({ type, label, children }: Props) {
  const endpoint = `https://restcountries.com/v3.1/${type}/${encodeURIComponent(
    label,
  )}?fields=latlng`
  const { isLoading, error, data } = useFetch(endpoint)
  return children({ isLoading, error, data, endpoint })
}

export default FetchRegionCountries
