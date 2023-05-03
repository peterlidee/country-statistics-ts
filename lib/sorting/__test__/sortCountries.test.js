import sortCountries from "../sortCountries"

describe('function sortCountries', () => {
  const arr = [
    { keyOne: "aaa", keyTwo: 1, keyThree: "ddd", },
    { keyOne: "bbb", keyTwo: 2, keyThree: "eee", },
    { keyOne: "ccc", keyTwo: 3, keyThree: "ccc", },
    { keyOne: "eee", keyTwo: 5, keyThree: "bbb", },
    { keyOne: "ddd", keyTwo: 4, keyThree: "aaa", },
  ]
  
  test('It sorts by the correct key', () => {
    const result1 = sortCountries([...arr], 'keyOne', true, 'text')
    const result2 = sortCountries([...arr], 'keyThree', true, 'text')

    expect(result1[0]).toEqual({ keyOne: "aaa", keyTwo: 1, keyThree: "ddd", })
    expect(result2[0]).toEqual({ keyOne: "ddd", keyTwo: 4, keyThree: "aaa", },)
  })
  test('It correctly sorts text asc and desc', () => {
    const result3 = sortCountries([...arr], 'keyOne', true, 'text')
    const result4 = sortCountries([...arr], 'keyOne', false, 'text')

    expect(result3[0]).toEqual({ keyOne: "aaa", keyTwo: 1, keyThree: "ddd", })
    expect(result4[0]).toEqual({ keyOne: "eee", keyTwo: 5, keyThree: "bbb", })
  })
  test('It correctly sorts numbers asc and desc', () => {
    const result5 = sortCountries([...arr], 'keyTwo', true, 'number')
    const result6 = sortCountries([...arr], 'keyTwo', false, 'number')

    expect(result5[0]).toEqual({ keyOne: "aaa", keyTwo: 1, keyThree: "ddd", })
    expect(result6[0]).toEqual({ keyOne: "eee", keyTwo: 5, keyThree: "bbb", })
  })
})