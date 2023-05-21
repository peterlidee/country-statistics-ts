import formatPopulationLabel from '../formatPopulationLabel'
import formatNumber from '../../helpers/formatNumber'

jest.mock('../../helpers/formatNumber')

describe('function formatPopulationLabel', () => {
  test('It formats when it is a number', () => {
    const result = formatPopulationLabel(100)
    expect(formatNumber).toHaveBeenCalled()
  })
  test('It formats when it is a number < 10000', () => {
    const result = formatPopulationLabel(100)
    expect(formatNumber).toHaveBeenCalledWith(100)
  })
  test('It formats when it is a number > 10000', () => {
    const result = formatPopulationLabel(10000)
    expect(formatNumber).toHaveBeenCalledWith(10000)
  })
  test('It simply returns the value when it is no number', () => {
    const result = formatPopulationLabel('foobar')
    expect(result).toBe('foobar')
  })
  test('It rounds the number when number is larger then 10000', () => {
    formatNumber.mockImplementation((val) => val)
    expect(formatPopulationLabel(10400)).toBe('10k')
    expect(formatPopulationLabel(99999)).toBe('100k')
    expect(formatPopulationLabel(104900)).toEqual('105k')
    expect(formatPopulationLabel(55555555)).toBe('55556k')
  })
  test('It expects the last 3 zeros to be replaced with "k" > 10000', () => {
    formatNumber.mockImplementation((val) => val)
    expect(formatPopulationLabel(100000)).toEqual('100k')
    expect(formatPopulationLabel(100000000)).toEqual('100000k')
  })
})
