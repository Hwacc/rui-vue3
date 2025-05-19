import type { Meta, StoryObj } from '@storybook/vue3'
import { Spin, SpinProvider } from '@rui/core/components/spin'

import { VueSpinner, VueSpinnerDots } from 'vue3-spinners-css'
import 'vue3-spinners-css/css'

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
    show: true,
  },
  render: (args) => {
    return {
      components: { Spin, VueSpinner },
      setup() {
        return () => {
          return (
            <SpinProvider>
              {{
                default: () => {
                  return (
                    <div class="w-[400px] h-[400px] bg-h00">
                      <Spin {...args}></Spin>
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

export const WithVueSpinners: Story = {
  args: {
    show: true,
  },
  render: (args) => {
    return {
      components: { Spin, VueSpinner },
      setup() {
        return () => {
          return (
            <SpinProvider>
              {{
                icon: ({ mode }: any) => {
                  return mode === 'fullscreen'
                    ? (
                        <VueSpinnerDots color="#44D62C" />
                      )
                    : (
                        <VueSpinner color="#44D62C" />
                      )
                },
                default: () => {
                  return (
                    <div class="w-[400px] h-[400px] bg-h00">
                      <Spin {...args}></Spin>
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
