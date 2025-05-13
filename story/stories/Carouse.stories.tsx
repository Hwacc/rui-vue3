import type { Meta, StoryObj } from '@storybook/vue3'
import {
  Carousel,
  CarouselContainer,
  CarouselItem,
  CarouselNext,
  CarouselPrev,
  CarouselTween,
  CarouselViewport,
} from '@rui/core/components/carousel'

const meta = {
  title: 'RUI/Carousel',
  component: Carousel,
  subcomponents: {
    CarouselViewport,
    CarouselContainer,
    CarouselItem,
    CarouselNext,
    CarouselPrev,
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Carousel>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {},
  render: (args) => {
    return {
      components: {
        Carousel,
        CarouselContainer,
        CarouselItem,
        CarouselNext,
        CarouselPrev,
        CarouselTween,
      },
      setup() {
        const numberWithinRange = (value: number, min: number, max: number) => {
          return Math.min(Math.max(value, min), max)
        }

        return () => {
          return (
            <Carousel
              class="w-[400px] h-[200px]"
              opts={{ loop: true }}
              {...args}
            >
              <CarouselViewport>
                <CarouselContainer class="gap-2">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <CarouselItem class="basis-[200px] h-[200px]" key={i}>
                      <CarouselTween asChild index={i}>
                        {{
                          default: ({ tweenValue }: any) => {
                            return (
                              <div
                                class="bg-rz-green h-full"
                                style={{
                                  opacity: `${numberWithinRange(
                                    1 - Math.abs(tweenValue * 0.2 * 2),
                                    0,
                                    1,
                                  )}`,
                                }}
                              >
                                {`${tweenValue}`}
                              </div>
                            )
                          },
                        }}
                      </CarouselTween>
                    </CarouselItem>
                  ))}
                </CarouselContainer>
              </CarouselViewport>
              <CarouselPrev />
              <CarouselNext />
            </Carousel>
          )
        }
      },
    }
  },
}
