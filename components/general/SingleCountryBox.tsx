type Props = {
  children: React.ReactNode
}

// wraps children in div
const SingleCountryBox = ({ children }: Props) => (
  <div className='single-country__box'>{children}</div>
)

export default SingleCountryBox
