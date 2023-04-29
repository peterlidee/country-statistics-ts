/**
 * displays count of filtered countries
 * @param props - { count: number }
 * @returns - JSX.Element
 */

type CountryCountProps = {
  count: number
}

function CountryCount({ count }: CountryCountProps) {
  return (
    <div className='country-count'>
      displaying <span className='country-count__number'>{count}</span>{' '}
      {count == 1 ? 'country' : 'countries'}
    </div>
  )
}

export default CountryCount
