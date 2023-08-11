import { useState } from 'react'
import IconFilters from '../svgSnippets/IconFilters'

import PropTypes from 'prop-types'

type Props = {
  children: React.ReactNode
}

function FiltersToggle({ children }: Props): JSX.Element {
  const [toggle, setToggle] = useState(false)
  const buttonClass = toggle
    ? 'filters__toggle-button filters__toggle-button--active'
    : 'filters__toggle-button'
  const toggleClass = toggle
    ? 'filters filters--open'
    : 'filters filters--closed'

  return (
    <>
      <button className={buttonClass} onClick={() => setToggle(!toggle)}>
        <IconFilters />
        <span>filter by</span>
      </button>
      <div className={toggleClass}>{children}</div>
    </>
  )
}

FiltersToggle.protoTypes = {
  children: PropTypes.node.isRequired,
}

export default FiltersToggle
