// display countryName title inside section wrapper

import PropTypes from 'prop-types'

type Props = {
  countryName: string
  children: React.ReactNode
}

const SingleCountryHeader = ({ countryName, children }: Props) => (
  <div className='single-country__header'>
    <h1 className='single-country__title'>{countryName}</h1>
    {children}
  </div>
)

SingleCountryHeader.propTypes = {
  countryName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default SingleCountryHeader
