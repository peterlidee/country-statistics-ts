import Link from 'next/link'
import PropTypes from 'prop-types'

type Props = {
  countryName: string
}

const BreadCrumb = ({ countryName }: Props) => (
  <div className='breadcrumb'>
    <Link href='/' className='breadcrumb__home'>
      all countries
    </Link>
    <span className='breadcrumb__divider'>&gt;</span>
    {countryName}
  </div>
)

BreadCrumb.propTypes = {
  countryName: PropTypes.string.isRequired,
}

export default BreadCrumb
