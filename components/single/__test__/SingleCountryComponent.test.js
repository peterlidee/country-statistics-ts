import { render } from '@testing-library/react'

import SingleCountryComponent from '../SingleCountryComponent'
import Sources from '../../sources/Sources'
import Source from '../../sources/Source'

jest.mock('../../sources/Sources')
Sources.mockImplementation((props) => props.children)
jest.mock('../../sources/Source')
const ChildMock = jest.fn()

function setup(
  extraClass = 'extraClass',
  error = 'error',
  loading = false,
  endpoint = 'url',
  label = 'label',
) {
  const { container } = render(
    <SingleCountryComponent
      extraClass={extraClass}
      error={error}
      loading={loading}
      endpoint={endpoint}
      label={label}
    >
      <ChildMock />
    </SingleCountryComponent>,
  )
  return { container }
}

describe('componentssingleSingleCountryComponent', () => {
  test('It renders', () => {
    setup()
    expect(ChildMock).toHaveBeenCalled()
    expect(Sources).toHaveBeenCalled()
    expect(Source).toHaveBeenCalled()
  })

  test('It does not add an extra class', () => {
    const { container } = setup('')
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const divs = container.querySelector('.single-country__')
    expect(divs).toBeInTheDocument()
  })

  test('It adds an extra class', () => {
    const { container } = setup('foobar')
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const divs = container.querySelector('.single-country__foobar')
    expect(divs).toBeInTheDocument()
  })

  test('It calls Source mock with the correct props', () => {
    setup()
    expect(Source).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'error',
        loading: false,
        endpoint: 'url',
        label: 'label',
      }),
      expect.anything(),
    )
  })
})
