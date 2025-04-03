import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Button } from '@core/components/button';

const meta = {
  title: 'RUI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['base', 'sm', 'lg'] },
    variant: { control: 'select', options: ['default', 'normal', 'outline', 'text', 'icon'] },
    class: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    default: 'Default',
    variant: 'default',
  },
};
