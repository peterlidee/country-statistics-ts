import PropTypes from 'prop-types'

type Props = {
  value: string
  label: string
}

// renders label and value, with empty value option
const RenderLabelValue = ({ value, label }: Props) => (
  <>
    <div className='single-country__label'>{label}</div>
    <div className='single-country__value'>{value === '' ? 'None' : value}</div>
  </>
)

RenderLabelValue.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default RenderLabelValue
