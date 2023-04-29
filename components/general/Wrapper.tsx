/**
 * Wraps {children} in div.base.base--modifier
 * @param props.base - the base class
 * @param props.modifier - modifier of base class: base--modifier
 * @param props.children
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
