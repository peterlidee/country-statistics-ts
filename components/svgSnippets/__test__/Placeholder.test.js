/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import { render } from '@testing-library/react'
import Placeholder from '../Placeholder'

test('svgSnippets/Placeholder.js renders', () => {
  const { container } = render(<Placeholder />)
  expect(container.querySelector('svg')).toBeInTheDocument()
})