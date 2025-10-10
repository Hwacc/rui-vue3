import type { VariantProps } from 'tailwind-variants'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export type SwipeDirection = 'up' | 'down' | 'left' | 'right'
export type ToastPosition
  = | 'top-left'
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
  type ToastProviderContextEx,
  type ToastProviderPropsEx,
} from './ToastProvider.vue'
export { default as ToastTitle } from './ToastTitle.vue'
export { default as ToastViewport } from './ToastViewport.vue'
export { toast, useToast } from './use-toast'

const prefix = `${PREFIX}-toast`

export const toastEdgeAnimate: Partial<Record<ToastPosition, any>> = {
  'top-center': [
    'data-[state=open]:-motion-translate-y-in-100',
    'data-[state=closed]:animate-toast-exit-top',
  ],
  'top-left': [
    'data-[state=open]:-motion-translate-y-in-100',
    'data-[state=closed]:animate-toast-exit-left',
  ],
  'top-right': [
    'data-[state=open]:-motion-translate-y-in-100',
    'data-[state=closed]:animate-toast-exit-right',
  ],
  'bottom-center': [
    'data-[state=open]:motion-translate-y-in-100',
    'data-[state=closed]:animate-toast-exit-bottom',
  ],
  'bottom-left': [
    'data-[state=open]:motion-translate-y-in-100',
    'data-[state=closed]:animate-toast-exit-left',
  ],
  'bottom-right': [
    'data-[state=open]:motion-translate-y-in-100',
    'data-[state=closed]:animate-toast-exit-right',
  ],
}
export const toastSwipe = {
  horizontal: [
    'motion-duration-200',
    'data-[swipe=cancel]:translate-x-0',
    'data-[swipe=move]:!translate-x-(--reka-toast-swipe-move-x)',
    'data-[swipe=move]:transition-none',
  ],
  vertical: [
    'motion-duration-200',
    'data-[swipe=cancel]:translate-y-0',
    'data-[swipe=move]:!translate-y-(--reka-toast-swipe-move-y)',
    'data-[swipe=move]:transition-none',
  ],
  none: [],
}

function getBaseSlotsCompoundVariants() {
  const positions = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'center',
  ] as const
  return positions.map((position) => {
    const _split = position.split('-')
    const _edge
      = _split[0] === 'center'
        ? ['data-[state=open]:animate-fade-down', 'data-[state=closed]:animate-fade-down-out']
        : ['data-[state=closed]:motion-opacity-out-80', ...toastEdgeAnimate[position]]
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
      slots: ['base'],
      position,
      swipeDirection: _deriction,
      class: [[..._edge], ..._swipe],
    }
  })
}

export const tvToast = tv(
  {
    base: [
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
      'transition-all',
    ],
    slots: {
      viewport: [
        'fixed',
        'z-(--z-max)',
        'flex',
        'flex-col-reverse',
        'p-6',
        'max-h-screen',
        'w-full',
        'sm:max-w-[26.25rem]',
        'outline-none',
      ],
      icon: ['size-5'],
      title: ['text-base'],
      description: ['text-sm'],
      close: ['size-3'],
      action: [
        'inline-flex',
        'shrink-0',
        'items-center',
        'justify-center',
        'transition-colors',
        'disabled:pointer-events-none',
        'disabled:opacity-(--disabled-opacity)',
      ],
    },
    variants: {
      swipeDirection: {
        up: '',
        down: '',
        left: '',
        right: '',
      },
      position: {
        'top-left': '',
        'top-center': '',
        'top-right': '',
        'bottom-left': '',
        'bottom-center': '',
        'bottom-right': '',
        'center': '',
      },
    },
    defaultVariants: {
      position: 'center',
      swipeDirection: 'up',
    },
    compoundSlots: (getBaseSlotsCompoundVariants() as any).concat([
      {
        slots: ['viewport'],
        position: 'center',
        class: ['top-1/2', 'left-1/2', '-translate-1/2'],
      },
      {
        slots: ['viewport'],
        position: 'top-left',
        class: ['top-0', 'left-0'],
      },
      {
        slots: ['viewport'],
        position: 'top-center',
        class: ['top-0', 'left-1/2', '-translate-x-1/2'],
      },
      {
        slots: ['viewport'],
        position: 'top-right',
        class: ['top-0', 'right-0'],
      },
      {
        slots: ['viewport'],
        position: 'bottom-left',
        class: ['bottom-0', 'left-0'],
      },
      {
        slots: ['viewport'],
        position: 'bottom-center',
        class: ['bottom-0', 'left-1/2', '-translate-x-1/2'],
      },
      {
        slots: ['viewport'],
        position: 'bottom-right',
        class: ['bottom-0', 'right-0'],
      },
    ]),
  },
  {
    class: prefix,
    slots: {
      viewport: `${prefix}-viewport`,
      icon: `${prefix}-icon`,
      title: `${prefix}-title`,
      description: `${prefix}-description`,
      close: `${prefix}-close`,
      action: `${prefix}-action`,
    },
  },
)

export type ToastVariants = VariantProps<typeof tvToast>
