import { cva } from '@rui/core/lib/cva'

export { default as ScrollArea } from './ScrollArea.vue'

export const scrollAreaVariants = cva(
  ['relative'],
  {
    variants: {
      size: {
        base: '',
        sm: '',
        xs: '',
      },
    },
  },
  {
    className: 'rui-ps-scroll-area',
  },
)
