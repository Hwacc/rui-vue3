import type { Meta, StoryObj } from '@storybook/vue3'
import { CheckboxGroup, Checkbox } from '@core/components/checkbox'
import { toRefs } from 'vue'
import { fn } from '@storybook/test'

const meta = {
  title: 'RUI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'radio', options: [true, false, 'indeterminate'] },
    size: { control: 'radio', options: ['base', 'sm', 'lg'] },
    indicator: { control: false },
    label: { control: 'text' },
    stopPropagation: { control: 'boolean' },
    disableRuiClass: { control: 'boolean' }
  }
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    size: 'base'
  }
}

type WithCheckboxGroup = Story & {
  args: {
    collection: string[]
    onChange: () => void
  }
}
export const WithCheckboxGroup: WithCheckboxGroup = {
  parameters: {
    controls: {
      exclude: ['class', 'modelValue']
    }
  },
  args: {
    size: 'base',
    collection: ['1'],
    disableRuiClass: false,
    onChange: fn()
  },
  render: (args) => {
    return {
      components: { CheckboxGroup, Checkbox },
      setup() {
        const { size, collection, onChange, disableRuiClass } =
          toRefs<any>(args)
        return () => (
          <CheckboxGroup
            class='flex flex-col gap-2'
            v-model:collection={collection.value}
            size={size.value}
            onChange={onChange.value}>
            <Checkbox
              disableRuiClass={disableRuiClass?.value}
              primary
              label='Primary'
            />
            <Checkbox
              disableRuiClass={disableRuiClass?.value}
              name='1'
              label='Checkbox 1'
            />
            <Checkbox
              disableRuiClass={disableRuiClass?.value}
              name='2'
              label='Checkbox 2'
            />
            <Checkbox
              disableRuiClass={disableRuiClass?.value}
              name='3'
              label='Checkbox 3'
            />
          </CheckboxGroup>
        )
      }
    }
  }
}
