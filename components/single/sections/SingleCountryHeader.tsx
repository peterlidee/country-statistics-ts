/**
 * display countryName title inside section wrapper
 * @param props.countryName - string
 * @param props.children - ReactNode
 */

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

export default SingleCountryHeader
