import { cva } from '@/lib/cva';

/**
 * @author razer.hua
 * vue-3-slider-component 增强版
 * 使用floating-ui 增强tooltip的显示效果
 */
export { default as Slider, useFloatingTooltip } from './Slider.vue';
export type { SLIDER_ERROR_TYPE, FloatingTooltipOptions } from './Slider.vue';

export const sliderVariants = cva([], undefined, {
  className: 'rui-vue-slider',
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
        class: ['bg-(--dot-color)', 'border-(--dot-border-color)'],
      },
    ],
  },
  { className: 'rui-vue-slider-dot' }
);

export const sliderTooltipVariants = cva(
  ['flex', 'px-2', 'py-1', 'rounded', 'text-xs'],
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
          'bg-(--tooltip-bg-color)',
          'text-(--tooltip-text-color)',
          '[&_svg]:fill-(--tooltip-bg-color)',
        ],
      },
      {
        disableRuiClass: false,
        placement: 'top',
        class: ['after:border-t-(--tooltip-bg-color)'],
      },
      {
        disableRuiClass: false,
        placement: 'bottom',
        class: ['after:border-b-(--tooltip-bg-color)'],
      },
      {
        disableRuiClass: false,
        placement: 'left',
        class: ['after:border-l-(--tooltip-bg-color)'],
      },
      {
        disableRuiClass: false,
        placement: 'right',
        class: ['after:border-r-(--tooltip-bg-color)'],
      },
    ],
  },
  {
    className: 'rui-vue-slider-tooltip',
    compound: [
      {
        type: 'floating',
        disableRuiClass: false,
        className: 'rui-vue-slider-tooltip_floating',
      },
      {
        type: 'default',
        disableRuiClass: false,
        className: 'rui-vue-slider-tooltip_default',
      },
    ],
  }
);
