import type { ToastRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export type SwipeDirection = 'up' | 'down' | 'left' | 'right';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'center';
export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export { default as Toast } from './Toast.vue';
export { default as ToastAction } from './ToastAction.vue';
export { default as ToastClose } from './ToastClose.vue';
export { default as ToastDescription } from './ToastDescription.vue';
export { default as Toaster } from './Toaster.vue';
export { default as ToastProvider } from './ToastProvider.vue';
export { default as ToastTitle } from './ToastTitle.vue';
export { default as ToastViewport } from './ToastViewport.vue';
export { toast, useToast } from './use-toast';

export const toastViewportVariants = cva<{ position: Partial<Record<ToastPosition, any>> }>(
  [
    'fixed',
    'z-[100]',
    'flex',
    'flex-col-reverse',
    'p-6',
    'max-h-screen',
    'w-full',
    'sm:max-w-[26.25rem]',
    'outline-none',
  ],
  {
    variants: {
      position: {
        center: ['top-1/2', 'left-1/2', '-translate-1/2'],
        'top-left': ['top-0', 'left-0'],
        'top-center': ['top-0', 'left-1/2', '-translate-x-1/2'],
        'top-right': ['top-0', 'right-0'],
        'bottom-left': ['bottom-0', 'left-0'],
        'bottom-center': ['bottom-0', 'left-1/2', '-translate-x-1/2'],
        'bottom-right': ['bottom-0', 'right-0'],
      },
    },
    defaultVariants: {
      position: 'center',
    },
  }
);
export type ToastViewportVariants = VariantProps<typeof toastViewportVariants>;

const toastEdgeAnimate: Partial<Record<ToastPosition, any>> = {
  'top-center': [
    'data-[state=open]:slide-in-from-top-full',
    'data-[state=closed]:slide-out-to-top-full',
  ],
  'top-left': [
    'data-[state=open]:slide-in-from-top-full',
    'data-[state=closed]:slide-out-to-left-full',
  ],
  'top-right': [
    'data-[state=open]:slide-in-from-top-full',
    'data-[state=closed]:slide-out-to-right-full',
  ],
  'bottom-center': [
    'data-[state=open]:slide-in-from-bottom-full',
    'data-[state=closed]:slide-out-to-bottom-full',
  ],
  'bottom-left': [
    'data-[state=open]:slide-in-from-bottom-full',
    'data-[state=closed]:slide-out-to-left-full',
  ],
  'bottom-right': [
    'data-[state=open]:slide-in-from-bottom-full',
    'data-[state=closed]:slide-out-to-right-full',
  ],
};
const toastSwipe = {
  horizontal: [
    'data-[swipe=cancel]:translate-x-0',
    'data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x)',
    'data-[swipe=move]:transition-none',
    'data-[swipe=end]:animate-out',
    'data-[swipe=end]:translate-x-(--reka-toast-swipe-end-x)',
  ],
  vertical: [
    'data-[swipe=cancel]:translate-y-0',
    'data-[swipe=move]:translate-y-(--reka-toast-swipe-move-y)',
    'data-[swipe=move]:transition-none',
    'data-[swipe=end]:animate-out',
    'data-[swipe=end]:translate-y-(--reka-toast-swipe-end-y)',
  ],
  none: [],
};
const getToastCompoundVariants = () => {
  const positions = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'center',
  ] as const;
  return positions.map((position) => {
    const _split = position.split('-');
    const _edge =
      _split[0] === 'center'
        ? []
        : [
            'data-[state=open]:animate-in',
            'data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-80',
            ...toastEdgeAnimate[position],
          ];
    let _swipe: any[] = [];
    let _deriction: string | string[] = ['up', 'down', 'left', 'right'];
    switch (_split[1]) {
      case 'left':
      case 'right':
        _swipe = toastSwipe.horizontal;
        _deriction = _split[1];
        break;
      case 'center':
        _swipe = toastSwipe.vertical;
        _deriction = _split[0] === 'top' ? 'up' : 'down';
        break;
      default:
        break;
    }
    return {
      position: position,
      swipeDirection: _deriction,
      class: [[..._edge], ..._swipe],
    };
  });
};
export const toastVariants = cva<{
  position: Partial<Record<ToastPosition, any>>;
  swipeDirection: Partial<Record<SwipeDirection, any>>;
  variant: Partial<Record<ToastVariant, any>>;
}>(
  [
    'group',
    'pointer-events-auto',
    'relative',
    'flex',
    'w-full',
    'items-center',
    'justify-between',
    'py-4',
    'px-6',
    'bg-h22',
    'space-x-4',
    'overflow-hidden',
    'rounded-md',
    'border-l-[.1875rem]',
    'border-l-rz-orange',
    'shadow-lg',
    'transition-all',
  ],
  {
    variants: {
      swipeDirection: {},
      position: {
        center: [
          'animate-duration-200',
          'animate-ease-out',
          'data-[state=open]:animate-fade-down',
          'data-[state=closed]:uti-animate-fade-down-out',
        ],
      },
      variant: {
        success: 'border-l-rz-green',
        error: 'border-l-rz-red',
        warning: 'border-l-rz-orange',
        info: 'border-l-h88',
      },
    },
    compoundVariants: getToastCompoundVariants() as any,
    defaultVariants: {
      position: 'center',
      swipeDirection: 'up',
    },
  }
);
type ToastVariants = VariantProps<typeof toastVariants>;
export interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes['class'];
  variant?: ToastVariants['variant'];
  onOpenChange?: ((value: boolean) => void) | undefined;
}
