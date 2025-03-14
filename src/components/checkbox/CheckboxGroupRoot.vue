<script lang="ts">
import { createContext } from 'radix-vue';
interface CheckboxGroupRootContext {
  collection: Ref<string[]>;
  indeterminateCollection: Ref<string[]>;
  onCheckboxChecked: (
    name?: string,
    value?: boolean | 'indeterminate',
    isPrimary?: boolean
  ) => void;
}
export const [injectCheckboxGroupRootContext, provideCheckboxGroupRootContext] =
  createContext<CheckboxGroupRootContext>('CheckboxGroupRootContext');
</script>

<script setup lang="ts">
import { Primitive, useForwardPropsEmits, type PrimitiveProps } from 'radix-vue';
import { HTMLAttributes, Ref, ref, watch } from 'vue';

const {
  class: propsClass,
  collection: propsCollection = [],
  ...props
} = defineProps<PrimitiveProps & { class?: HTMLAttributes['class']; collection?: string[] }>();
const emits = defineEmits<{
  'update:collection': [collection: string[]];
  change: [collection: string[]];
}>();
const forwarded = useForwardPropsEmits(props, emits);

const innerCollection = ref(propsCollection);
const innerIndeterminateCollection = ref<string[]>([]);
watch(
  () => propsCollection,
  (val) => {
    innerCollection.value = val;
  }
);
watch(innerCollection, () => {
  emits('change', innerCollection.value);
  emits('update:collection', innerCollection.value);
});

provideCheckboxGroupRootContext({
  collection: innerCollection,
  indeterminateCollection: innerIndeterminateCollection,
  onCheckboxChecked(name, value, isPrimary) {
    if (value === 'indeterminate') {
      name && (innerIndeterminateCollection.value = [...innerIndeterminateCollection.value, name]);
    } else {
      name &&
        (innerIndeterminateCollection.value = innerIndeterminateCollection.value.filter(
          (item) => item !== name
        ));
      if (!isPrimary) {
        if (value) {
          name &&
            !innerCollection.value.includes(name) &&
            (innerCollection.value = [...innerCollection.value, name]);
        } else {
          name &&
            innerCollection.value.includes(name) &&
            (innerCollection.value = innerCollection.value.filter((item) => item !== name));
        }
      }
    }
  }
});
</script>

<template>
  <Primitive :class="propsClass" v-bind="forwarded">
    <slot></slot>
  </Primitive>
</template>
