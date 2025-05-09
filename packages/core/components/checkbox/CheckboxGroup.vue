<script lang="ts">
import { createContext, Primitive, useForwardPropsEmits } from 'reka-ui'

interface CheckboxGroupContext {
  size: Ref<CheckboxVariantsProps['size']>
  unstyled: Ref<boolean>
  collection: Ref<string[]>
  onChecked: (
    name?: string,
    value?: boolean | 'indeterminate' | null,
    isPrimary?: boolean
  ) => void
  setCheckboxInstance: (
    instance: ComponentInternalInstance | null,
    isPrimary: boolean
  ) => void
}
export const [injectCheckboxGroupContext, provideCheckboxGroupContext]
  = createContext<CheckboxGroupContext>('CheckboxGroup')
</script>

<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { ComponentInternalInstance, HTMLAttributes, Ref } from 'vue'
import type { CheckboxVariantsProps } from '.'
import { union } from 'lodash-es'
import { reactive, ref, toRefs, unref, watch, watchEffect } from 'vue'

const {
  class: propsClass,
  collection: propsCollection = [],
  ...props
} = defineProps<
  PrimitiveProps & {
    class?: HTMLAttributes['class']
    size?: CheckboxVariantsProps['size']
    collection?: string[]
    unstyled?: boolean
  }
>()

const emits = defineEmits<{
  'update:collection': [collection: string[]]
  'change': [collection: string[]]
}>()

const innerCollection = ref(propsCollection)
watch(
  () => propsCollection,
  (val) => {
    innerCollection.value = val
  },
)

const treeStructure = reactive<{
  primary?: ComponentInternalInstance
  children?: ComponentInternalInstance[]
}>({
  primary: undefined,
  children: [],
})
const isAllChecked = ref(false)
const isIndeterminate = ref(false)

watchEffect(
  () => {
    const _oneChecked = treeStructure.children?.some((checkbox) => {
      return unref(checkbox.exposed?.innerModelValue)
    })
    const _allChecked = treeStructure.children?.every((checkbox) => {
      return unref(checkbox.exposed?.innerModelValue)
    })
    if (treeStructure.primary) {
      treeStructure.primary.exposed?.setChecked(
        _allChecked ? true : _oneChecked ? 'indeterminate' : false,
      )
    }
    isAllChecked.value = _allChecked as boolean
    isIndeterminate.value = (!_allChecked && _oneChecked) as boolean
  },
  { flush: 'post' },
)

const { size, unstyled } = toRefs(props)
provideCheckboxGroupContext({
  size,
  unstyled,
  collection: innerCollection,
  onChecked: (
    name?: string,
    value?: boolean | 'indeterminate' | null,
    isPrimary?: boolean,
  ) => {
    if (value !== 'indeterminate') {
      if (!isPrimary && name) {
        value
          ? (innerCollection.value = [
              ...new Set([...innerCollection.value, name]),
            ])
          : (innerCollection.value = innerCollection.value.filter(
              item => item !== name,
            ))
      }
      else if (isPrimary) {
        const _allChildrenNames
          = treeStructure.children?.map(item => item.exposed?.name) || []
        if (value) {
          innerCollection.value = union(
            innerCollection.value,
            _allChildrenNames,
          )
        }
        else {
          innerCollection.value = innerCollection.value.filter(
            item => !_allChildrenNames.includes(item),
          )
        }
      }
      emits('change', innerCollection.value)
      emits('update:collection', innerCollection.value)
    }
  },
  setCheckboxInstance: (instance, isPrimary) => {
    if (instance) {
      if (isPrimary) {
        treeStructure.primary = instance
      }
      else {
        treeStructure.children?.push(instance)
      }
    }
  },
})

defineExpose({
  isAllChecked,
  isIndeterminate,
})
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Primitive :class="propsClass" v-bind="forwarded">
    <slot />
  </Primitive>
</template>
