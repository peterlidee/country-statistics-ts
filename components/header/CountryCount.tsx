import { inconsolata } from '@/fonts/Fonts'
import PropTypes from 'prop-types'

type CountryCountProps = {
  count: number
}

// displays count of filtered countries
function CountryCount({ count }: CountryCountProps) {
  return (
    <div className='country-count'>
      displaying{' '}
      <span className={`country-count__number ${inconsolata.className}`}>
        {count}
      </span>{' '}
      {count == 1 ? 'country' : 'countries'}
    </div>
  )
}

CountryCount.propTypes = {
  count: PropTypes.number.isRequired,
}

export default CountryCount
