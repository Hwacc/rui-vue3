import { PREFIX } from '@rui/core/lib/constants'
import { cva } from '@rui/core/lib/cva'

export { default as Carousel } from './Carousel.vue'
export { default as CarouselContainer } from './CarouselContainer.vue'
export { default as CarouselItem } from './CarouselItem.vue'
export { default as CarouselNext } from './CarouselNext.vue'
export { default as CarouselPrev } from './CarouselPrev.vue'
export { default as CarouselTween } from './CarouselTween.vue'
export { default as CarouselViewport } from './CarouselViewport.vue'

export { useCarousel } from './useCarousel'

export type { EmblaCarouselType as CarouselApi } from 'embla-carousel'

export const prefix = `${PREFIX}-carousel`
export const carouseVariant = cva(['relative'], undefined, {
  className: prefix,
})
export const carouselViewportVariant = cva(['overflow-hidden'], undefined, {
  className: `${prefix}-viewport`,
})

export const carouselContainerVariant = cva(
  ['flex'],
  {
    variants: {
      orientation: {
        horizontal: [],
        vertical: ['flex-col'],
      },
    },
  },
  {
    className: `${prefix}-container`,
  },
)

export const carouselItemVariant = cva(
  ['min-w-0', 'shrink-0', 'grow-0', 'basis-full'],
  {
    variants: {
      orientation: {
        horizontal: [],
        vertical: [],
      },
    },
  },
  {
    className: `${prefix}-item`,
  },
)
