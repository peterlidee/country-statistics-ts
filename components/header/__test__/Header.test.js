import { render, screen } from '@testing-library/react'

import Header from '../Header'
import IconLogo from '../../svgSnippets/IconLogo'
import SettingsToggle from '../SettingsToggle'
import SettingsOptions from '../SettingsOptions'

jest.mock('../../svgSnippets/IconLogo')
jest.mock('../SettingsToggle', () => {
  return jest.fn((props) => props.children)
})
jest.mock('../SettingsOptions')

describe('components/header/Header', () => {
  test('It renders', () => {
    render(<Header />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /country statistics/i }),
    ).toBeInTheDocument()
    expect(IconLogo).toHaveBeenCalled()
    expect(SettingsToggle).not.toHaveBeenCalled()
    expect(SettingsOptions).not.toHaveBeenCalled()
  })

  test('It does not render settings mocks when home prop false', () => {
    render(<Header home={false} />)
    expect(SettingsToggle).not.toHaveBeenCalled()
    expect(SettingsOptions).not.toHaveBeenCalled()
  })

  test('It renders settings mocks when home prop true', () => {
    render(<Header home={true} />)
    expect(SettingsToggle).toHaveBeenCalled()
    expect(SettingsOptions).toHaveBeenCalled()
  })
})
