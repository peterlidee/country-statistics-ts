/**
 * renders label and value, with empty value option
 * @param props.value
 * @param props.label
 * @returns React.ReactNode
 */

type Props = {
  value: string
  label: string
}

const RenderLabelValue = ({ value, label }: Props) => (
  <>
    <div className='single-country__label'>{label}</div>
    <div className='single-country__value'>{value === '' ? 'None' : value}</div>
  </>
)

export default RenderLabelValue
