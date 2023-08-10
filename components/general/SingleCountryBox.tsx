import PropTypes from 'prop-types'

type Props = {
  children: React.ReactNode
}

// wraps children in div
const SingleCountryBox = ({ children }: Props) => (
  <div className='single-country__box'>{children}</div>
)

SingleCountryBox.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SingleCountryBox
