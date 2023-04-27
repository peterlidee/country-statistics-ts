/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import { render } from '@testing-library/react'
import IconSort, { calculateTriangleClass } from '../IconSort'

test('function calculateTriangleClass', () => {
  expect(calculateTriangleClass('upper', false, false)).toBe('')
  expect(calculateTriangleClass('upper', false, true)).toBe('')
  expect(calculateTriangleClass('lower', false, false)).toBe('')
  expect(calculateTriangleClass('lower', false, true)).toBe('')
  expect(calculateTriangleClass('upper', true, true)).toBe('active')
  expect(calculateTriangleClass('upper', true, false)).toBe('')
  expect(calculateTriangleClass('lower', true, true)).toBe('')
  expect(calculateTriangleClass('lower', true, false)).toBe('active')
})

describe('svgSnippets/IconSort.js', () => {
  test('It renders', () => {
    const { container } = render(<IconSort triangle="upper" sortActive={false} sortAsc={false} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})