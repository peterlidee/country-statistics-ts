// function compilePopulationData takes data and error from useQuery
// it returns default when problem with data and optional extraError
// when no problems, calls extractPopulationData and returns result from that and extraError

import extractPopulationData from './extractPopulationData'

const populationData = {
  femaleTotal: [],
  maleTotal: [],
  combinedTotal: [],
  years: [],
}

export default function compilePopulationData(data: unknown, isError: boolean) {
  let extraError: Error | undefined = undefined

  // 1. no data or error
  // if there is no data, always return default
  // loading is irrelevant,
  // if loading and !data, default was already returned
  // if loading and data, we have data to display
  // if error, don't show data
  if (!data || isError) return { populationData, extraError }

  // 2. check for 'invalid' data
  // for the world bank api, we add an extra error detection
  // because some invalid request will return a valid response
  // https://datahelpdesk.worldbank.org/knowledgebase/articles/898620-api-error-codes
  // also, we want to consider no data an error also

  // invalid data format
  if (!Array.isArray(data)) {
    return {
      populationData,
      extraError: new Error('No data for this country.'),
    }
  }

  // if first item in array has message prop, there is an error
  if (data[0]?.message) {
    return {
      populationData,
      extraError: new Error(data[0].message[0].value),
    }
  }

  // check for empty results (total = 0)
  if (data[0]?.total === 0) {
    return {
      populationData,
      extraError: new Error('No data for this country.'),
    }
  }

  // 3. there should be data now, extract it in the format we need
  const extractedPopulationData = extractPopulationData(data[1])

  // 4. return data and extraError
  return {
    populationData: extractedPopulationData,
    extraError,
  }
}
