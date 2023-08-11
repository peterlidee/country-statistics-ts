import SingleCountryBox from '../general/SingleCountryBox'
import Sources from '../sources/Sources'

import PropTypes from 'prop-types'

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

SingleCountryComponent.propTypes = {
  extraClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  sources: PropTypes.arrayOf(PropTypes.element),
}
