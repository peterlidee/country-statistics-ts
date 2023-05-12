import { render, screen } from '@testing-library/react'

import Footer from '../Footer'
import IconLogo from '../svgSnippets/IconLogo'
import Wrapper from '../general/Wrapper'

jest.mock('../svgSnippets/IconLogo')
jest.mock('../general/Wrapper', () => {
  return jest.fn((props) => <>{props.children}</>)
})

describe('components/Footer', () => {
  test('It renders', () => {
    render(<Footer />)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      /country statistics/i,
    )
    expect(IconLogo).toHaveBeenCalled()
    expect(Wrapper).toHaveBeenCalledTimes(7)
    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(7)
  })
})
