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
  undefined,
  { className: prefix }
);
export type MessageVariants = VariantProps<typeof messageVariants>;

export interface MessageProps extends ToastRootProps {
  class?: HTMLAttributes['class'];
  variant?: StatusVariants;
  onOpenChange?: ((value: boolean) => void) | undefined;
}
