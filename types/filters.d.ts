import { NumberFieldSlug } from '@/components/fields/types/fields'

export type CurrentSelectionsType = {
  [slug in NumberFieldSlug]: [number, number]
}
