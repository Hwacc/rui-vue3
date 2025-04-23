import { Calendar } from '@core/components/calendar'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'RUI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: (args) => {
    return {
      components: { Calendar },
      setup() {
        return () => <Calendar {...args} />
      }
    }
  }
}
