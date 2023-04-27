/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render } from '@testing-library/react'
import IconFilters from '../IconFilters'

test('svgSnippets/IconFilters.js renders', () => {
  const { container } = render(<IconFilters />)
  expect(container.querySelector('svg')).toBeInTheDocument()
})