import { useState } from 'react'
import Wrapper from '../general/Wrapper'

type CollapseProps = {
  children: React.ReactNode
  boldLabel?: boolean
  label: string
  extraClass?: string
}

/**
 * Wraps @children and button into container. Button toggles display none | block on children
 * @param props.children
 * @param props.label - string, button label
 * @param props.boldLabel - boolean, optional, default false, bold button label or not
 * @param props.extraClass - string, optional, default '', extra class for Wrapper component
 * @returns
 */

function Collapse({
  children,
  boldLabel = false,
  label,
  extraClass = '',
}: CollapseProps) {
  const [open, setOpen] = useState(false)
  const displayStyle = { display: open ? 'block' : 'none' }
  const labelStyle = boldLabel ? { fontWeight: 700 } : {}
  return (
    <Wrapper base='collapse' modifier={extraClass}>
      <button className='collapse__controller' onClick={() => setOpen(!open)}>
        <span className='collapse__status'>{open ? '-' : '+'}</span>
        <span className='collapse__label' style={labelStyle}>
          {label}
        </span>
      </button>
      <div className='collapse__content' style={displayStyle}>
        {children}
      </div>
    </Wrapper>
  )
}

export default Collapse
