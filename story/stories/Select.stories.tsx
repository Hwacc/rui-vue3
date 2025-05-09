import type { Meta, StoryObj } from '@storybook/vue3'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@rui/core/components/select'

const meta = {
  title: 'RUI/Select',
  component: Select,
  subcomponents: {
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectGroup,
    SelectContent,
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    modelValue: 'b',
  },
  render: (args) => {
    return {
      components: {
        Select,
        SelectTrigger,
        SelectValue,
        SelectItem,
        SelectGroup,
        SelectContent,
      },
      setup() {
        return () => (
          <Select {...args}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="a">A</SelectItem>
                <SelectItem value="b">B</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="d">D</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )
      },
    }
  },
}
