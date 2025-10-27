import type { Meta, StoryObj } from '@storybook/vue3'
import { FixedVirtualList } from '@rui/add-ons/components/virtual'

const meta = {
  title: 'RUI/Virtual',
  component: null,
  subcomponents: {
    FixedVirtualList,
  },
} satisfies Meta<any>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},

  render: () => {
    return (
      <FixedVirtualList />
    )
  },
}
