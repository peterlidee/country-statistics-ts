import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useRouter } from 'next/router'
import SettingsOptions from '../SettingsOptions'
import getAndValidateHiddenQuery from '../../../lib/settings/getAndValidateHiddenQuery'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))
useRouter.mockReturnValue({ query: {}, push: () => {} })
jest.mock('../../../lib/settings/getAndValidateHiddenQuery')

function setup(activeHidden) {
  getAndValidateHiddenQuery.mockReturnValue(activeHidden)
  render(<SettingsOptions />)
  const checkBoxPopulation = screen.getByRole('checkbox', {
    name: /population/i,
  })
  const checkBoxArea = screen.getByRole('checkbox', { name: /area/i })
  const checkBoxDensity = screen.getByRole('checkbox', { name: /density/i })
  return { checkBoxPopulation, checkBoxArea, checkBoxDensity }
}

describe('components/header/SettingsOptions', () => {
  test('It renders with no activeHidden', () => {
    setup([])
    expect(useRouter).toHaveBeenCalled()
    expect(getAndValidateHiddenQuery).toHaveBeenCalled()
    expect(screen.getByText(/display columns:/i)).toBeInTheDocument()
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3)
    expect(checkboxes[0]).toBeChecked()
    expect(screen.getByText(/population/i)).toBeInTheDocument()
    expect(checkboxes[1]).toBeChecked()
    expect(screen.getByText(/area/i)).toBeInTheDocument()
    expect(checkboxes[2]).toBeChecked()
    expect(screen.getByText(/density/i)).toBeInTheDocument()
  })

  test('It renders with activeHidden population', () => {
    const { checkBoxPopulation, checkBoxArea, checkBoxDensity } = setup([
      'population',
    ])
    expect(checkBoxPopulation).not.toBeChecked()
    expect(checkBoxArea).toBeChecked()
    expect(checkBoxDensity).toBeChecked()
  })

  test('It renders with activeHidden population,area', () => {
    const { checkBoxPopulation, checkBoxArea, checkBoxDensity } = setup([
      'population',
      'area',
    ])
    expect(checkBoxPopulation).not.toBeChecked()
    expect(checkBoxArea).not.toBeChecked()
    expect(checkBoxDensity).toBeChecked()
  })

  test('It renders with activeHidden population,area,density', () => {
    const { checkBoxPopulation, checkBoxArea, checkBoxDensity } = setup([
      'population',
      'area',
      'density',
    ])
    expect(checkBoxPopulation).not.toBeChecked()
    expect(checkBoxArea).not.toBeChecked()
    expect(checkBoxDensity).not.toBeChecked()
  })

  test('It calls router.push with the correct query', async () => {
    const pushMock = jest.fn()
    useRouter.mockReturnValue({ query: { hide: 'population' }, push: pushMock })
    const { checkBoxPopulation, checkBoxArea, checkBoxDensity } = setup([
      'population',
    ])
    const user = userEvent.setup()

    await user.click(checkBoxArea)
    expect(pushMock).toHaveBeenCalledWith(
      expect.objectContaining({
        query: { hide: 'population,area' },
      }),
      undefined,
      { shallow: true },
    )

    await user.click(checkBoxPopulation)
    expect(pushMock).toHaveBeenCalledWith(
      expect.objectContaining({
        query: { hide: '' },
      }),
      undefined,
      { shallow: true },
    )
  })
})
