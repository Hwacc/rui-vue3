import { VariantProps } from 'class-variance-authority';
import { cva } from '@/lib/cva';
import { ToastRootProps } from 'reka-ui';
import { HTMLAttributes } from 'vue';
import { toastEdgeAnimate, toastSwipe } from '../toast';
import { PREFIX } from '@/lib/constants';

export { default as Messager } from './Messager.vue';
export { message, useMessage } from './use-message';

const prefix = `${PREFIX}-message`;
export const messageVariants = cva(
  [
    'group',
    'pointer-events-auto',
    'relative',
    'flex',
    'w-full',
    'items-center',
    'justify-between',
    'space-x-4',
    'overflow-hidden',
    'rounded-md',
    'transition-all',
    'border-l-0',
    'px-4',
    'py-3',
    // message animations
    'data-[state=open]:animate-in',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-80',
    toastEdgeAnimate['top-center'],
    toastSwipe.vertical,
  ],
  {
    variants: {
      variant: {
        success: '',
        error: '',
        warning: '',
        info: '',
      },
    },
  },
  {
    className: prefix,
    compound: [
      {
        disableRuiClass: false,
        className: ['bg-rui-message', 'shadow-rui-popper'],
      },
      {
        variant: 'success',
        disableRuiClass: false,
        className: [
          '[&_svg]:fill-rui-success',
          '[&_svg]:stroke-rui-message',
          '[&_circle]:stroke-rui-success',
          `${prefix}_success`,
        ],
      },
      {
        variant: 'error',
        disableRuiClass: false,
        className: [
          '[&_svg]:fill-rui-error',
          '[&_svg]:stroke-rui-message',
          '[&_circle]:stroke-rui-error',
          `${prefix}_error`,
        ],
      },
      {
        variant: 'warning',
        disableRuiClass: false,
        className: [
          '[&_svg]:fill-rui-warning',
          '[&_svg]:stroke-rui-message',
          '[&_circle]:stroke-rui-warning',
          `${prefix}_warning`,
        ],
      },
      {
        variant: 'info',
        disableRuiClass: false,
        className: [
          '[&_svg]:fill-rui-info',
          '[&_svg]:stroke-rui-message',
          '[&_circle]:stroke-rui-info',
          `${prefix}_info`,
        ],
      },
    ],
  }
);
export type MessageVariants = VariantProps<typeof messageVariants>;

export interface MessageProps extends ToastRootProps {
  class?: HTMLAttributes['class'];
  variant?: MessageVariants['variant'];
  onOpenChange?: ((value: boolean) => void) | undefined;
}
