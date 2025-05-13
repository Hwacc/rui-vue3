import type { Swiper, SwiperEvents, SwiperOptions } from 'swiper/types'

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
