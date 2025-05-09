import type { Meta, StoryObj } from '@storybook/vue3'
import { Calendar } from '@rui/core/components/calendar'

const meta = {
  title: 'RUI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['base', 'sm', 'lg'] },
  },
  args: {
    size: 'base',
  },
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: (args) => {
    return {
      components: { Calendar },
      setup() {
        return () => (
          <Calendar
            {...args}
            fixedWeeks
            // isDateUnavailable={(date) => {
            //   return dayjs(date.toString()).isAfter(dayjs())
            // }}
            // isDateDisabled={(date) => {
            //   return date.day % 2 !== 0
            // }}
          />
        )
      },
    }
  },
}
