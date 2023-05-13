import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useRouter } from 'next/router'
import filterDataMock from '../../../../__mock__/data/filterDataMock'

import NumberFilter from '../../number/NumberFilter'
import validateNumbersAgainstDefaults from '../../../../lib/numberFilter/validateNumbersAgainstDefaults'
import FilterRange from '../../number/FilterRange'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
const mockPush = jest.fn()
jest.mock('../../../../lib/numberFilter/validateNumbersAgainstDefaults')
jest.mock('../../number/FilterRange')

const setupRender = (activeNumbers) => {
  const { rerender } = render(
    <NumberFilter 
      filter={'density'} 
      currFilterData={filterDataMock['density']}
      activeNumbers={{ 
        activeNumberFilters: [],
        currentSelections: {
          density: activeNumbers
        }
      }}/>
  )
  const inputMin = screen.getByRole('spinbutton', { name: 'from' })
  const inputMax = screen.getByRole('spinbutton', { name: 'to' })
  const submitButton = screen.getByRole('button', { name: '>' })
  const clearButton = screen.getByRole('button', { name: 'clear' })
  return {
    rerender, inputMin, inputMax, submitButton, clearButton
  }
}

describe('components/filters/number/NumberFilter', () => {
  
  test('It renders', () => {
    useRouter.mockReturnValue({
      query: { query: { density: '0,400' }},
      push: () => {}
    })
    const { inputMin, inputMax, submitButton, clearButton } = setupRender([0,400])

    expect(FilterRange).toHaveBeenCalledWith(
      expect.objectContaining({
        min: 0,
        max: 400,
        steps: 25,
        sliderSelection: [0,400],
        sliderFinalSelection: [0,400],
      }),
      expect.anything()
    )
    expect(inputMin).toBeInTheDocument()
    expect(inputMin).toHaveValue(0)
    expect(inputMax).toBeInTheDocument()
    expect(inputMax).toHaveValue(400)
    expect(submitButton).toBeInTheDocument()
    expect(clearButton).toBeInTheDocument()
  })

  test('It populates the values from query', () => {
    useRouter.mockReturnValue({
      query: { query: { density: '0,400' }},
      push: () => {}
    })
    const { inputMin, inputMax } = setupRender([100,200])
    expect(inputMin).toHaveValue(100)
    expect(inputMax).toHaveValue(200)
  })

  test('Controls work', async () => {
    useRouter.mockReturnValue({
      query: { density: '0,400' },
      push: mockPush,
    })
    const { inputMin, inputMax, submitButton, clearButton } = setupRender([0,400])
    const User = userEvent.setup()

    // enter a string (number) in from field
    await User.type(inputMin, '100')
    expect(inputMin).toHaveValue(100)
    
    // another number
    await User.clear(inputMin)
    await User.type(inputMin, '200')
    expect(inputMin).toHaveValue(200)
    
    // fails to set negative number
    await User.clear(inputMin)
    await User.type(inputMin, '-200')
    expect(inputMin).not.toHaveValue(-200)
    expect(inputMin).toHaveValue(200)
    
    // on submit, 
    // the values should remain

    validateNumbersAgainstDefaults.mockImplementation((value1, value2, defaults) => [value1, value2])

    await User.clear(inputMin)
    await User.type(inputMin, '100')
    await User.clear(inputMax)
    await User.type(inputMax, '300')
    await User.click(submitButton)
    expect(inputMin).toHaveValue(100)
    expect(inputMax).toHaveValue(300)
    
    // router.push has been called correctly
    expect(mockPush).toHaveBeenLastCalledWith(
      expect.objectContaining({
        query: { density: '100,300' }
      }),
      undefined,
      { shallow: true }
    )

    // FilterInput was called each time with updated values
    // we check the last call
    const filterRangeCalls = FilterRange.mock.calls
    expect(filterRangeCalls[filterRangeCalls.length - 1][0].sliderSelection[0]).toBe(100)
    expect(filterRangeCalls[filterRangeCalls.length - 1][0].sliderSelection[1]).toBe(300)

    // check if clearbutton works
    await User.click(clearButton)
    expect(inputMin).toHaveValue(0)
    expect(inputMax).toHaveValue(400)
    
    // router.push has been called correctly
    expect(mockPush).toHaveBeenLastCalledWith(
      expect.objectContaining({
        query: { density: '0,400' }
      }),
      undefined,
      { shallow: true }
    )
  })
  
  test('UseEffect resets state to default when there is a rerender with an empty query', () => {
    useRouter.mockReturnValue({
      query: { density: '100,400' },
      push: () => {},
    })
    const { rerender, inputMin, inputMax } = setupRender([100,400])
  
    // check first render
    expect(inputMin).toHaveValue(100)
    expect(inputMax).toHaveValue(400)
  
    // make new render with empty query
    useRouter.mockReturnValue({
      query: {},
      push: () => {},
    })
    rerender(<NumberFilter 
      filter={'density'} 
      currFilterData={filterDataMock['density']} 
      activeNumbers={{ 
        activeNumberFilters: [],
        currentSelections: {
          density: [0,400]
        }
      }}/>
    )
    
    // test rerender
    expect(inputMin).toHaveValue(0)
    expect(inputMax).toHaveValue(400)
  
  })

})
