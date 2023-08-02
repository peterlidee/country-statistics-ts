import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SingleCountryComponent from '../../SingleCountryComponent'
import Placeholder from '../../../svgSnippets/Placeholder'
import SingleCountryFlags from '../SingleCountryFlags'

jest.mock('../../SingleCountryComponent', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../../../svgSnippets/Placeholder')

describe('components/single/sections/SingleCountryFlags', () => {
  test('It renders placeholder when no flag', () => {
    render(<SingleCountryFlags countryName='Algeria' flag='' coatOfArms='' />)
    expect(SingleCountryComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        extraClass: 'placeholder',
      }),
      expect.anything(),
    )
    expect(Placeholder).toHaveBeenCalled()
  })

  test('It renders with no controles when coatOfArms is empty', () => {
    render(
      <SingleCountryFlags countryName='Algeria' flag='flag' coatOfArms='' />,
    )
    expect(SingleCountryComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        extraClass: 'flags',
      }),
      expect.anything(),
    )
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', 'flag')
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'flag of Algeria')
    expect(screen.queryAllByRole('buttons').length).toBe(0)
  })

  test('It renders with controles when coatOfArms and flag props', () => {
    render(
      <SingleCountryFlags
        countryName='Algeria'
        coatOfArms='coatOfArms'
        flag='flag'
      />,
    )
    expect(SingleCountryComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        extraClass: 'flags',
      }),
      expect.anything(),
    )
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'flag of Algeria')
    expect(screen.getByRole('button', { name: 'flag' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'coat of arms' }),
    ).toBeInTheDocument()
  })

  test('It has correctly working controles', async () => {
    const { rerender } = render(
      <SingleCountryFlags
        countryName='Algeria'
        coatOfArms='coatOfArms'
        flag='flag'
      />,
    )
    const User = userEvent.setup()
    const flagButton = screen.getByRole('button', { name: 'flag' })
    const coatOfArmsButton = screen.getByRole('button', {
      name: 'coat of arms',
    })
    // 'reclick' flag
    await User.click(flagButton)
    expect(flagButton).toHaveClass('flags__controle--active')
    expect(screen.getByRole('img')).toHaveAttribute('src', 'flag')
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'flag of Algeria')

    // click coat of arms
    await User.click(coatOfArmsButton)
    expect(flagButton).not.toHaveClass('flags__controle--active')
    expect(coatOfArmsButton).toHaveClass('flags__controle--active')
    expect(screen.getByRole('img')).toHaveAttribute('src', 'coatOfArms')
    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      'coat of arms of Algeria',
    )

    // some extra clicks
    await User.click(coatOfArmsButton)
    await User.click(flagButton)
    await User.click(flagButton)
    await User.click(coatOfArmsButton)
    await User.click(flagButton)
    expect(flagButton).toHaveClass('flags__controle--active')
    expect(coatOfArmsButton).not.toHaveClass('flags__controle--active')
    expect(screen.getByRole('img')).toHaveAttribute('src', 'flag')
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'flag of Algeria')

    // we need to test if the component behaves correctly when updating the props
    await User.click(coatOfArmsButton)
    rerender(
      <SingleCountryFlags countryName='Belgium' flag='flag2' coatOfArms='' />,
    )
    // no coa passed
    expect(screen.queryAllByRole('button').length).toBe(0)
    expect(screen.getByRole('img')).toHaveAttribute('src', 'flag2')
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'flag of Belgium')
  })
})
