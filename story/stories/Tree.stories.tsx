import type { Meta, StoryObj } from '@storybook/vue3'
import { Tree } from '@rui/core/components/tree'
import { ref, watch } from 'vue'

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
  args: {
    getKey: item => item.title,
  },
  render: (args: any) => {
    return {
      setup() {
        const items = [
          {
            title: 'composables',
            icon: 'lucide:folder',
            children: [
              {
                title: 'useAuth.ts',
                icon: 'vscode-icons:file-type-typescript',
              },
              {
                title: 'useUser.ts',
                icon: 'vscode-icons:file-type-typescript',
              },
            ],
          },
          {
            title: 'components',
            icon: 'lucide:folder',
            children: [
              {
                title: 'Home',
                icon: 'lucide:folder',
                children: [
                  { title: 'Card.vue', icon: 'vscode-icons:file-type-vue' },
                  { title: 'Button.vue', icon: 'vscode-icons:file-type-vue' },
                ],
              },
            ],
          },
          { title: 'app.vue', icon: 'vscode-icons:file-type-vue' },
          { title: 'nuxt.config.ts', icon: 'vscode-icons:file-type-nuxt' },
        ]

        const treeRef = ref()

        watch(treeRef, (tree) => {
          console.log('tree', tree)
        })

        const modelValue = ref([])
        watch(modelValue, (value) => {
          console.log('modelValue', value)
        })

        return () => (
          <Tree
            v-model={modelValue.value}
            items={items}
            getKey={item => item.title}
            ref={treeRef}
            multiple
            bubbleSelect
            propagateSelect
          />
        )
      },
    }
  },
}
