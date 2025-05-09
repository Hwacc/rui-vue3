import { PREFIX } from '@rui/core/lib/constants'
import { cva, VariantProps } from '@rui/core/lib/cva'

export { default as Hotkey } from './Hotkey.vue'

const prefix = `${PREFIX}-hotkey`

export const hotkeyVariants = cva(['relative'], undefined, {
  className: prefix
})
export type HotkeyVariants = VariantProps<typeof hotkeyVariants>
