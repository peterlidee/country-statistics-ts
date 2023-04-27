/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import { render } from '@testing-library/react'
import IconPan from '../IconPan'

describe.only('svgSnippets/IconPan.js renders', () => {

  test('It renders', () => {
    const { container } = render(<IconPan active />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
  test('It has the correct active class', () => {
    const { container } = render(<IconPan active />)
    expect(container.querySelector('svg')).toHaveClass('icon__pan--active')
  })
  test('It has the correct not active class', () => {
    const { container } = render(<IconPan active={false} />)
    expect(container.querySelector('svg')).not.toHaveClass('icon__pan--active')
  })

})