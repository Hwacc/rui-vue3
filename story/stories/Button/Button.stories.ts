import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Button } from '@core/components/button';

const meta = {
  title: 'RUI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: ['class', 'checked', 'tooltipProviderProps'],
    },
  },
  argTypes: {
    size: { control: 'select', options: ['base', 'sm', 'lg'] },
    variant: { control: 'select', options: ['default', 'normal', 'outline', 'text', 'icon'] },
    class: { control: 'text' },
    tooltip: { control: 'text' },
    tooltipTheme: { control: 'select', options: ['default', 'dark'] },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    default: 'Default',
    variant: 'default',
  }
};

export const Normal: Story = {
  args: {
    default: 'Normal',
    variant: 'normal',
  },
};

export const Outline: Story = {
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
  args: {
    default: 'Outline',
    variant: 'outline',
  },
};
