import type { VariantProps } from '@rui/core/lib/cva'
import { PREFIX } from '@rui/core/lib/constants'
import { cva } from '@rui/core/lib/cva'
import 'swiper/css'

export { default as Swiper } from './Swiper.vue'
export { default as SwiperNavigationNext } from './SwiperNavigationNext.vue'
export { default as SwiperNavigationPrev } from './SwiperNavigationPrev.vue'
export { default as SwiperNext } from './SwiperNext.vue'
export { default as SwiperPrev } from './SwiperPrev.vue'
export { SwiperSlide } from 'swiper/vue'

const prefix = `${PREFIX}-swiper`
export const swiperNavigationVariant = cva(
  [
    'absolute',
    'z-10',
    'top-1/2',
    'translate-y-[-50%]',
    'flex',
    'items-center',
  ],
  {
    variants: {
      nav: {
        prev: 'left-0',
        next: 'right-0',
      },
    },
  },
  {
    className: `${prefix}-navigation`,
  },
)
export type SwiperNavigationVariant = VariantProps<
  typeof swiperNavigationVariant
>
