<script lang="ts">
import { createContext } from 'reka-ui';
interface CheckboxGroupContext {
  collection: Ref<string[]>;
  onChecked: (name?: string, value?: boolean | 'indeterminate' | null, isPrimary?: boolean) => void;
  setCheckboxInstance: (instance: ComponentInternalInstance | null, isPrimary: boolean) => void;
}
export const [injectCheckboxGroupContext, provideCheckboxGroupContext] =
  createContext<CheckboxGroupContext>('CheckboxGroupContext');
</script>

<script setup lang="ts">
import { Primitive, useForwardPropsEmits, type PrimitiveProps } from 'reka-ui';
import {
  ComponentInternalInstance,
  HTMLAttributes,
  reactive,
  Ref,
  ref,
  unref,
  watch,
  watchEffect,
} from 'vue';
import { union } from 'lodash-es';

const {
  class: propsClass,
  collection: propsCollection = [],
  includePrimaryName = false,
  ...props
} = defineProps<
  PrimitiveProps & {
    class?: HTMLAttributes['class'];
    collection?: string[];
    includePrimaryName?: boolean;
  }
>();
const emits = defineEmits<{
  'update:collection': [collection: string[]];
  change: [collection: string[]];
}>();

const innerCollection = ref(propsCollection);
watch(
  () => propsCollection,
  (val) => {
    innerCollection.value = val;
  }
);

const treeStructure = reactive<{
  primary?: ComponentInternalInstance;
  children?: ComponentInternalInstance[];
}>({
  primary: undefined,
  children: [],
});
const isAllChecked = ref(false);
const isIndeterminate = ref(false);

watchEffect(
  () => {
    const _oneChecked = treeStructure.children?.some((checkbox) => {
      return unref(checkbox.exposed?.innerModelValue);
    });
    const _allChecked = treeStructure.children?.every((checkbox) => {
      return unref(checkbox.exposed?.innerModelValue);
    });
    if (treeStructure.primary) {
      treeStructure.primary.exposed?.setChecked(
        _allChecked ? true : _oneChecked ? 'indeterminate' : false
      );
    }
    isAllChecked.value = _allChecked as boolean;
    isIndeterminate.value = (!_allChecked && _oneChecked) as boolean;
  },
  { flush: 'post' }
);

provideCheckboxGroupContext({
  collection: innerCollection,
  onChecked: (name?: string, value?: boolean | 'indeterminate' | null, isPrimary?: boolean) => {
    if (value === 'indeterminate') {
      return;
    } else {
      if (!isPrimary && name) {
        value
          ? (innerCollection.value = [...new Set([...innerCollection.value, name])])
          : (innerCollection.value = innerCollection.value.filter((item) => item !== name));
      } else if (isPrimary) {
        const _allChildrenNames = treeStructure.children?.map((item) => item.exposed?.name) || [];
        if (value) {
          innerCollection.value = union(innerCollection.value, _allChildrenNames);
          console.log('after union', innerCollection.value);
        } else {
          innerCollection.value = innerCollection.value.filter(
            (item) => !_allChildrenNames.includes(item)
          );
        }
      }
      emits('change', innerCollection.value);
      emits('update:collection', innerCollection.value);
    }
  },
  setCheckboxInstance: (instance, isPrimary) => {
    if (instance) {
      if (isPrimary) {
        treeStructure.primary = instance;
      } else {
        treeStructure.children?.push(instance);
      }
    }
  },
});

defineExpose({
  isAllChecked,
  isIndeterminate,
});
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <Primitive :class="propsClass" v-bind="forwarded">
    <slot></slot>
  </Primitive>
</template>
