import type { VariantProps } from 'tailwind-variants'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'
import { toastEdgeAnimate, toastSwipe, tvToast } from '../toast'

export { default as Messager } from './Messager.vue'
export { message, useMessage } from './use-message'

const prefix = `${PREFIX}-message`

export const tvMessage = tv({
  extend: tvToast,
  base: [
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
  slots: {
    title: 'text-base flex-1',
  },
}, {
  className: prefix,
})

export type MessageVariants = VariantProps<typeof tvMessage>
