import type { Meta, StoryObj } from '@storybook/vue3'
import { Tree } from '@rui/add-ons/components/tree'
import { reactive } from 'vue'

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
    return {
      setup() {
        const treeData = reactive([
          {
            id: 'static-node1',
            label: 'My First Node',
            children: [],
          },
          {
            id: 'static-node2',
            label: 'My Second Node',
            children: [
              {
                id: 'static-subnode1',
                label: 'This is a subnode',
                children: [],
              },
              {
                id: 'static-subnode2',
                label: 'This is another subnode',
                children: [
                  {
                    id: 'static-subsubnode1',
                    label: 'An even deeper node',
                    children: [],
                  },
                ],
              },
            ],
          },
        ])

        function modelDefaults() {
          return {
            expandable: false,
            state: {
              expanded: true,
            },
          }
        }

        return () => <Tree {...args} v-model={treeData} modelDefaults={modelDefaults} />
      },
    }
  },
}
