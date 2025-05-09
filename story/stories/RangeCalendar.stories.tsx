import type { Meta, StoryObj } from '@storybook/vue3'
import { RangeCalendar } from '@rui/core/components/range-calendar'

const meta = {
  title: 'RUI/RangeCalendar',
  component: RangeCalendar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['base', 'sm', 'lg'] },
  },
  args: {
    size: 'base',
  },
} satisfies Meta<typeof RangeCalendar>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: (args) => {
    return {
      components: { RangeCalendar },
      setup() {
        return () => (
          <RangeCalendar
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
