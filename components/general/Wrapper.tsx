import PropTypes from 'prop-types'

type WrapperProps = {
  base: string
  modifier: string
  children?: React.ReactNode
}

// Wraps {children} in div.base.base--modifier
function Wrapper({ base, modifier, children }: WrapperProps) {
  return <div className={`${base} ${base}--${modifier}`}>{children}</div>
}

Wrapper.propTypes = {
  base: PropTypes.string.isRequired,
  modifier: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Wrapper
