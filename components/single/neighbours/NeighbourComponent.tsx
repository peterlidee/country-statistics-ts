import Sources from '../../sources/Sources'

type Props = {
  children: React.ReactNode
  source?: React.ReactNode
}

/**
 * renders children and optionally Source inside Sources
 * @param props.children
 * @param props.source - Source component
 * @returns ReactNode
 */

const NeighbourComponent = ({ children, source }: Props) => (
  <>
    <div className='single-country__box'>
      <div className='single-country__label'>neighbouring countries</div>
      <div className='single-country__value'>{children}</div>
    </div>
    {source && <Sources>{source}</Sources>}
  </>
)

export default NeighbourComponent
