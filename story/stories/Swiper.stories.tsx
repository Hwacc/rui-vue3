import type { Meta, StoryObj } from '@storybook/vue3'
import {
  Swiper,
  SwiperNavigationNext,
  SwiperNavigationPrev,
  SwiperNext,
  SwiperPrev,
  SwiperSlide,
} from '@rui/add-ons/components/swiper'
import Button from '@rui/core/components/button/Button.vue'
import { Keyboard, Navigation } from 'swiper/modules'
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
                    return (
                      <>
                        <SwiperSlide swiperRef={swiperRef.value}>Slide 1</SwiperSlide>
                        <SwiperSlide swiperRef={swiperRef.value}>Slide 2</SwiperSlide>
                      </>
                    )
                  },
                }}
              </Swiper>
              <SwiperPrev swiper={swiperRef.value?.swiperInstance}>
                {{
                  default: ({ disabled }: { disabled: boolean }) => {
                    return <Button disabled={disabled}>Prev</Button>
                  },
                }}
              </SwiperPrev>
              <SwiperNext swiper={swiperRef.value?.swiperInstance}>
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
                class="relative w-[400px] h-[200px]"
                ref={swiperRef}
                modules={[Navigation]}
              >
                {{
                  'default': () => {
                    return (
                      <>
                        <SwiperSlide swiperRef={swiperRef.value}>Slide 1</SwiperSlide>
                        <SwiperSlide swiperRef={swiperRef.value}>Slide 2</SwiperSlide>
                      </>
                    )
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
