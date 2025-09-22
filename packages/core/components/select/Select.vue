<script lang="tsx" setup>
import type { SelectRootEmits, SelectRootProps } from 'reka-ui'
import type { HTMLAttributes, PropType } from 'vue'
import { SelectRoot, useForwardPropsEmits } from 'reka-ui'
import { defineComponent, ref } from 'vue'
import { tvSelect } from '.'
import { provideSelectRootContextEx } from './SelectRootContextEx'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  SelectRootProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const emits = defineEmits<SelectRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<script lang="tsx">
const Select = defineComponent({
  name: 'RSelect',
  props: {
    class: {
      type: [String, Object, Array] as PropType<HTMLAttributes['class']>,
      default: '',
    },
    unstyled: {
      type: Boolean,
      default: false,
    },
  },
  setup(subProps, { slots: subSlots }) {
    const rootElement = ref<HTMLElement | undefined>(undefined)
    provideSelectRootContextEx({
      rootElement,
    })
    return () => {
      return (
        <div
          ref={rootElement}
          class={tvSelect({ class: subProps.class, unstyled: subProps.unstyled })}
        >
          {subSlots.default?.()}
        </div>
      )
    }
  },
})
</script>

<template>
  <SelectRoot v-bind="forwarded">
    <Select
      :class="propsClass"
      :unstyled="unstyled"
    >
      <slot />
    </Select>
  </SelectRoot>
</template>
