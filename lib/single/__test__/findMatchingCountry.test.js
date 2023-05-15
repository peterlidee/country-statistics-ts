import findMatchingCountry from '../findMatchingCountry'

const countries = [
  { cca3: 'aaa' },
  { cca3: 'bbb' },
  { cca3: 'ccc' },
  { cca3: 'ddd' },
  { cca3: 'eee' },
  { cca3: 'fff' },
  { cca3: 'ggg' },
  { cca3: 'hhh' },
]

describe('helper function findMatchingCountry', () => {
  test('It returns the correct result when match', () => {
    const find1 = findMatchingCountry('fff', countries)
    const find2 = findMatchingCountry('ff', countries)
    const find3 = findMatchingCountry('zzz', countries)
    expect(find1[0]).toMatchObject({ cca3: 'fff' })
    expect(find2).toEqual([])
    expect(find3).toEqual([])
  })

  test('It returns empty array when given empty array', () => {
    const find4 = findMatchingCountry('aaa', [])
    expect(find4).toEqual([])
  })
})
