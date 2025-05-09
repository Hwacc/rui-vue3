import type { VariantProps } from '@rui/core/lib/cva'
import { PREFIX } from '@rui/core/lib/constants'
import { cva } from '@rui/core/lib/cva'

export { default as Hotkey } from './Hotkey.vue'

const prefix = `${PREFIX}-hotkey`

export const hotkeyVariants = cva(['relative'], undefined, {
  className: prefix,
})
export type HotkeyVariants = VariantProps<typeof hotkeyVariants>
