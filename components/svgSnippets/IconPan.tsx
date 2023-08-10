import PropTypes from 'prop-types'

type IconPanProps = {
  active: boolean
}

const IconPan = ({ active }: IconPanProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      viewBox='0 0 18 18'
      className={active ? 'icon__pan icon__pan--active' : 'icon__pan'}
    >
      <path d='M15,9V5H11V1H9V5H5V9H1v2H5v4H9v4h2V15h4V11h4V9H15Zm-2,4H7V7h6v6Z' />
    </svg>
  )
}

IconPan.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default IconPan
