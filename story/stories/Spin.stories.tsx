import type { Meta, StoryObj } from '@storybook/vue3'
import { Spin, SpinProvider } from '@rui/core/components/spin'
import { LoaderCircle } from 'lucide-vue-next'

const meta = {
  title: 'RUI/Spin',
  component: Spin,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      options: ['default', 'fullscreen'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Spin>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: true,
  },
  render: (args) => {
    return {
      components: { Spin },
      setup() {
        return () => {
          return (
            <SpinProvider>
              {{
                icon: () => <LoaderCircle class="animate-spin" />,
                default: () => {
                  return (
                    <div class="w-[400px] h-[400px] bg-hff">
                      <Spin {...args} />
                    </div>
                  )
                },
              }}
            </SpinProvider>
          )
        }
      },
    }
  },
}
