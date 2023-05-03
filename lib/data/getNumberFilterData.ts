// get min and max value from arr

import { NumberFilterDataType } from '@/types/filterData'

// round min to 0
export function getMinAndMax(arr: number[]): { min: number; max: number } {
  const minValue = Math.min(...arr)
  const min = minValue < 0 ? 0 : minValue
  const max = Math.max(...arr)
  return { min, max }
}

// given a num, return 5 roundish numbers
// fe 36 -> [10,25,50,75,100]
// fe 2354 -> [1000, 2500, 5000, 7500, 10000]
export function closestRoundish(
  num: number,
): [number, number, number, number, number] | [1, 5, 10] {
  // don't do this for anything below 10
  if (num <= 10) return [1, 5, 10]
  const length = Math.round(num).toString().length
  const minClosest = +`1e${length - 1}`
  const maxClosest = +`1e${length}`
  return [
    minClosest,
    maxClosest / 4,
    maxClosest / 2,
    maxClosest / 4 + maxClosest / 2,
    maxClosest,
  ]
}

// number of steps needed to get from min to max
// returns x
// min + ( x . num ) >= max
export function stepsNeeded(num: number, min: number, max: number): number {
  let counter = 0
  for (let i = min; i < max; i += num) {
    counter++
  }
  return counter
}

// find the number in the array that is closest to the target
// return the index of that number
export function findClosestToTarget(arr: number[], target: number) {
  let current = undefined
  for (let i = 0; i < arr.length; i++) {
    if (current === undefined) {
      current = i
    } else if (Math.abs(arr[i] - target) < Math.abs(arr[current] - target)) {
      current = i
    }
  }
  return current as number
}

// takes a min and a max value
// calculates how to get from min to max in around 20 nice round steps
// also calculates start and ending so min and max are included
// return obj { step, start, end, min, max }
export function calculateNumberSliderSetting(
  min: number,
  max: number,
  aroundHowManySteps = 15,
): NumberFilterDataType {
  // get the raw difference
  const rawStep = (max - min) / aroundHowManySteps

  // get 5 round-ish step options
  const stepOptions = closestRoundish(rawStep)

  // calculate how many of these steps it would take for each roundish option
  const numberOfSteps = stepOptions.map((stepOption) =>
    stepsNeeded(stepOption, min, max),
  )

  // now we have an array of steps, now we need to select the optimal one
  // this would be the one closest to aroundHowManySteps
  const selectedStepIndex = findClosestToTarget(
    numberOfSteps,
    aroundHowManySteps,
  )

  // the selected step
  const selectedStep = stepOptions[selectedStepIndex]

  // now we have the selectedStep,
  // but we still need a start point and an endpoint
  let sliderStart = min - selectedStep < 0 ? 0 : min - (min % selectedStep)
  let sliderEnd =
    max % selectedStep === 0 ? max : max - (max % selectedStep) + selectedStep

  return {
    sliderStart,
    sliderEnd,
    sliderStep: selectedStep,
    countryMin: min,
    countryMax: max,
  }
}

// to produce a numberfilter we need some data
// 1.
// a min and max value for the range slider and input fields
export function getNumberFilterData(arr: number[]): NumberFilterDataType {
  // 1.
  // first get the min and max value from the array
  const { min, max } = getMinAndMax(arr)
  // next, we need to figure out the steps
  // and a start and ending point for the slider
  const sliderSettings = calculateNumberSliderSetting(min, max, 15)
  // we return that data to add to filterData
  return sliderSettings
}
