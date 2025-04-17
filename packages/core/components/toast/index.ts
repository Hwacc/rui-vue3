import type { ToastRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { VariantProps } from 'class-variance-authority'
import { cva } from '@/core/lib/cva'
import { PREFIX } from '@/core/lib/constants'

export type SwipeDirection = 'up' | 'down' | 'left' | 'right'
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'center'
export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export { default as Toast } from './Toast.vue'
export { default as ToastAction } from './ToastAction.vue'
export { default as ToastClose } from './ToastClose.vue'
export { default as ToastDescription } from './ToastDescription.vue'
export { default as Toaster } from './Toaster.vue'
export {
  default as ToastProvider,
  type ToastProviderPropsEx,
  type ToastProviderContextEx
} from './ToastProvider.vue'
export { default as ToastTitle } from './ToastTitle.vue'
export { default as ToastViewport } from './ToastViewport.vue'
export { toast, useToast } from './use-toast'

export const toastViewportVariants = cva<{
  position: Partial<Record<ToastPosition, any>>
}>(
  [
    'fixed',
    'z-[100]',
    'flex',
    'flex-col-reverse',
    'p-6',
    'max-h-screen',
    'w-full',
    'sm:max-w-[26.25rem]',
    'outline-none'
  ],
  {
    variants: {
      position: {
        'center': ['top-1/2', 'left-1/2', '-translate-1/2'],
        'top-left': ['top-0', 'left-0'],
        'top-center': ['top-0', 'left-1/2', '-translate-x-1/2'],
        'top-right': ['top-0', 'right-0'],
        'bottom-left': ['bottom-0', 'left-0'],
        'bottom-center': ['bottom-0', 'left-1/2', '-translate-x-1/2'],
        'bottom-right': ['bottom-0', 'right-0']
      }
    },
    defaultVariants: {
      position: 'center'
    }
  }
)
export type ToastViewportVariants = VariantProps<typeof toastViewportVariants>

export const toastEdgeAnimate: Partial<Record<ToastPosition, any>> = {
  'top-center': [
    'data-[state=open]:-motion-translate-y-in-100',
    // 'data-[state=closed]:-motion-translate-y-out-100'
  ],
  'top-left': [
    'data-[state=open]:-motion-translate-y-in-100',
    // 'data-[state=closed]:-motion-translate-x-out-100'
  ],
  'top-right': [
    'data-[state=open]:-motion-translate-y-in-100',
    // 'data-[state=closed]:motion-translate-x-out-100'
  ],
  'bottom-center': [
    'data-[state=open]:motion-translate-y-in-100',
    // 'data-[state=closed]:motion-translate-y-out-100'
  ],
  'bottom-left': [
    'data-[state=open]:motion-translate-y-in-100',
    // 'data-[state=closed]:-motion-translate-x-out-100'
  ],
  'bottom-right': [
    'data-[state=open]:motion-translate-y-in-100',
    // 'data-[state=closed]:motion-translate-x-out-100'
  ]
}
export const toastSwipe = {
  horizontal: [
    'motion-duration-2000',
    'data-[swipe=cancel]:translate-x-0',
    'data-[swipe=move]:!translate-x-(--reka-toast-swipe-move-x)',
    'data-[swipe=move]:transition-none',
    // 'data-[swipe=end]:!motion-translate-x-out-(--reka-toast-swipe-end-x)'
    'data-[swipe=end]:animate-toast-exit'
  ],
  vertical: [
    'data-[swipe=cancel]:translate-y-0',
    'data-[swipe=move]:!translate-y-(--reka-toast-swipe-move-y)',
    'data-[swipe=move]:transition-none',
    // 'data-[swipe=end]:!motion-translate-y-out-(--reka-toast-swipe-end-y)'
    'data-[swipe=end]:animate-toast-exit'
  ],
  none: []
}
const getToastCompoundVariants = () => {
  const positions = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'center'
  ] as const
  return positions.map((position) => {
    const _split = position.split('-')
    const _edge =
      _split[0] === 'center'
        ? []
        : [
            'data-[state=closed]:motion-opacity-out-80',
            ...toastEdgeAnimate[position]
          ]
    let _swipe: any[] = []
    let _deriction: string | string[] = ['up', 'down', 'left', 'right']
    switch (_split[1]) {
      case 'left':
      case 'right':
        _swipe = toastSwipe.horizontal
        _deriction = _split[1]
        break
      case 'center':
        _swipe = toastSwipe.vertical
        _deriction = _split[0] === 'top' ? 'up' : 'down'
        break
      default:
        break
    }
    return {
      position: position,
      swipeDirection: _deriction,
      class: [[..._edge], ..._swipe]
    }
  })
}
const prefix = `${PREFIX}-toast`
export const toastVariants = cva<{
  position: Partial<Record<ToastPosition, any>>
  swipeDirection: Partial<Record<SwipeDirection, any>>
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
    'space-x-4',
    'overflow-hidden',
    'rounded-md',
    'border-l-[.1875rem]',
    'transition-all'
  ],
  {
    variants: {
      swipeDirection: {},
      position: {
        center: [
          'data-[state=open]:animate-fade-down',
          'data-[state=closed]:animate-fade-down-out'
        ]
      }
    },
    compoundVariants: getToastCompoundVariants() as any,
    defaultVariants: {
      position: 'center',
      swipeDirection: 'up'
    }
  },
  { className: prefix }
)
export type ToastVariants = VariantProps<typeof toastVariants>

export const toastIconVariants = cva(['size-5'], undefined, {
  className: `${prefix}-icon`
})
export type ToastIconVariants = VariantProps<typeof toastIconVariants>

export const toastTitleVariants = cva(['text-base'], undefined, {
  className: `${prefix}-title`
})

export const toastDescriptionVariants = cva(['text-sm'], undefined, {
  className: `${prefix}-description`
})

export const toastCloseVariants = cva(['size-3'], undefined, {
  className: `${prefix}-close`
})

export const toastActionVariants = cva(
  [
    'inline-flex',
    'shrink-0',
    'items-center',
    'justify-center',
    'transition-colors',
    'disabled:pointer-events-none',
    'disabled:opacity-(--disabled-opacity)'
  ],
  undefined,
  { className: `${prefix}-action` }
)
export interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes['class']
  variant?: StatusVariants
  unstyled?: boolean
  onOpenChange?: ((value: boolean) => void) | undefined
}
