import SingleCountryBox from '@/components/general/SingleCountryBox'
import Sources from '../../sources/Sources'

type Props = {
  children: React.ReactNode
  source?: React.ReactNode
}

// renders children and optionally Source inside Sources

const NeighbourComponent = ({ children, source }: Props) => (
  <>
    <SingleCountryBox>
      <div className='single-country__label'>neighbouring countries</div>
      <div className='single-country__value'>{children}</div>
    </SingleCountryBox>
    {source && <Sources>{source}</Sources>}
  </>
)

export default NeighbourComponent
