import type { Meta, StoryObj } from '@storybook/vue3'
import { Popover, PopoverContent, PopoverTrigger } from '@rui/core/components/popover'

const meta = {
  title: 'RUI/Popover',
  component: Popover,
  subcomponents: {
    PopoverTrigger,
    PopoverContent,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: (args) => {
    return {
      components: { Popover, PopoverTrigger, PopoverContent },
      setup() {
        return () => (
          <Popover
            {...args}
          >
            <PopoverTrigger trigger="click">Trigger</PopoverTrigger>
            <PopoverContent side="right" sideOffset={30}>
              <div>Content</div>
            </PopoverContent>
          </Popover>
        )
      },
    }
  },
}
