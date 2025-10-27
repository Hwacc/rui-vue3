import type { Meta, StoryObj } from '@storybook/vue3'
import { Badge } from '@rui/core/components/badge'

const meta = {
  title: 'RUI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    default: {
      control: 'text',
    },
    variant: {
      control: 'radio',
      options: ['default', 'secondary', 'dot'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'base', 'lg'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    default: 'Default',
    size: 'base',
    variant: 'default',
  },
}

export const Secondary: Story = {
  args: {
    default: 'Secondary',
    size: 'base',
    variant: 'secondary',
  },
}

export const RedDot: Story = {
  args: {
    size: 'base',
    variant: 'dot',
  },
  render: (args) => {
    return {
      components: { Badge },
      setup() {
        return () => (
          <div class="relative">
            <p>Test Text</p>
            <Badge class="absolute" variant="dot" size={args.size} />
          </div>
        )
      },
    }
  },
}
