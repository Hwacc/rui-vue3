import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'
import { Button } from '@core/components/button'
import { Camera } from 'lucide-vue-next'
import { ref, watch } from 'vue'

const meta = {
  title: 'RUI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['base', 'sm', 'lg'] },
    variant: {
      control: 'select',
      options: ['default', 'normal', 'outline', 'text', 'icon']
    },
    class: { control: 'text' },
    tooltip: { control: 'text' },
    tooltipTheme: { control: 'select', options: ['default', 'dark'] }
  }
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
  parameters: {
    controls: {
      include: ['size', 'disabled', 'default', 'unstyled']
    }
  },
  args: {
    default: 'Default',
    variant: 'default',
    size: 'base'
  }
}

export const Normal: Story = {
  parameters: {
    controls: {
      include: ['size', 'disabled', 'default', 'unstyled']
    }
  },
  args: {
    default: 'Normal',
    variant: 'normal',
    size: 'base'
  }
}

export const Outline: Story = {
  parameters: {
    controls: {
      include: ['size', 'disabled', 'default', 'unstyled']
    }
  },
  args: {
    default: 'Outline',
    variant: 'outline',
    size: 'base'
  }
}

export const Text: Story = {
  parameters: {
    controls: {
      include: ['size', 'disabled', 'default', 'unstyled']
    }
  },
  args: {
    default: 'Text',
    variant: 'text',
    size: 'base'
  }
}

export const Icon: Story = {
  parameters: {
    controls: {
      exclude: ['class']
    }
  },
  args: {
    variant: 'icon',
    tooltip: 'Camera',
    size: 'base'
  },
  render: (args) => {
    return {
      components: { Camera, Button },
      setup() {
        return () => (
          <Button {...args}>
            <Camera />
          </Button>
        )
      }
    }
  }
}

export const Switch: Story = {
  parameters: {
    controls: {
      include: ['size', 'disabled', 'default', 'checked', 'unstyled']
    }
  },
  args: {
    default: 'Switch',
    variant: 'switch',
    checked: true,
    size: 'base',
    onClick: fn()
  },
  render: (args) => {
    return {
      components: { Button },
      emits: ['update:checked'],
      setup() {
        const checked = ref(args.checked)
        watch(
          () => args.checked,
          (val) => {
            checked.value = val
          }
        )
        return () => (
          <Button
            {...args}
            checked={checked.value}
            onClick={() => (checked.value = !checked.value)}>
            {{
              default: () => args.default
            }}
          </Button>
        )
      }
    }
  }
}

export const WithTooltip: Story = {
  parameters: {
    controls: {
      exclude: ['class']
    },
    backgrounds: {
      default: 'light'
    }
  },
  args: {
    default: 'With Tooltip',
    variant: 'default',
    size: 'base',
    tooltip: 'Tooltip',
    tooltipTheme: 'default'
  },
  render: (args) => {
    return {
      components: { Button },
      setup() {
        return () => (
          <Button {...args}>
            {{
              default: () => args.default
            }}
          </Button>
        )
      }
    }
  }
}
