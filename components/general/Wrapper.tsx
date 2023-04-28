/**
 * Wraps {children} in div.base.base--modifier
 * @param base - the base class
 * @param modifier - modifier of base class: base--modifier
 * @param children
 * @returns JSX.Element <div class="{base} {base}--{modifier}">{props.children}</div>
 */

type WrapperProps = {
  base: string
  modifier: string
  children: React.ReactNode
}

function Wrapper({ base, modifier, children }: WrapperProps) {
  return <div className={`${base} ${base}--${modifier}`}>{children}</div>
}

export default Wrapper
