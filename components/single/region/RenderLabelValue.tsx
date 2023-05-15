/**
 * renders label and value, with loading and no value options
 * value is garantueed but might be empty
 * @param props.loading
 * @param props.value
 * @param props.label
 * @returns React.ReactNode
 */

type Props = {
  loading: boolean
  value: string
  label: string
}

const RenderLabelValue = ({ loading, value, label }: Props) => (
  <>
    <div className='single-country__label'>{label}</div>
    <div className='single-country__value'>
      {loading && '...'}
      {!loading && value === '' && 'No data'}
      {!loading && value}
    </div>
  </>
)

export default RenderLabelValue
