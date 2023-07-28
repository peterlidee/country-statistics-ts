import Source from '../sources/Source'
import Sources from '../sources/Sources'

type Props = {
  extraClass?: string
  children: JSX.Element
  error: undefined | Error
  loading: boolean
  endpoint: string
  label: string
}

export default function SingleCountryComponent({
  extraClass = '',
  children,
  error,
  loading,
  endpoint,
  label,
}: Props) {
  return (
    <div className={`single-country__${extraClass}`}>
      <div className='single-country__box'>{children}</div>
      <Sources>
        <Source
          error={error}
          loading={loading}
          endpoint={endpoint}
          label={label}
        />
      </Sources>
    </div>
  )
}
