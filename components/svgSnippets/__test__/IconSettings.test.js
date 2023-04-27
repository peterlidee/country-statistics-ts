/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

import { render } from '@testing-library/react'
import IconSettings from '../IconSettings'

test('svgSnippets/IconSettings.js renders', () => {
  const { container } = render(<IconSettings />)
  expect(container.querySelector('svg')).toBeInTheDocument()
})