<script lang="ts">
import { flatten } from 'lodash-es'
import { createContext, Primitive, RovingFocusGroup } from 'reka-ui'

const [injectTreeRootContext, provideTreeRootContext]
  = createContext<TreeRootContext<any>>('TreeRoot')

export { injectTreeRootContext }
</script>

<script
  setup
  lang="ts"
  generic="T extends Record<string, any>, U extends Record<string, any>, M extends boolean"
>
import type { Ref } from 'vue'
import type { FlattenedItem, TreeRootContext, TreeRootEmits, TreeRootProps } from './interface'
import { useDirection } from '@rui/core/hooks/useDirection'
import { useSelectionBehavior } from '@rui/core/hooks/useSelectionBehavior'
import { useTypeahead } from '@rui/core/hooks/useTypeahead'
import { getActiveElement } from '@rui/core/lib/element'
import { createEventHook, useVModel } from '@vueuse/core'
import { computed, nextTick, ref, toRefs } from 'vue'
import { MAP_KEY_TO_FOCUS_INTENT } from './constants'

const props = withDefaults(defineProps<TreeRootProps<T, U, M>>(), {
  as: 'ul',
  selectionBehavior: 'toggle',
  getChildren: (val: T) => val.children,
})
const emits = defineEmits<TreeRootEmits<U, M>>()

defineSlots<{
  default?: (props: {
    flattenItems: FlattenedItem<T>[]
    modelValue: M extends true ? U[] : U
    expanded: typeof expanded.value
  }) => any
}>()

const { items, multiple, disabled, propagateSelect, dir: propDir, bubbleSelect } = toRefs(props)
const { handleTypeaheadSearch } = useTypeahead()
const dir = useDirection(propDir)
const rovingFocusGroupRef = ref<InstanceType<typeof RovingFocusGroup>>()

// Virtualizer
const isVirtual = ref(false)
const virtualKeydownHook = createEventHook<KeyboardEvent>()

const modelValue = useVModel(props, 'modelValue', emits, {
  // @ts-expect-error idk
  defaultValue: props.defaultValue ?? (multiple.value ? [] : undefined),
  passive: (props.modelValue === undefined) as false,
  deep: true,
}) as Ref<U | U[]>

const expanded = useVModel(props, 'expanded', emits, {
  // @ts-expect-error idk
  defaultValue: props.defaultExpanded ?? [],
  passive: (props.expanded === undefined) as false,
  deep: true,
}) as Ref<string[]>

const { onSelectItem, handleMultipleReplace } = useSelectionBehavior(modelValue, props)

const selectedKeys = computed(() => {
  if (multiple.value && Array.isArray(modelValue.value))
    return modelValue.value.map(i => props.getKey(i as any))
  else return [props.getKey((modelValue.value as any) ?? {})]
})

function flattenItems(items: T[], level: number = 1, parentItem?: T): FlattenedItem<T>[] {
  return items.reduce((acc: FlattenedItem<T>[], item: T, index: number) => {
    const key = props.getKey(item)
    const children = props.getChildren(item)
    const isExpanded = expanded.value.includes(key)

    const flattenedItem: FlattenedItem<T> = {
      _id: key,
      value: item,
      index,
      level,
      parentItem,
      hasChildren: !!children,
      bind: {
        'value': item,
        level,
        'aria-setsize': items.length,
        'aria-posinset': index + 1,
      },
    }
    acc.push(flattenedItem)

    if (children && isExpanded)
      acc.push(...flattenItems(children, level + 1, item))

    return acc
  }, [])
}

const expandedItems = computed(() => {
  const items = props.items
  return flattenItems(items ?? [])
})

function handleKeydown(event: KeyboardEvent) {
  if (isVirtual.value) {
    virtualKeydownHook.trigger(event)
  }
  else {
    const collections = rovingFocusGroupRef.value?.getItems() ?? []
    handleTypeaheadSearch(event.key, collections)
  }
}

function handleKeydownNavigation(event: KeyboardEvent) {
  if (isVirtual.value)
    return
  const intent = MAP_KEY_TO_FOCUS_INTENT[event.key]
  nextTick(() => {
    handleMultipleReplace(
      intent,
      getActiveElement(),
      rovingFocusGroupRef.value?.getItems!,
      expandedItems.value.map(i => i.value),
    )
  })
}

function handleBubbleSelect(item: FlattenedItem<T>) {
  if (item.parentItem != null && Array.isArray(modelValue.value) && props.multiple) {
    const parentItem = expandedItems.value.find((i) => {
      return item.parentItem != null && props.getKey(i.value) === props.getKey(item.parentItem)
    })

    if (parentItem != null) {
      const areAllChilredOfParentSelected = props
        .getChildren(parentItem.value)
        ?.every(i => modelValue.value.find((v: any) => props.getKey(v) === props.getKey(i)))

      if (areAllChilredOfParentSelected) {
        modelValue.value = [...modelValue.value, parentItem.value as any]
      }
      else {
        modelValue.value = modelValue.value.filter(
          (v: any) => props.getKey(v) !== props.getKey(parentItem.value),
        )
      }

      handleBubbleSelect(parentItem)
    }
  }
}

provideTreeRootContext({
  modelValue,
  selectedKeys,
  onSelect: (val) => {
    const condition = (baseValue: U) => props.getKey((baseValue as any) ?? {}) === props.getKey(val)
    const exist
      = props.multiple && Array.isArray(modelValue.value)
        ? modelValue.value?.findIndex(condition) !== -1
        : undefined
    onSelectItem(val, condition)

    if (props.bubbleSelect && props.multiple && Array.isArray(modelValue.value)) {
      const item = expandedItems.value.find((i) => {
        return props.getKey(i.value) === props.getKey(val)
      })
      if (item != null) {
        handleBubbleSelect(item)
      }
    }

    if (props.propagateSelect && props.multiple && Array.isArray(modelValue.value)) {
      const children = flatten<any>(props.getChildren(val) ?? [])
      if (exist) {
        // remove all child
        modelValue.value = [...modelValue.value].filter(
          i =>
            !children.some(child => props.getKey((i as any) ?? {}) === props.getKey(child as any)),
        )
      }
      else {
        // select all child
        modelValue.value = [...modelValue.value, ...children]
      }
    }
  },
  expanded,
  onToggle(val) {
    const children = val ? props.getChildren(val) : undefined
    if (!children)
      return

    const key = props.getKey(val) ?? val
    if (expanded.value.includes(key))
      expanded.value = expanded.value.filter(val => val !== key)
    else expanded.value.push(key)
  },
  getKey: props.getKey,
  getChildren: props.getChildren,
  items,
  expandedItems,
  disabled,
  multiple,
  dir,
  propagateSelect,
  bubbleSelect,
  isVirtual,
  virtualKeydownHook,
  handleMultipleReplace,
})
</script>

<template>
  <RovingFocusGroup
    ref="rovingFocusGroupRef"
    as-child
    orientation="vertical"
    :dir="dir"
  >
    <Primitive
      role="tree"
      :as="as"
      :as-child="asChild"
      :aria-multiselectable="multiple ? true : undefined"
      @keydown="handleKeydown"
      @keydown.up.down.shift="handleKeydownNavigation"
    >
      <slot
        :flatten-items="expandedItems"
        :model-value="modelValue as M extends true ? U[] : U"
        :expanded="expanded"
      />
    </Primitive>
  </RovingFocusGroup>
</template>
