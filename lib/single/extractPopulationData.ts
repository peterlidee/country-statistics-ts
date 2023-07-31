export default function extractPopulationData(records: unknown[]) {
  // records is an array with 2 type of items
  // female and male population totals per year
  // the year should span from 2002-2021
  // we don't assume the years are there but we retrieve the years from the data

  // 1. what we need is 4 arrays, sorted by year ascending
  // [femaleTotal][maleTotal][total][years]
  const femaleTotal: number[] = []
  const maleTotal: number[] = []
  const combinedTotal: number[] = []
  const years: number[] = []

  // 2. we first loop over every item in the array and
  // return { year, total } to either male of female arrays
  const maleItems: { year: number; total: number }[] = []
  const femaleItems: { year: number; total: number }[] = []

  records.map((record) => {
    if (
      // is record object
      typeof record === 'object' &&
      record !== null &&
      // does record have props: indicator (object), date (string), value (number)
      'indicator' in record &&
      typeof record.indicator === 'object' &&
      record.indicator !== null &&
      'date' in record &&
      typeof record.date === 'string' &&
      'value' in record &&
      typeof record.value === 'number' &&
      // does record.indicator have props id (string)
      'id' in record.indicator &&
      typeof record.indicator.id === 'string'
    ) {
      if (record.indicator.id == 'SP.POP.TOTL.MA.IN') {
        // male
        maleItems.push({
          year: Number(record.date),
          total: record.value,
        })
      } else {
        // female
        femaleItems.push({
          year: Number(record.date),
          total: record.value,
        })
      }
    }
  })

  // 3. sort by year asc
  maleItems.sort((a, b) => a.year - b.year)
  femaleItems.sort((a, b) => a.year - b.year)

  // 4. extract years, male and female and combined
  // we assume the male and female arrays are equal in length
  for (let i = 0; i < maleItems.length; i++) {
    years.push(maleItems[i].year)
    maleTotal.push(maleItems[i].total)
    femaleTotal.push(femaleItems[i].total)
    combinedTotal.push(maleItems[i].total + femaleItems[i].total)
  }

  // finally, return the calculated data
  return { years, femaleTotal, maleTotal, combinedTotal }
}
