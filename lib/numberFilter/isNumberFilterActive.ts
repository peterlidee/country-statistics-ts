/**
 * returns false when selection array === defaults array, else true
 * @param selection [number, number]
 * @param defaults [number, number]
 * @returns boolean
 */

export default function isNumberFilterActive(
  selection: [number, number],
  defaults: [number, number],
) {
  return selection[0] === defaults[0] && selection[1] === defaults[1]
    ? false
    : true
}
