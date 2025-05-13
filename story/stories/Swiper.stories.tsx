import type { Meta, StoryObj } from '@storybook/vue3'
import { Swiper, SwiperSlide } from '@rui/add-ons/components/swiper'

const meta = {
  title: 'RUI/Swiper',
  component: Swiper,
  subcomponents: {
    SwiperSlide,
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
      components: {
        Swiper,
        SwiperSlide,
      },
      setup() {
        return () => {
          return (
            <Swiper
              class="w-[400px] h-[200px]"
              tag="div"
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
                },
              }}
            </Swiper>
          )
        }
      },
    }
  },
}
