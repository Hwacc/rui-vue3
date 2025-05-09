import type { VariantProps } from 'class-variance-authority'
import type { ToastRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { PREFIX } from '@rui/core/lib/constants'
import { cva } from '@rui/core/lib/cva'
import { toastEdgeAnimate, toastSwipe } from '../toast'

export { default as Messager } from './Messager.vue'
export { message, useMessage } from './use-message'

const prefix = `${PREFIX}-message`
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
    toastEdgeAnimate['top-center'],
    toastSwipe.vertical,
  ],
  undefined,
  { className: prefix },
)
export type MessageVariants = VariantProps<typeof messageVariants>

export interface MessageProps extends ToastRootProps {
  class?: HTMLAttributes['class']
  variant?: StatusVariants
  onOpenChange?: ((value: boolean) => void) | undefined
}
