import { render } from '@testing-library/react'

import FilterRange from '../../number/FilterRange'
import { Range } from 'react-range'

jest.mock('react-range')

describe('components/filters/number/FilterRange', () => {
  test('It renders', () => {
    render(<FilterRange 
      min={0}
      max={100}
      steps={10}
      sliderSelection={[0,100]} 
      handleSliderSelection={() => {}}
      sliderFinalSelection={[0,100]} 
      handleSliderFinalSelection={() => {}} />
    )
    expect(Range).toHaveBeenCalled()
    // not sure how to test the rest ...
  })
})