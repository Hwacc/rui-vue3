import type { Meta, StoryObj } from '@storybook/vue3'
import { Swiper, SwiperSlide } from '@rui/add-ons/components/swiper'
import { ref, watch } from 'vue'

const meta = {
  title: 'RUI/Swiper',
  component: Swiper,
  subcomponents: {
    SwiperSlide
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Swiper>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {},
  render: (args) => {
    return {
      components: {
        Swiper,
        SwiperSlide
      },
      setup() {
        const swiperRef = ref<any | null>(null)
        watch(swiperRef, (val) => {
          console.log('ref', val)
        })
        return () => {
          return (
            <Swiper
              ref={swiperRef}
              class='w-[400px] h-[200px]'
              tag='div'
              onSwiper={() => {
                console.log('on swiper')
              }}
              // onInit={(swiper: any) => {
              //   console.log('init', swiper)
              // }}
              // on={{
              //   init: (swiper: any) => {
              //     console.log('init', swiper)
              //   },
              //   slideChange: (swiper: any) => {
              //     console.log('slideChange', swiper)
              //   },
              // }}
            >
              {{
                default: () => {
                  return (
                    <>
                      <SwiperSlide>Slide 1</SwiperSlide>
                      <SwiperSlide>Slide 2</SwiperSlide>
                    </>
                  )
                }
              }}
            </Swiper>
          )
        }
      }
    }
  }
}
