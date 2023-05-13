export default function updateRegionsQuery(
  arr: string[],
  toAdd: string[],
  toRemove: string[],
) {
  const newArr = [...new Set([...arr, ...toAdd])]
  // const newArr = arr.push(...toAdd)
  return newArr.filter((item) => !toRemove.includes(item))
}
