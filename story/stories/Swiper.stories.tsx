import type { Meta, StoryObj } from '@storybook/vue3'
import {
  Swiper,
  SwiperNavigationNext,
  SwiperNavigationPrev,
  SwiperNext,
  SwiperPagination,
  SwiperPrev,
  SwiperScrollbar,
  SwiperSlide,
} from '@rui/add-ons/components/swiper'
import Button from '@rui/core/components/button/Button.vue'
import {
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules'
import { ref } from 'vue'

const meta = {
  title: 'RUI/Swiper',
  component: Swiper,
  subcomponents: {
    SwiperSlide,
    SwiperNext,
    SwiperPrev,
    SwiperNavigationPrev,
    SwiperNavigationNext,
    SwiperPagination,
    SwiperScrollbar,
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Swiper>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {},
  render: (args) => {
    return {
      setup() {
        const swiperRef = ref<any | null>(null)
        return () => {
          return (
            <div>
              <Swiper
                class="w-[400px] h-[200px]"
                ref={swiperRef}
                modules={[Keyboard]}
              >
                {{
                  default: () => {
                    return Array.from({ length: 10 }).map((_, i) => (
                      <SwiperSlide key={i}>{`Slide ${i + 1}`}</SwiperSlide>
                    ))
                  },
                }}
              </Swiper>
              <SwiperPrev swiper={swiperRef.value?.swiper}>
                {{
                  default: ({ disabled }: { disabled: boolean }) => {
                    return <Button disabled={disabled}>Prev</Button>
                  },
                }}
              </SwiperPrev>
              <SwiperNext swiper={swiperRef.value?.swiper}>
                {{
                  default: ({ disabled }: { disabled: boolean }) => {
                    return <Button disabled={disabled}>Next</Button>
                  },
                }}
              </SwiperNext>
            </div>
          )
        }
      },
    }
  },
}

export const WithNavigation: Story = {
  args: {},
  render: (args) => {
    return {
      setup() {
        const swiperRef = ref<any | null>(null)
        return () => {
          return (
            <div>
              <Swiper
                class="w-[400px] h-[200px]"
                ref={swiperRef}
                modules={[Navigation]}
              >
                {{
                  'default': () => {
                    return Array.from({ length: 10 }).map((_, i) => (
                      <SwiperSlide key={i}>{`Slide ${i + 1}`}</SwiperSlide>
                    ))
                  },
                  'container-start': () => {
                    return (
                      <>
                        <SwiperNavigationPrev />
                        <SwiperNavigationNext />
                      </>
                    )
                  },
                }}
              </Swiper>
            </div>
          )
        }
      },
    }
  },
}

export const WithPagination: Story = {
  args: {},
  render: (args) => {
    return {
      setup() {
        const swiperRef = ref<any | null>(null)
        return () => {
          return (
            <div>
              <Swiper
                class="w-[400px] h-[200px]"
                ref={swiperRef}
                modules={[Autoplay, Pagination]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
              >
                {{
                  'default': () => {
                    return Array.from({ length: 10 }).map((_, i) => (
                      <SwiperSlide key={i}>{`Slide ${i + 1}`}</SwiperSlide>
                    ))
                  },
                  'container-end': () => (
                    <SwiperPagination
                      type="autoplay-bullets"
                      dynamicBullets={true}
                      clickable={true}
                    />
                  ),
                }}
              </Swiper>
            </div>
          )
        }
      },
    }
  },
}

export const WithScrollbar: Story = {
  args: {},
  render: (args) => {
    return {
      setup() {
        const swiperRef = ref<any | null>(null)
        return () => {
          return (
            <div>
              <Swiper
                class="w-[400px] h-[200px]"
                ref={swiperRef}
                modules={[Scrollbar]}
              >
                {{
                  'default': () => {
                    return Array.from({ length: 10 }).map((_, i) => (
                      <SwiperSlide key={i}>{`Slide ${i + 1}`}</SwiperSlide>
                    ))
                  },
                  'container-end': () => (
                    <SwiperScrollbar draggable={true} snapOnRelease={true} />
                  ),
                }}
              </Swiper>
            </div>
          )
        }
      },
    }
  },
}
