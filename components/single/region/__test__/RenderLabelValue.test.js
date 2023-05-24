import { screen, render } from '@testing-library/react'
import RenderLabelValue from '../RenderLabelValue'

describe('components/single/region/RenderLabelValue', () => {
  test('It renders', () => {
    render(<RenderLabelValue label='label' value='value' />)
    expect(screen.getByText(/label/i)).toBeInTheDocument()
    expect(screen.getByText(/value/i)).toBeInTheDocument()
  })

  test('It renders with value empty: ""', () => {
    render(<RenderLabelValue loading={false} label='label' value='' />)
    expect(screen.getByText(/label/i)).toBeInTheDocument()
    expect(screen.getByText(/none/i)).toBeInTheDocument()
  })

  test('It rerenders correctly', () => {
    const { rerender } = render(
      <RenderLabelValue label='label' value='first value' />,
    )
    expect(screen.getByText(/label/i)).toBeInTheDocument()
    expect(screen.getByText('first value')).toBeInTheDocument()
    rerender(<RenderLabelValue label='label' value='second value' />)
    expect(screen.getByText('second value')).toBeInTheDocument()
  })
})
