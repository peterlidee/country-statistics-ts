/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import { screen, render } from '@testing-library/react'

import Source from '../Source'

const setupRender = (loading, error, label, endpoint) => {
  const { container } = render(
    <Source
      loading={loading}
      error={error}
      label={label}
      endpoint={endpoint}
    />,
  )
  return {
    icon: container.querySelector('.source__icon'),
    status: container.querySelector('.source__status'),
    nolink: container.querySelector('.source__nolink'),
    link: container.querySelector('.source__link'),
    errorMessage: container.querySelector('.source__errormessage'),
  }
}

describe('components/sources/Source renders', () => {
  test('It renders', () => {
    const { icon } = setupRender(false, undefined, 'label', 'endpoint')
    expect(icon).toBeInTheDocument()
    expect(screen.getByText(/loaded/)).toBeInTheDocument()
    expect(screen.getByText(/label/)).toBeInTheDocument()
  })

  describe('Icon and status elements', () => {
    test('Are correct when loading = false', () => {
      const { icon } = setupRender(false, undefined, 'label', undefined)
      expect(icon).toHaveClass('source__icon--loaded')
      expect(screen.getByText(/loaded/)).toBeInTheDocument()
    })

    test('Are correct when loading = true', () => {
      const { icon } = setupRender(true, undefined, 'label', undefined)
      expect(icon).toHaveClass('source__icon--loading')
      expect(screen.getByText(/loading/)).toBeInTheDocument()
    })

    test('Are correct when error', () => {
      const { icon } = setupRender(
        false,
        new Error('Error'),
        'label',
        undefined,
      )
      expect(icon).toHaveClass('source__icon--error')
      expect(screen.getByText(/error/)).toBeInTheDocument()
    })
  })

  describe('link and nolink elements', () => {
    test('It works correctly with no endpoint', () => {
      const { link, errorMessage } = setupRender(
        false,
        undefined,
        'label',
        undefined,
      )
      expect(link).toBeNull()
      const label = screen.getByText(/label/)
      expect(label).toBeInTheDocument()
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
      expect(errorMessage).toBeNull()
    })

    test('It works correctly with an endpoint', () => {
      const { nolink, errorMessage } = setupRender(
        false,
        undefined,
        'label',
        'url',
      )
      expect(nolink).toBeNull()
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent('label')
      expect(link).toHaveAttribute('href', 'url')
      expect(errorMessage).toBeNull()
    })
  })

  describe('errors', () => {
    test('It shows an error when error.message and nothing else', () => {
      const error = new Error('Error test')
      setupRender(false, error, 'label', undefined)
      expect(screen.getByText(/Error test/)).toBeInTheDocument()
    })

    test('It does not show error when error but no error.message', () => {
      const error = new Error()
      const { errorMessage } = setupRender(false, error, 'label', undefined)
      expect(errorMessage).toBeNull()
    })

    test('It shows no error when there is no error', () => {
      const { errorMessage } = setupRender(false, undefined, 'label', undefined)
      expect(errorMessage).toBeNull()
    })
  })
})
