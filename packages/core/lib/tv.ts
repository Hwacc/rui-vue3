import type {
  ClassValue,
  TVCompoundSlots,
  TVCompoundVariants,
  TVDefaultVariants,
  TVReturnType,
  TVVariants,
} from 'tailwind-variants'
import { concat, each, merge } from 'lodash-es'
import { tv as originTv } from 'tailwind-variants'

type TVSlots = Record<string, ClassValue> | undefined
export type { VariantProps } from 'tailwind-variants'

export function tv<
  V extends TVVariants<S, B, EV>,
  CV extends TVCompoundVariants<V, S, B, EV, ES>,
  DV extends TVDefaultVariants<V, S, EV, ES>,
  B extends ClassValue = undefined,
  S extends TVSlots = undefined,
  // @ts-expect-error error in tailwind-variants
  E extends TVReturnType = TVReturnType<
    V,
    S,
    B,
    // @ts-expect-error error in tailwind-variants
    EV extends undefined ? {} : EV,
    // @ts-expect-error error in tailwind-variants
    ES extends undefined ? {} : ES
  >,
  EV extends TVVariants<ES, B, E['variants'], ES> = E['variants'],
  ES extends TVSlots = E['slots'] extends TVSlots ? E['slots'] : undefined,
>(
  options: {
    extend?: E
    base?: B
    slots?: S
    variants?: V
    compoundVariants?: CV
    compoundSlots?: TVCompoundSlots<V & { unstyled: { true: ClassValue, false: ClassValue } }, S, B>
    defaultVariants?: DV
  },
  ruiConfig?: {
    class?: ClassValue
    className?: ClassValue
    slots?: Record<keyof S, ClassValue>
  },
  config?: any,
) {
  type mergedV = V & { unstyled: { true: ClassValue, false: ClassValue } }
  const variants = merge({}, options.variants, {
    unstyled: {
      true: '',
      false: ruiConfig?.class ?? ruiConfig?.className ?? '',
    },
  })

  const unstyledCompoundSlots: any[] = []
  each(ruiConfig?.slots, (value, key) => {
    unstyledCompoundSlots.push({
      slots: [key],
      unstyled: false,
      class: value,
    })
  })

  options.variants = variants
  options.compoundSlots = concat(options.compoundSlots ?? [], unstyledCompoundSlots)
  return originTv<
    mergedV,
    TVCompoundVariants<mergedV, S, B, EV, ES>,
    TVDefaultVariants<mergedV, S, EV, ES>,
    B,
    S,
    E,
    EV,
    ES
  >(options as any, config)
}
