import formatPopulationLabel from '../formatPopulationLabel'

describe('function formatPopulationLabel', () => {
  test('It simply formats numbers <= 10000', () => {
    expect(formatPopulationLabel(100)).toEqual("100")
    expect(formatPopulationLabel(1000)).toEqual("1.000")
    expect(formatPopulationLabel(10000)).toEqual("10.000")
  })
  test('It rounds the number > 10000', () => {
    expect(formatPopulationLabel(99999)).toEqual("100k")
    expect(formatPopulationLabel(104900)).toEqual("105k")
  })
  test('It formats the number > 10000', () => {
    expect(formatPopulationLabel(10001)).toEqual('10k')
    expect(formatPopulationLabel(1000000)).toEqual('1.000k')
  })
  test('It expects the last 3 zeros to be replaced with "k" > 10000', () => {
    expect(formatPopulationLabel(100000)).toEqual('100k')
  })
})