// a source can have 3 states: error, loading and loaded
// a source can have a link or just a label
// if there's an error, there will also be an error message
// a source can have a type (SSG or CSR)

type SourceProps = {
  loading: boolean
  error: Error | undefined
  endpoint?: string
  label: string
  type: 'API' | 'CSR' | 'SSG'
}

function Source({
  loading,
  error = undefined,
  endpoint,
  label,
  type,
}: SourceProps) {
  const status = loading ? 'loading' : error ? 'error' : 'loaded'
  return (
    <div className='source'>
      <div className={`source__icon source__icon--${status}`}></div>
      <div className='source__status'>{status}</div>
      {type && <div className='source__type'>[{type}]</div>}
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
