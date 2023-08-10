import PropTypes from 'prop-types'

type IconSortProps = {
  sortActive: boolean
  sortAsc: boolean
}

export function calculateTriangleClass(
  triangle: 'upper' | 'lower',
  sortActive: IconSortProps['sortActive'],
  sortAsc: IconSortProps['sortAsc'],
): string {
  if (sortActive) {
    if (triangle == 'upper') {
      return sortAsc ? 'active' : ''
    } else {
      // lower
      return sortAsc ? '' : 'active'
    }
  }
  return ''
}

function IconSort({ sortActive, sortAsc }: IconSortProps) {
  const upperTriangleClass = calculateTriangleClass(
    'upper',
    sortActive,
    sortAsc,
  )
  const lowerTriangleClass = calculateTriangleClass(
    'lower',
    sortActive,
    sortAsc,
  )

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className='icon__sort'
    >
      <polygon
        points='12,2 20,12 4,12'
        className={`icon__sort--upper icon__sort--upper--${upperTriangleClass}`}
      />
      <polygon
        points='20,14 4,14 12,24'
        className={`icon__sort--lower icon__sort--upper--${lowerTriangleClass}`}
      />
    </svg>
  )
}

IconSort.propTypes = {
  sortActive: PropTypes.bool.isRequired,
  sortAsc: PropTypes.bool.isRequired,
}

export default IconSort
