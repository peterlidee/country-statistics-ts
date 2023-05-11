/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import { render } from '@testing-library/react'
import IconLogo from '../IconLogo'
import { colors } from '../../../config/colors'

describe('svgSnippets/IconLogo.js', () => {
  test('It renders', () => {
    const { container } = render(<IconLogo />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  test('It receives the correct colors', () => {
    const { container } = render(<IconLogo />)
    const svg: SVGSVGElement = container.querySelector('svg') as SVGSVGElement
    expect(svg.querySelector('.logo-globe__earth')).toHaveAttribute(
      'fill',
      colors.blue,
    )
    expect(svg.querySelector('.logo-globe__meridians')).toHaveAttribute(
      'stroke',
      colors.white,
    )
    const parallels = svg.querySelectorAll('.logo-globe__parallels')
    expect(parallels).toHaveLength(2)
    for (const parallel of parallels) {
      expect(parallel).toHaveAttribute('fill', colors.white)
    }
    expect(svg.querySelector('.logo__divider')).toHaveAttribute(
      'fill',
      colors.black,
    )
    const graphs = svg.querySelectorAll('.logo__graph')
    expect(graphs).toHaveLength(4)
    for (const graph of graphs) {
      expect(graph).toHaveAttribute('fill', colors.lightGrey)
    }
  })
})
