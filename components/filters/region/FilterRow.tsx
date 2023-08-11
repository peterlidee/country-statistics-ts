// this function returns a filterrow (or a subfilter-row)
// checkbox and label, count and optionally a toggle button for a subfilter
// the optional togglebutton gets passed as props.children

import { PropsWithChildren } from 'react'
import PropTypes from 'prop-types'

type Props = {
  filterCheckbox: React.ReactNode
  filterCheckboxCount: React.ReactNode
}

function FilterRow({
  filterCheckbox,
  filterCheckboxCount,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className='filter__row'>
      {filterCheckbox}
      {filterCheckboxCount}
      {children}
    </div>
  )
}

FilterRow.propTypes = {
  filterCheckbox: PropTypes.node.isRequired,
  filterCheckboxCount: PropTypes.node.isRequired,
  children: PropTypes.node,
}

export default FilterRow
