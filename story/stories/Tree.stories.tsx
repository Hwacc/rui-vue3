import type { Meta, StoryObj } from '@storybook/vue3'
import { Tree } from '@rui/add-ons/components/tree1'
import { ref } from 'vue'

const meta = {
  title: 'RUI/Tree',
  component: Tree,
  subcomponents: {},
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Tree>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {},
  render: (args: any) => {
    const data = ref([
      {
        title: 'node-1',
        id: 'node-1',
        children: [
          {
            title: 'node-1-1',
            id: 'node-1-1',
            children: [
              {
                title: 'node-1-1-1',
                id: 'node-1-1-1',
              },
              {
                title: 'node-1-1-2',
                id: 'node-1-1-2',
              },
              {
                title: 'node-1-1-3',
                id: 'node-1-1-3',
              },
            ],
          },
          {
            title: 'node-1-2',
            id: 'node-1-2',
            children: [
              {
                title: 'node-1-2-1',
                id: 'node-1-2-1',
              },
              {
                title: 'node-1-2-2',
                id: 'node-1-2-2',
              },
            ],
          },
          {
            title: 'node-1-3',
            id: 'node-1-3',
            children: [
              {
                title: 'node-1-3-1',
                id: 'node-1-3-1',
              },
              {
                title: 'node-1-3-2',
                id: 'node-1-3-2',
              },
            ],
          },
        ],
      },
      {
        title: 'node-2',
        id: 'node-2',
        children: [
          {
            title: 'node-2-1',
            id: 'node-2-1',
            children: [
              {
                title: 'node-2-1-1',
                id: 'node-2-1-1',
              },
              {
                title: 'node-2-1-2',
                id: 'node-2-1-2',
              },
            ],
          },
        ],
      },
    ])
    return {
      setup() {
        return () => <Tree {...args} data={data.value} />
      },
    }
  },
}
