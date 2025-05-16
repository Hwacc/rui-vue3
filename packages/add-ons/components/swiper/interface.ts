import type {
  PaginationOptions,
  Swiper,
  SwiperEvents,
  SwiperOptions,
} from 'swiper/types'

export interface SwiperProps extends SwiperOptions {
  /**
   * 自定义容器标签名
   * @default 'div'
   */
  tag?: string
  /**
   * 自定义 wrapper 标签名
   * @default 'div'
   */
  wrapperTag?: string
  /**
   * 使用的模块数组
   */
  modules?: any[]
}

export interface SwiperEmits extends SwiperEvents {
  swiper: (swiper: Swiper) => void
}

export interface SwiperSlots {
  'default': () => any
  'container-start': () => any
  'container-end': () => any
  'wrapper-start': () => any
  'wrapper-end': () => any
}

export interface SwiperPaginationProps extends Omit<PaginationOptions, 'type'> {
  type: PaginationOptions['type'] | 'autoplay-bullets'
}

export interface SwiperPaginationEmits {
  paginationHide: (swiper: Swiper) => void
  paginationRender: (swiper: Swiper, paginationEl: HTMLElement) => void
  paginationShow: (swiper: Swiper) => void
  paginationUpdate: (swiper: Swiper, paginationEl: HTMLElement) => void
}

export interface SwiperNavigationEmits {
  navigationHide: (swiper: Swiper) => void
  navigationNext: (swiper: Swiper, navigationEl: HTMLElement) => void
  navigationPrev: (swiper: Swiper) => void
  navigationShow: (swiper: Swiper, navigationEl: HTMLElement) => void
}
