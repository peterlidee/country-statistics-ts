import { colors } from '../../config/colors'

function IconLogo() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 100 90'
      width='50'
      height='40'
      className='icon__logo'
    >
      <g className='logo-globe'>
        <path
          d='M40,90.92a40,40,0,1,1,0-80v80Z'
          transform='translate(0 -5)'
          fill={colors.blue}
          className='logo-globe__earth'
        />
        <path
          d='M41,90.92c-11,0-21-17.91-21-40s10-40,21-40'
          transform='translate(0 -5)'
          fill='none'
          stroke={colors.white}
          strokeMiterlimit='10'
          strokeWidth='4'
          className='logo-globe__meridians'
        />
        <rect
          y='31'
          width='42'
          height='4'
          fill={colors.white}
          className='logo-globe__parallels'
        />
        <rect
          y='55'
          width='42'
          height='4'
          fill={colors.white}
          className='logo-globe__parallels'
        />
      </g>
      <rect
        x='44'
        width='8'
        height='90'
        fill={colors.black}
        className='logo__divider'
      />
      <rect
        x='56'
        y='23'
        width='36'
        height='8'
        fill={colors.lightGrey}
        className='logo__graph'
      />
      <rect
        x='56'
        y='35'
        width='44'
        height='8'
        fill={colors.lightGrey}
        className='logo__graph'
      />
      <rect
        x='56'
        y='47'
        width='30'
        height='8'
        fill={colors.lightGrey}
        className='logo__graph'
      />
      <rect
        x='56'
        y='59'
        width='37'
        height='8'
        fill={colors.lightGrey}
        className='logo__graph'
      />
    </svg>
  )
}

export default IconLogo
