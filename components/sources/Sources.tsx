import PropTypes from 'prop-types'

type SourcesProps = {
  children: React.ReactNode
}

// wraps children in container
const Sources = ({ children }: SourcesProps) => (
  <div className='source__container'>{children}</div>
)

Sources.propTypes = {
  children: PropTypes.node,
}

export default Sources
