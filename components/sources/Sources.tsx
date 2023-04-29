type SourcesProps = {
  children: React.ReactNode
}

/**
 * wraps children in container
 * @param { children }
 */

const Sources = ({ children }: SourcesProps) => (
  <div className='source__container'>{children}</div>
)

export default Sources
