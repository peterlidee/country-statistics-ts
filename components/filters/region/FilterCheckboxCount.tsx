type Props = {
  count: number
}

/**
 * print count
 * @param props.count - number
 * @returns JSX.Element
 */

function FilterCheckboxCount({ count }: Props) {
  return (
    <span className='filtercheckbox__count'>
      (<span className='filtercheckbox__count-inner'>{count}</span>)
    </span>
  )
}

export default FilterCheckboxCount
