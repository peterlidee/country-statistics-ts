// a source can have 3 states: error, loading and loaded
// a source can have a link or just a label
// if there's an error, there will also be an error message

type SourceProps = {
  loading: boolean
  error: Error | undefined
  endpoint?: string
  label: string
}

/**
 * constructs a source in three possible states: error, loading or loaded
 * a source can have a link or just a label
 * @param props.loading - boolean, is the @endpoint still loading
 * @param props.error - Error or undefined, @endpoint fetch error
 * @param props.endpoint - string, optional, the url we are fetching
 * @param props.label - string, a label for the @endpoint
 * @returns - JSX. Element
 */

function Source({ loading, error = undefined, endpoint, label }: SourceProps) {
  const status = loading ? 'loading' : error ? 'error' : 'loaded'
  return (
    <div className='source'>
      <div className={`source__icon source__icon--${status}`}></div>
      <div className='source__status'>{status}</div>
      <div>
        {!endpoint && <span className='source__nolink'>{label}</span>}
        {endpoint && (
          <a
            className='source__link'
            href={endpoint}
            target='_blank'
            rel='noreferrer'
          >
            {label}
          </a>
        )}
        {error && error.message && (
          <div className='source__errormessage'>{`[${error.message}]`}</div>
        )}
      </div>
    </div>
  )
}

export default Source
