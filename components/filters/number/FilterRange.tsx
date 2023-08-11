import { Range, getTrackBackground } from 'react-range'
import { colors } from '../../../config/colors'
import PropTypes from 'prop-types'

type Props = {
  min: number
  max: number
  steps: number
  sliderSelection: [number, number]
  handleSliderSelection: (values: [number, number]) => void
  sliderFinalSelection: [number, number]
  handleSliderFinalSelection: (values: [number, number]) => void
}

function FilterRange({
  min,
  max,
  steps,
  sliderSelection,
  handleSliderSelection,
  sliderFinalSelection,
  handleSliderFinalSelection,
}: Props) {
  const sliderMin = min
  const sliderMax = max
  const values = sliderSelection
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingRight: '15px',
        paddingLeft: '15px',
        marginTop: '15px',
        marginBottom: '5px',
      }}
    >
      <Range
        values={values}
        step={steps}
        min={sliderMin}
        max={sliderMax}
        onChange={(values) => handleSliderSelection(values as [number, number])}
        onFinalChange={(values) =>
          handleSliderFinalSelection(values as [number, number])
        }
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '32px',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: [colors.lightGrey, colors.blue, colors.lightGrey],
                  min: sliderMin,
                  max: sliderMax,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '30px',
              width: '30px',
              borderRadius: '50%',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA',
            }}
          >
            <div
              style={{
                height: '8px',
                width: '8px',
                borderRadius: '50%',
                backgroundColor: isDragged ? colors.blue : colors.lightGrey,
              }}
            />
          </div>
        )}
      />
    </div>
  )
}

FilterRange.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  steps: PropTypes.number.isRequired,
  sliderSelection: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleSliderSelection: PropTypes.func.isRequired,
  sliderFinalSelection: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleSliderFinalSelection: PropTypes.func.isRequired,
}

export default FilterRange
