import type { VariantProps } from 'tailwind-variants'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'
import { tvInput } from '../input'

export { default as Hotkey } from './Hotkey.vue'

const prefix = `${PREFIX}-hotkey`

const { root, inner } = tvInput()
export const tvHotkey = tv(
  {
    slots: {
      root: [root(), 'relative'],
      inner: [inner()],
    },
    variants: {
      size: {
        base: '',
        sm: '',
        lg: '',
      },
    },
    defaultVariants: { size: 'base' },
    compoundVariants: [
      {
        size: 'base',
        class: {
          root: root({ size: 'base' }),
          inner: inner({ size: 'base' }),
        },
      },
      {
        size: 'sm',
        class: {
          root: root({ size: 'sm' }),
          inner: inner({ size: 'sm' }),
        },
      },
      {
        size: 'lg',
        class: {
          root: root({ size: 'lg' }),
          inner: inner({ size: 'lg' }),
        },
      },
    ],
  },
  {
    slots: {
      root: [`${PREFIX}-input`, prefix],
      inner: [`${PREFIX}-input-inner`, `${prefix}-inner`],
    },
  },
)
export type HotkeyVariants = VariantProps<typeof tvHotkey>
