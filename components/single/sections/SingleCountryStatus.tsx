// the component is useless with SSG
// however, if we ever use fallback true on ssg, it might prove usefull again
// so, we're leaving it in for now

import { SingleCountryType } from '@/types/singleCountry'
import React from 'react'

import PropTypes from 'prop-types'
import { singleCountryPropTypes } from '@/propTypes/singleCountryPropTypes'

type Props = {
  countryCode: string
  loading: boolean
  isError: boolean
  data?: SingleCountryType
  children: React.ReactNode
}

// Checks for error or returns child
function SingleCountryStatus({
  countryCode,
  loading,
  isError,
  data,
  children,
}: Props) {
  const noData = (
    <div className='error-message' style={{ marginBottom: '1em' }}>
      No data found for {countryCode}
    </div>
  )
  return (
    <div className='single-country__status'>
      {isError && noData}
      {!loading && !isError && !data && noData}
      {children}
    </div>
  )
}

SingleCountryStatus.propTypes = {
  countryCode: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  data: singleCountryPropTypes,
  children: PropTypes.node.isRequired,
}

export default SingleCountryStatus
