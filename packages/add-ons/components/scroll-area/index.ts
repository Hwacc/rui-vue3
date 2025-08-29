import { tv } from '@rui/core/lib/tv'

export { default as ScrollArea } from './ScrollArea.vue'

export const tvScrollArea = tv(
  {
    base: 'relative',
    variants: {
      size: {
        base: '',
        sm: '',
        xs: '',
      },
    },
  },
  {
    class: 'rui-ps-scroll-area',
  },
)
