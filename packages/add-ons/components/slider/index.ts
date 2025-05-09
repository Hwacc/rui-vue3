import { PREFIX } from '@/core/lib/constants'
import { cva } from '@/core/lib/cva'

/**
 * @author razer.hua
 * vue-3-slider-component 增强版
 * 使用floating-ui 增强tooltip的显示效果
 */
export { default as Slider, useFloatingTooltip } from './Slider.vue'
export type { FloatingTooltipOptions, SLIDER_ERROR_TYPE } from './Slider.vue'

const prefix = `${PREFIX}-vue-slider`
export const sliderVariants = cva([], undefined, {
  className: prefix,
})

export const sliderDotVariants = cva(
  ['w-full', 'h-full', 'rounded-full', 'transition-transform'],
  {
    variants: {
      size: {
        sm: 'border-[.0625rem]',
        lg: 'border-[.25rem]',
        base: 'border-[.125rem]',
      },
      scale: {
        true: 'scale-125',
      },
    },
  },
  { className: `${prefix}-dot` },
)

export const sliderTooltipVariants = cva(
  ['flex', 'px-2', 'py-1', 'rounded', 'text-xs', 'font-rob-bold'],
  {
    variants: {
      variant: {
        floating: [],
        default: ['after:absolute', 'after:content-[""]', 'after:w-0', 'after:h-0'],
      },
      placement: {
        top: [
          'after:bottom-0',
          'after:left-1/2',
          'after:translate-x-[-50%]',
          'after:translate-y-[100%]',
          'after:border-[.25rem]',
          'after:border-x-transparent',
          'after:border-b-transparent',
        ],
        bottom: [
          'after:top-0',
          'after:left-1/2',
          'after:translate-x-[-50%]',
          'after:translate-y-[-100%]',
          'after:border-[.25rem]',
          'after:border-x-transparent',
          'after:border-t-transparent',
        ],
        left: [
          'after:right-0',
          'after:top-1/2',
          'after:translate-x-[100%]',
          'after:translate-y-[-50%]',
          'after:border-[.25rem]',
          'after:border-y-transparent',
          'after:border-r-transparent',
        ],
        right: [
          'after:left-0',
          'after:top-1/2',
          'after:translate-x-[-100%]',
          'after:translate-y-[-50%]',
          'after:border-[.25rem]',
          'after:border-y-transparent',
          'after:border-l-transparent',
        ],
      },
    },
  },
  { className: `${prefix}-tooltip` },
)
