import { cva, VariantProps } from 'class-variance-authority';
import { ToastRootProps } from 'reka-ui';
import { HTMLAttributes } from 'vue';
import { toastEdgeAnimate, toastSwipe } from '../toast';

export { default as Messager } from './Messager.vue';
export { message, useMessage } from './use-message';
export const messageVariants = cva(
  [
    'group',
    'pointer-events-auto',
    'relative',
    'flex',
    'w-full',
    'items-center',
    'justify-between',
    'bg-h22',
    'space-x-4',
    'overflow-hidden',
    'rounded-md',
    'shadow-lg',
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
  }
);
export type MessageVariants = VariantProps<typeof messageVariants>;
export interface MessageProps extends ToastRootProps {
  class?: HTMLAttributes['class'];
  variant?: MessageVariants['variant'];
  onOpenChange?: ((value: boolean) => void) | undefined;
}
