/**
 * Creates wrapper with customizable class name
 * @param name - string, class element
 * @param children
 * @returns JSX.Element
 */

type BoxWrapperProps = {
  name: string
  children: React.ReactNode
}

const BoxWrapper = ({ name, children }: BoxWrapperProps) => (
  <div className={`single-country__${name}`}>
    <div className='single-country__box'>{children}</div>
  </div>
)

export default BoxWrapper
