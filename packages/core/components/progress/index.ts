import { PREFIX } from '@/lib/constants';
import { type VariantProps } from 'class-variance-authority';
import { cva } from '@/lib/cva';

export { default as Progress } from './Progress.vue';
export { default as CircleProgress } from './CircleProgress.vue';

const prefix = `${PREFIX}-progress`;
export const progressVariants = cva(
  ['relative', 'h-1.5', 'w-full', 'overflow-hidden', 'rounded-full'],
  undefined,
  {
    className: prefix,
  }
);

export const progressIndicatorVariants = cva(
  [
    'h-full',
    'w-full',
    'flex-1',
    'rounded-full',
    'transition-all',
    'data-[type=default]:bg-progress-indicator-default',
    'data-[type=robbin]:progress-indicator-robbin',
  ],
  {
    variants: {
      type: {
        default: '',
        robbin: '',
        transfer: '',
      },
    },
  },
  {
    className: `${prefix}-indicator`,
    compound: [
      {
        type: 'robbin',
        disableRuiClass: false,
        className: `${prefix}-indicator_robbin`,
      },
      { type: 'transfer', disableRuiClass: false, className: `${prefix}-indicator_transfer` },
    ],
  }
);
export type ProgressIndicatorVariants = VariantProps<typeof progressIndicatorVariants>;

export const circleProgressVariants = cva(
  ['size-12.5'],
  {
    variants: {
      type: { arc: '', circle: '' },
    },
  },
  {
    className: `${PREFIX}-circle-progress`,
    compound: [{ type: 'arc', disableRuiClass: false, className: `${PREFIX}-circle-progress_arc` }],
  }
);
export type CircleProgressVariants = VariantProps<typeof circleProgressVariants>;

export const circleProgressIndicatorVariants = cva(
  ['size-full'],
  {
    variants: { type: { default: '', transfer: '' } },
  },
  {
    className: `${PREFIX}-circle-progress-indicator`,
    compound: [
      {
        type: 'transfer',
        disableRuiClass: false,
        className: `${PREFIX}-circle-progress-indicator_transfer`,
      },
    ],
  }
);
export type CircleProgressIndicatorVariants = VariantProps<typeof circleProgressIndicatorVariants>;
