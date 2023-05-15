// the component is useless with SSG
// however, if we ever use fallback true on ssg, it might prove usefull again
// so, we're leaving it in for now

import { SingleCountry } from '@/types/singleCountry'
import React from 'react'

type Props = {
  countryCode: string
  loading: boolean
  error: boolean
  data: SingleCountry
  children: React.ReactNode
}

/**
 * Checks for error or returns child
 * @param props.countryCode - string
 * @param props.loading
 * @param props.error - update to Error is needed, now boolean
 * @param props.data - SingleCountry
 * @param props.children
 * @returns ReactNode
 */

function SingleCountryStatus({
  countryCode,
  loading,
  error,
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
      {error && noData}
      {!loading && !error && !data && noData}
      {children}
    </div>
  )
}

export default SingleCountryStatus
