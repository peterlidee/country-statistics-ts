type Props = {
  count: number
}
import { inconsolata } from '@/fonts/Fonts'
import PropTypes from 'prop-types'

// print count
function FilterCheckboxCount({ count }: Props) {
  return (
    <span className='filtercheckbox__count'>
      (<span className={inconsolata.className}>{count}</span>)
    </span>
  )
}

FilterCheckboxCount.propTypes = {
  count: PropTypes.number.isRequired,
}

export default FilterCheckboxCount
