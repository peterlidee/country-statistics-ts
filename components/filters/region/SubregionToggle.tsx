import { PropsWithChildren, useState } from 'react'
import FilterRow from './FilterRow'

// This function returns a filterblock for a region and optionally subregions
// it contains a custom collapse if there are subregions
// else if will just return a filterrow component

type Props = {
  filterCheckbox: React.ReactNode
  filterCheckboxCount: React.ReactNode
}

function SubregionToggle({
  filterCheckbox,
  filterCheckboxCount,
  children,
}: PropsWithChildren<Props>) {
  // label of name, active, handler, count, children, hasSubfilter
  const [open, setOpen] = useState(false)
  const displayStyle = { display: open ? 'block' : 'none' }

  return (
    <>
      <FilterRow
        filterCheckbox={filterCheckbox}
        filterCheckboxCount={filterCheckboxCount}
      >
        {children && (
          <button
            className='collapse__controller collapse__controller--subfilter'
            onClick={() => setOpen(!open)}
          >
            <span className='collapse__status collapse__status--subfilter'>
              {open ? '-' : '+'}
            </span>
            <span className='collapse__label collapse__label--subfilter'>
              subregions
            </span>
          </button>
        )}
      </FilterRow>
      {children && (
        <div
          className='collapse__content collapse__content--subfilter'
          style={displayStyle}
        >
          {children}
        </div>
      )}
    </>
  )
}

export default SubregionToggle
