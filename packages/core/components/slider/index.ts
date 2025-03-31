import { PREFIX } from '@/lib/constants';
import { cva } from '@/lib/cva';

/**
 * @author razer.hua
 * vue-3-slider-component 增强版
 * 使用floating-ui 增强tooltip的显示效果
 */
export { default as Slider, useFloatingTooltip } from './Slider.vue';
export type { SLIDER_ERROR_TYPE, FloatingTooltipOptions } from './Slider.vue';

const prefix = `${PREFIX}-vue-slider`;
export const sliderVariants = cva([], undefined, {
  className: prefix,
});

export const sliderDotVariants = cva(
  ['w-full', 'h-full', 'rounded-full', 'transition-transform'],
  {
    variants: {
      size: {
        sm: 'border-[.0625rem]',
        lg: 'border-[.25rem]',
        default: 'border-[.125rem]',
        custom: '',
      },
      scale: {
        true: 'scale-125',
      },
    },
    compoundVariants: [
      {
        disableRuiClass: false,
        class: ['bg-rui-slider-dot', 'border-rui-slider-dot-border'],
      },
    ],
  },
  { className: `${prefix}-dot` }
);

export const sliderTooltipVariants = cva(
  ['flex', 'px-2', 'py-1', 'rounded', 'text-xs', 'font-rob-bold'],
  {
    variants: {
      type: {
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
          'after:border-transparent',
        ],
        bottom: [
          'after:top-0',
          'after:left-1/2',
          'after:translate-x-[-50%]',
          'after:translate-y-[-100%]',
          'after:border-[.25rem]',
          'after:border-transparent',
        ],
        left: [
          'after:right-0',
          'after:top-1/2',
          'after:translate-x-[100%]',
          'after:translate-y-[-50%]',
          'after:border-[.25rem]',
          'after:border-transparent',
        ],
        right: [
          'after:left-0',
          'after:top-1/2',
          'after:translate-x-[-100%]',
          'after:translate-y-[-50%]',
          'after:border-[.25rem]',
          'after:border-transparent',
        ],
      },
    },
    compoundVariants: [
      {
        disableRuiClass: false,
        class: [
          'bg-rui-tooltip',
          'text-rui-tooltip-text',
          '[&_svg]:fill-rui-tooltip',
        ],
      },
      {
        disableRuiClass: false,
        placement: 'top',
        class: ['after:border-t-rui-tooltip'],
      },
      {
        disableRuiClass: false,
        placement: 'bottom',
        class: ['after:border-b-rui-tooltip'],
      },
      {
        disableRuiClass: false,
        placement: 'left',
        class: ['after:border-l-rui-tooltip'],
      },
      {
        disableRuiClass: false,
        placement: 'right',
        class: ['after:border-r-rui-tooltip'],
      },
    ],
  },
  {
    className: `${prefix}-tooltip`,
    compound: [
      {
        type: 'floating',
        disableRuiClass: false,
        className: `${prefix}-tooltip_floating`,
      },
      {
        type: 'default',
        disableRuiClass: false,
        className: `${prefix}-tooltip_default`,
      },
    ],
  }
);
