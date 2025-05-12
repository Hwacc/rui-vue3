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
        return () => {
          return (
            <Carousel class="w-[400px] h-[200px]" {...args}>
              <CarouselViewport>
                <CarouselContainer class="gap-2">
                  <CarouselItem class="h-[200px]">
                    <CarouselTween asChild>
                      {{
                        default: ({ tweenValue }) => (
                          <div class="bg-rz-red h-full">{tweenValue}</div>
                        ),
                      }}
                    </CarouselTween>
                  </CarouselItem>
                  <CarouselItem class="h-[200px]">
                    <CarouselTween asChild>
                      {{
                        default: ({ tweenValue }) => (
                          <div class="bg-rz-blue h-full">{tweenValue}</div>
                        ),
                      }}
                    </CarouselTween>
                  </CarouselItem>
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
