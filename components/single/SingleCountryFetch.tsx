import useFetch from 'react-fetch-hook'
import Sources from '../sources/Sources'
import Source from '../sources/Source'

type Props = {
  endpoint: string
  type?: undefined | 'population'
  extraClass: string
  label: string
  children: (
    // = render props
    isLoading: boolean,
    error: undefined | Error,
    data: unknown,
  ) => React.ReactNode
}

/**
 * Takes endpoint, handles error, data and loading state and returns them in render props (children)
 * @param props.endpoint - string
 * @param props.label - string, label for source
 * @param props.type - optional, need for population widget error handling
 * @param props.extraClass - optional, string
 * @param props.children - render prop, function!!
 * @returns
 */

function SingleCountryFetch({
  endpoint,
  label,
  type = undefined,
  extraClass = '',
  children,
}: Props) {
  const { isLoading, error, data } = useFetch(endpoint)

  // for the world bank api, we add an extra error detection
  // because some invalid request will return a valid response
  // https://datahelpdesk.worldbank.org/knowledgebase/articles/898620-api-error-codes
  // also, we want to consider no data an error also

  let extraError: Error | undefined = undefined

  if (type === 'population' && data && !isLoading && !error) {
    if (Array.isArray(data)) {
      // data is an array
      // if first item in array has message prop, there is an error
      if (data[0]?.message) {
        extraError = new Error(data[0].message[0].value)
      }

      // check for empty results (total = 0)
      if (data[0]?.total === 0) {
        extraError = new Error('No data for this country.')
      }
    } else {
      // data is not an array
      extraError = new Error('No data for this country.')
    }
  }

  return (
    <div className={`single-country__${extraClass}`}>
      <div className='single-country__box'>
        {children(isLoading, error, data)}
      </div>
      <Sources>
        <Source
          error={error || extraError}
          loading={isLoading}
          endpoint={endpoint}
          label={label}
        />
      </Sources>
    </div>
  )
}

export default SingleCountryFetch
