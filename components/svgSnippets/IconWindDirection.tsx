type IconWindDirectionProps = {
  deg: number
}

const IconWindDirection = ({ deg }: IconWindDirectionProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='25px'
    height='25px'
    viewBox='0 0 50 50'
    className='icon__winddirection'
    style={{
      transform: `rotate(${deg + 90 + 180}deg)`,
      transformOrigin: 'center',
    }}
  >
    <polygon
      points='25 3 5 47 25 36.94 45 47 25 3'
      className='winddirection__pointer'
    />
  </svg>
)

export default IconWindDirection
