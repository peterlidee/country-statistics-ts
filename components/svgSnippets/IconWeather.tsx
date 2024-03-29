import PropTypes from 'prop-types'

// https://www.flaticon.com/free-icon/black-cloud_33486
// https://www.flaticon.com/free-icon/snowflake_642000
// https://www.flaticon.com/free-icon/flash_252851
// https://www.flaticon.com/free-icon/settings_23408

type IconWeatherProps = {
  type: string
}

const IconWeather = ({ type }: IconWeatherProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 90 90'
    width='90'
    height='90'
    className='icon__weather'
  >
    {type === 'clear' && <circle cx='45' cy='40' r='40' className='sun' />}

    {type === 'few' && (
      <g className='few'>
        <circle cx='38' cy='36' r='32' className='sun' />
        <path
          className='cloud1'
          d='M34,81H67.8a16.2,16.2,0,1,0,0-32.4h-1a16.19,16.19,0,0,0-32.1,3v0.7h0A14.3,14.3,0,0,0,20.4,66.6,14.46,14.46,0,0,0,34,81Z'
        />
      </g>
    )}

    {type === 'scat' && (
      <g className='scat'>
        <path
          className='cloud1'
          d='M19.1,75H67c12.7,0,23-9.6,23-21.3S79.8,32.3,67.1,32.3a5.28,5.28,0,0,0-1.3.1C63.8,22.5,54.5,15,43.2,15c-12.6,0-22.9,9.6-22.9,21.3v0.9h0C9.1,37.2,0,45.6,0,56.1,0,66.2,8.5,74.4,19.1,75Z'
          transform='translate(0 -5)'
        />
      </g>
    )}

    {type === 'broken' && (
      <g className='broken'>
        <path
          className='cloud1'
          d='M20.1,70H62.6C73.9,70,83,60.4,83,48.7S73.9,27.4,62.6,27.4a4.87,4.87,0,0,0-1.2.1c-1.8-10-10-17.4-20-17.4C30.2,10.1,21,19.7,21,31.4v1h0c-9.9-.2-18,8.3-18,18.7C3,61.2,10.6,69.4,20.1,70Z'
        />
        <path
          className='cloud2'
          d='M87,66.35a15.83,15.83,0,0,0-15.8-15.8h0v-0.8a17.8,17.8,0,0,0-35.3-3.3,4.1,4.1,0,0,0-1.1-.1,17.85,17.85,0,0,0,0,35.7H72.3A15.6,15.6,0,0,0,87,66.35Z'
        />
      </g>
    )}

    {type === 'shower' && (
      <g className='shower'>
        <path
          className='cloud1'
          d='M19.9,55.4H55.3c9.4,0,17-7.1,17-15.9s-7.6-15.9-17-15.9a3.4,3.4,0,0,0-1,.1c-1.5-7.4-8.4-13-16.7-13-9.4,0-17,7.1-17,15.9v0.7h0c-8.3-.1-15.1,6.3-15.1,14.1C5.7,48.8,12,55,19.9,55.4Z'
        />
        <path
          className='cloud2'
          d='M85,47.1c0-6.6-6.1-12-13.5-12h0V34.5C71.5,27,64.7,21,56.2,21c-7.5,0-13.7,4.8-15,11H40.3C31.9,32,25,38,25,45.5S31.9,59,40.3,59H72.4C79.4,58.6,85.2,53.4,85,47.1Z'
        />
        <g className='raindrops'>
          <line
            x1='47'
            y1='51'
            x2='31'
            y2='70'
            fill='none'
            strokeLinecap='round'
            strokeMiterlimit='10'
            strokeWidth='3'
          />
          <line
            x1='57'
            y1='51'
            x2='41'
            y2='70'
            fill='none'
            strokeLinecap='round'
            strokeMiterlimit='10'
            strokeWidth='3'
          />
          <line
            x1='67'
            y1='51'
            x2='51'
            y2='70'
            fill='none'
            strokeLinecap='round'
            strokeMiterlimit='10'
            strokeWidth='3'
          />
          <line
            x1='27'
            y1='51'
            x2='11'
            y2='70'
            fill='none'
            strokeLinecap='round'
            strokeMiterlimit='10'
            strokeWidth='3'
          />
          <line
            x1='37'
            y1='51'
            x2='21'
            y2='70'
            fill='none'
            strokeLinecap='round'
            strokeMiterlimit='10'
            strokeWidth='3'
          />
        </g>
      </g>
    )}

    {type === 'rain' && (
      <g className='rain'>
        <path
          className='cloud1'
          d='M19.9,55.4H55.3c9.4,0,17-7.1,17-15.9s-7.6-15.9-17-15.9a3.4,3.4,0,0,0-1,.1c-1.5-7.4-8.4-13-16.7-13-9.4,0-17,7.1-17,15.9v0.7h0c-8.3-.1-15.1,6.3-15.1,14.1C5.7,48.8,12,55,19.9,55.4Z'
        />
        <path
          className='cloud2'
          d='M85,47.1c0-6.6-6.1-12-13.5-12h0V34.5C71.5,27,64.7,21,56.2,21c-7.5,0-13.7,4.8-15,11H40.3C31.9,32,25,38,25,45.5S31.9,59,40.3,59H72.4C79.4,58.6,85.2,53.4,85,47.1Z'
        />
        <g className='raindrops'>
          <line
            x1='42'
            y1='52'
            x2='26'
            y2='70'
            fill='none'
            strokeLinecap='round'
            strokeMiterlimit='10'
            strokeWidth='3'
          />
          <line
            x1='56'
            y1='52'
            x2='40'
            y2='70'
            fill='none'
            strokeLinecap='round'
            strokeMiterlimit='10'
            strokeWidth='3'
          />
          <line
            x1='28'
            y1='52'
            x2='12'
            y2='70'
            fill='none'
            strokeLinecap='round'
            strokeMiterlimit='10'
            strokeWidth='3'
          />
        </g>
      </g>
    )}

    {type === 'mist' && (
      <g className='mist'>
        <line
          x1='7'
          y1='20'
          x2='62'
          y2='20'
          fill='none'
          strokeLinecap='round'
          strokeMiterlimit='10'
          strokeWidth='5'
        />
        <line
          x1='25'
          y1='30'
          x2='85'
          y2='30'
          fill='none'
          strokeLinecap='round'
          strokeMiterlimit='10'
          strokeWidth='5'
        />
        <line
          x1='20'
          y1='50'
          x2='80'
          y2='50'
          fill='none'
          strokeLinecap='round'
          strokeMiterlimit='10'
          strokeWidth='5'
        />
        <line
          x1='10'
          y1='40'
          x2='70'
          y2='40'
          fill='none'
          strokeLinecap='round'
          strokeMiterlimit='10'
          strokeWidth='5'
        />
        <line
          x1='15'
          y1='60'
          x2='55'
          y2='60'
          fill='none'
          strokeLinecap='round'
          strokeMiterlimit='10'
          strokeWidth='5'
        />
      </g>
    )}

    {type === 'snow' && (
      <path
        className='snow'
        d='M80,45.2a1.84,1.84,0,0,0-1.9-1.9H75.2l2.7-2.7A1.84,1.84,0,0,0,75.3,38l-5.4,5.4H67.2l2.7-2.7a1.84,1.84,0,0,0-2.6-2.6L62,43.3H49.5l9-9h7.6a1.9,1.9,0,1,0,0-3.8h-4L64,28.6h7.6a1.9,1.9,0,1,0,0-3.8H67.7l2-2a1.84,1.84,0,1,0-2.6-2.6l-2,2V18.3a1.9,1.9,0,0,0-3.8,0v7.6l-1.9,1.9V23.9a1.9,1.9,0,0,0-3.8,0v7.6l-9,9V27.9L52,22.5a1.84,1.84,0,0,0-2.6-2.6l-2.7,2.7V20l5.4-5.4A1.84,1.84,0,0,0,49.5,12l-2.9,2.8V11.9a1.9,1.9,0,0,0-3.8,0v2.9l-2.7-2.7a1.84,1.84,0,0,0-2.6,2.6l5.4,5.4v2.7l-2.7-2.7a1.84,1.84,0,1,0-2.6,2.6L43,28.1V40.9l-9-9V24.3a1.84,1.84,0,0,0-1.9-1.9,1.82,1.82,0,0,0-1.9,1.8v3.9l-1.9-1.9V18.6a1.84,1.84,0,0,0-1.9-1.9c-1.1,0-1.4.7-1.4,1.7v3.9l-2-2a1.84,1.84,0,0,0-2.6,2.6l2,2H18.5a1.9,1.9,0,1,0,0,3.8h7.6L28,30.6H24.1a1.9,1.9,0,0,0,0,3.8h7.6l9,9H27.9L22.5,38a1.84,1.84,0,0,0-2.6,2.6l2.7,2.7H19.9l-5.4-5.4a1.84,1.84,0,0,0-2.6,2.6l2.7,2.7H11.8a1.9,1.9,0,0,0,0,3.8h2.9L12,49.7a1.87,1.87,0,0,0,0,2.6,1.71,1.71,0,0,0,2.6,0L20,46.9h2.7L20,49.6a1.87,1.87,0,0,0,0,2.6,1.71,1.71,0,0,0,2.6,0L28,46.8H40.7l-9,9H24.1a1.9,1.9,0,0,0,0,3.8H28l-1.9,1.9H18.5a1.9,1.9,0,0,0,0,3.8h3.9l-2,2a1.87,1.87,0,0,0,0,2.6,1.71,1.71,0,0,0,2.6,0l2-2v3.9a1.9,1.9,0,1,0,3.8,0V64.2l1.9-1.9v3.9a1.9,1.9,0,0,0,3.8,0V58.6l9-9V62.4l-5.4,5.4a1.84,1.84,0,0,0,2.6,2.6l2.7-2.7v2.7L38,75.8a1.87,1.87,0,0,0,0,2.6,1.71,1.71,0,0,0,2.6,0l2.7-2.7v2.9a1.9,1.9,0,1,0,3.8,0V75.7l2.7,2.7a1.84,1.84,0,0,0,2.6-2.6L47,70.4V68.1l2.7,2.7a1.71,1.71,0,0,0,2.6,0,1.87,1.87,0,0,0,0-2.6l-5.4-5.4V49.5l9,9v7.6a1.9,1.9,0,1,0,3.8,0V62.2l1.9,1.9v7.6a1.9,1.9,0,0,0,3.8,0V67.8l2,2a1.71,1.71,0,0,0,2.6,0,1.87,1.87,0,0,0,0-2.6l-1.8-2.1h3.9a1.9,1.9,0,1,0,0-3.8H64l-1.9-1.8H66a1.84,1.84,0,0,0,1.9-1.9A1.66,1.66,0,0,0,66,56H58.4l-9-9H62.1l5.4,5.4a1.71,1.71,0,0,0,2.6,0,1.87,1.87,0,0,0,0-2.6l-2.7-2.7h2.7l5.4,5.4a1.71,1.71,0,0,0,2.6,0,1.87,1.87,0,0,0,0-2.6l-2.7-2.7h2.9A2.34,2.34,0,0,0,80,45.2Z'
      />
    )}

    {type === 'thunder' && (
      <g id='thunder'>
        <path
          className='cloud1'
          d='M19.9,55.4H55.3c9.4,0,17-7.1,17-15.9s-7.6-15.9-17-15.9a3.4,3.4,0,0,0-1,.1c-1.5-7.4-8.4-13-16.7-13-9.4,0-17,7.1-17,15.9v0.7h0c-8.3-.1-15.1,6.3-15.1,14.1C5.7,48.8,12,55,19.9,55.4Z'
        />
        <path
          className='cloud2'
          d='M85,47.1c0-6.6-6.1-12-13.5-12h0V34.5C71.5,27,64.7,21,56.2,21c-7.5,0-13.7,4.8-15,11H40.3C31.9,32,25,38,25,45.5S31.9,59,40.3,59H72.4C79.4,58.6,85.2,53.4,85,47.1Z'
        />
        <path
          className='lightning'
          d='M59.92,55.15a0.89,0.89,0,0,0-.8-0.48H48.66L59,39.28a0.79,0.79,0,0,0,0-.85A0.89,0.89,0,0,0,58.24,38H44.12a0.89,0.89,0,0,0-.79.46l-13.24,25a0.79,0.79,0,0,0,0,.81,0.9,0.9,0,0,0,.75.4H40L30.07,86.84a0.81,0.81,0,0,0,.35,1,0.92,0.92,0,0,0,.46.12,0.91,0.91,0,0,0,.68-0.3L59.79,56A0.8,0.8,0,0,0,59.92,55.15Z'
        />
      </g>
    )}
  </svg>
)

IconWeather.propTypes = {
  type: PropTypes.string.isRequired,
}

export default IconWeather
