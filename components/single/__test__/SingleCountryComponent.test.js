import { render } from '@testing-library/react'

import SingleCountryComponent from '../SingleCountryComponent'
import SingleCountryBox from '../../general/SingleCountryBox'
import Sources from '../../sources/Sources'

jest.mock('../../general/SingleCountryBox')
SingleCountryBox.mockImplementation((props) => props.children)
jest.mock('../../sources/Sources')
Sources.mockImplementation((props) => (
  <>
    {props.children}
    {props.sources}
  </>
))
const ChildMock = jest.fn()
const SourceMock = jest.fn()

function setup(extraClass = 'extraClass', sources = undefined) {
  const { container } = render(
    <SingleCountryComponent extraClass={extraClass} sources={sources}>
      <ChildMock />
    </SingleCountryComponent>,
  )
  return { container }
}

describe('componentssingleSingleCountryComponent', () => {
  test('It renders', () => {
    setup('', [<SourceMock key={'mock1'} />])
    expect(SingleCountryBox).toHaveBeenCalled()
    expect(ChildMock).toHaveBeenCalled()
    expect(Sources).toHaveBeenCalled()
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

  test('It does not render Sources mock when sources props is empty', () => {
    setup()
    expect(Sources).not.toHaveBeenCalled()
  })

  test('It does not render Sources mock when sources props is []', () => {
    setup('', [])
    expect(Sources).not.toHaveBeenCalled()
  })

  test('It render Sources mock when sources props has one element', () => {
    setup('', [<SourceMock key='mock1' />])
    expect(Sources).toHaveBeenCalled()
  })

  test('It render Sources mock when sources props has multiple elements', () => {
    setup('', [<SourceMock key='mock1' />, <SourceMock key='mock2' />])
    expect(Sources).toHaveBeenCalled()
  })

  test('It renders SourceMock once when sources props has one element', () => {
    setup('', [<SourceMock key='mock1' />])
    expect(SourceMock).toHaveBeenCalledTimes(1)
  })

  test('It renders SourceMock 2 times when sources props has 2 elements', () => {
    setup('', [<SourceMock key='mock1' />, <SourceMock key='mock2' />])
    expect(SourceMock).toHaveBeenCalledTimes(2)
  })
})
