type Props = {
  count: number
}
import PropTypes from 'prop-types'

// print count
function FilterCheckboxCount({ count }: Props) {
  return (
    <span className='filtercheckbox__count'>
      (<span className='filtercheckbox__count-inner'>{count}</span>)
    </span>
  )
}

FilterCheckboxCount.propTypes = {
  count: PropTypes.number.isRequired,
}

export default FilterCheckboxCount
