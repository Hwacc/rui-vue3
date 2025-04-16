import { PREFIX } from '@/core/lib/constants'
import { cva, VariantProps } from '@/core/lib/cva'

export { default as Separator } from './Separator.vue'

export const separatorVariants = cva(
  ['shrink-0 bg-border relative'],
  {
    variants: {
      orientation: {
        vertical: ['w-px h-full'],
        horizontal: ['h-px w-full']
      }
    }
  },
  {
    className: `${PREFIX}-separator`
  }
)
export type SeparatorProps = VariantProps<typeof separatorVariants>

export const separatorLabelVariants = cva(
  [
    'text-xs',
    'absolute',
    'top-1/2',
    'left-1/2',
    '-translate-x-1/2',
    '-translate-y-1/2',
    'flex',
    'justify-center',
    'items-center'
  ],
  {
    variants: {
      orientation: {
        vertical: ['w-px px-1 py-2'],
        horizontal: ['h-px py-1 px-2']
      }
    }
  },
  {
    className: `${PREFIX}-separator-label`
  }
)
