import { render } from '@testing-library/react'

import NeighbourComponent from '../NeighbourComponent'
import Sources from '../../../sources/Sources'
import SingleCountryBox from '../../../general/SingleCountryBox'

const ChildMock = jest.fn()
const SourceMock = jest.fn()
jest.mock('../../../sources/Sources')
jest.mock('../../../general/SingleCountryBox')
SingleCountryBox.mockImplementation((props) => props.children)

describe('components/single/neighbours/NeighbourComponent', () => {
  test('It renders with no source', () => {
    Sources.mockImplementation((props) => <>{props.children}</>)
    render(
      <NeighbourComponent>
        <ChildMock />
      </NeighbourComponent>,
    )
    expect(SingleCountryBox).toHaveBeenCalled()
    expect(ChildMock).toHaveBeenCalled()
    expect(Sources).not.toHaveBeenCalled()
    Sources.mockReset()
  })

  test('It renders with source', () => {
    Sources.mockImplementation((props) => (
      <>
        {props.children}
        {props.source}
      </>
    ))
    render(
      <NeighbourComponent source={<SourceMock />}>
        <ChildMock />
      </NeighbourComponent>,
    )
    expect(SingleCountryBox).toHaveBeenCalled()
    expect(Sources).toHaveBeenCalled()
    expect(ChildMock).toHaveBeenCalled()
    expect(SourceMock).toHaveBeenCalled()
  })
})
