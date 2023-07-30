import Sources from '../sources/Sources'

type Props = {
  extraClass?: string
  children: JSX.Element
  sources?: JSX.Element[]
}

export default function SingleCountryComponent({
  extraClass = '',
  children,
  sources = [],
}: Props) {
  return (
    <div className={`single-country__${extraClass}`}>
      <div className='single-country__box'>{children}</div>
      {sources.length > 0 && (
        <Sources>{sources.map((source) => source)}</Sources>
      )}
    </div>
  )
}
