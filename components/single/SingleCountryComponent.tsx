import SingleCountryBox from '../general/SingleCountryBox'
import Sources from '../sources/Sources'

type Props = {
  extraClass?: string
  children: React.ReactNode
  sources?: JSX.Element[]
}

export default function SingleCountryComponent({
  extraClass = '',
  children,
  sources = [],
}: Props) {
  return (
    <div className={`single-country__${extraClass}`}>
      <SingleCountryBox>{children}</SingleCountryBox>
      {sources.length > 0 && (
        <Sources>{sources.map((source) => source)}</Sources>
      )}
    </div>
  )
}
