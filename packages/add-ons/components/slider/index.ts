import type { VariantProps } from '@rui/core/lib/tv'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

/**
 * @author razer.hua
 * vue-3-slider-component 增强版
 * 使用floating-ui 增强tooltip的显示效果
 */
export { default as Slider, useFloatingTooltip } from './Slider.vue'
export type { FloatingTooltipOptions, SLIDER_ERROR_TYPE } from './Slider.vue'

const prefix = `${PREFIX}-vue-slider`

export const tvSlider = tv({
  slots: {
    root: [],
    process: '',
    dot: ['w-full', 'h-full', 'rounded-full', 'transition-transform'],
    tooltip: ['flex', 'px-2', 'py-1', 'rounded'],
    label: '',
    mark: '',
    step: '',
    rail: '',
  },
  variants: {
    size: {
      sm: '',
      lg: '',
      base: '',
    },
    scale: {
      true: '',
      false: '',
    },
    variant: {
      floating: '',
      default: '',
    },
    placement: {
      top: '',
      bottom: '',
      left: '',
      right: '',
    },
  },
  compoundSlots: [
    {
      size: 'sm',
      slots: ['dot'],
      class: 'border-[.0625rem]',
    },
    {
      size: 'lg',
      slots: ['dot'],
      class: 'border-[.25rem]',
    },
    {
      size: 'base',
      slots: ['dot'],
      class: 'border-[.125rem]',
    },
    {
      scale: true,
      slots: ['dot'],
      class: 'scale-125',
    },
    {
      variant: 'default',
      slots: ['tooltip'],
      class: ['after:absolute', 'after:content-[""]', 'after:w-0', 'after:h-0'],
    },
    {
      placement: 'top',
      slots: ['tooltip'],
      class: [
        'after:bottom-0',
        'after:left-1/2',
        'after:translate-x-[-50%]',
        'after:translate-y-[100%]',
        'after:border-[.25rem]',
        'after:border-x-transparent',
        'after:border-b-transparent',
      ],
    },
    {
      placement: 'bottom',
      slots: ['tooltip'],
      class: [
        'after:right-0',
        'after:top-1/2',
        'after:translate-x-[100%]',
        'after:translate-y-[-50%]',
        'after:border-[.25rem]',
        'after:border-y-transparent',
        'after:border-r-transparent',
      ],
    },
    {
      placement: 'left',
      slots: ['tooltip'],
      class: [
        'after:right-0',
        'after:top-1/2',
        'after:translate-x-[100%]',
        'after:translate-y-[-50%]',
        'after:border-[.25rem]',
        'after:border-y-transparent',
        'after:border-r-transparent',
      ],
    },
    {
      placement: 'right',
      slots: ['tooltip'],
      class: [
        'after:left-0',
        'after:top-1/2',
        'after:translate-x-[-100%]',
        'after:translate-y-[-50%]',
        'after:border-[.25rem]',
        'after:border-y-transparent',
        'after:border-l-transparent',
      ],
    },
  ],
}, {
  slots: {
    root: prefix,
    dot: `${prefix}-dot`,
    tooltip: `${prefix}-tooltip`,
    label: `${prefix}-label`,
    mark: `${prefix}-mark`,
    step: `${prefix}-step`,
    process: `${prefix}-process`,
    rail: `${prefix}-rail`,
  },
})

export type SliderVariants = VariantProps<typeof tvSlider>
