import validateSortQuery from '../validateSortQuery'

const defaults = {
  sortAsc: true,
  sortBy: 'country',
}

describe('function validateSortQuery', () => {
  test('It returns sortBy and sortAsc', () => {
    const result = validateSortQuery('', defaults)
    expect(result).toHaveProperty('sortAsc')
    expect(result).toHaveProperty('sortBy')
  })

  test('It returns defaults when values is not array', () => {
    const result = validateSortQuery('foobar', defaults)
    expect(result).toBe(defaults)
  })

  test('It returns defaults when values is not NumberFieldSlug[]', () => {
    const result = validateSortQuery(['foobar'], defaults)
    expect(result).toBe(defaults)
  })

  test('It ignores second value in values', () => {
    const result = validateSortQuery(['foobar', 'area'], defaults)
    expect(result).toBe(defaults)
  })

  test('It returns valid sortBy for NumberFieldSlugs', () => {
    expect(validateSortQuery(['area'], defaults).sortBy).toBe('area')
    expect(validateSortQuery(['population', 'foobar'], defaults).sortBy).toBe(
      'population',
    )
    expect(validateSortQuery(['density'], defaults).sortBy).toBe('density')
  })

  test('It returns valid sortBy for TextFieldSlugs', () => {
    expect(validateSortQuery(['country'], defaults).sortBy).toBe('country')
  })

  test('It returns valid sortAsc for NumberFieldSlugs', () => {
    const result1 = validateSortQuery(['area'], defaults)
    expect(result1.sortBy).toBe('area')
    expect(result1.sortAsc).toBe(false)
    const result2 = validateSortQuery(['-area'], defaults)
    expect(result2.sortBy).toBe('area')
    expect(result2.sortAsc).toBe(true)
  })

  test('It returns valid sortAsc for TextFieldSlug', () => {
    const result1 = validateSortQuery(['country'], defaults)
    expect(result1.sortBy).toBe('country')
    expect(result1.sortAsc).toBe(false)
    const result2 = validateSortQuery(['-country'], defaults)
    expect(result2.sortBy).toBe('country')
    expect(result2.sortAsc).toBe(true)
  })
})
