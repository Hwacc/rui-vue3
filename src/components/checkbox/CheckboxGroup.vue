<script lang="ts">
import { createContext } from 'radix-vue';
import { injectCheckboxGroupRootContext } from './CheckboxGroupRoot.vue';
interface CheckboxGroupContext {
  collection: Ref<string[]>;
  indeterminateCollection: Ref<string[]>;
  onChecked: (name?: string, value?: boolean | 'indeterminate', isPrimary?: boolean) => void;
  setCheckboxInstance: (instance: ComponentInternalInstance | null, isPrimary: boolean) => void;
  setGroupInstance: (instance: ComponentInternalInstance | null) => void;
}
export const [injectCheckboxGroupContext, provideCheckboxGroupContext] =
  createContext<CheckboxGroupContext>('CheckboxGroupContext');
</script>

<script setup lang="ts">
import { Primitive, useForwardPropsEmits, type PrimitiveProps } from 'radix-vue';
import {
  ComponentInternalInstance,
  getCurrentInstance,
  HTMLAttributes,
  reactive,
  Ref,
  ref,
  watch,
  watchEffect,
} from 'vue';
import { union } from 'lodash-es';

/**
 * creat checkbox group root context, if not exist it will be null
 */
const groupRootContext = injectCheckboxGroupRootContext(null);
/**
 * create checkbox group context, if not exist it will be null
 */
const groupContext = injectCheckboxGroupContext(null);
groupContext && groupContext.setGroupInstance(getCurrentInstance());

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
const forwarded = useForwardPropsEmits(props, emits);

let innerCollection = ref(propsCollection);
const innerIndeterminateCollection = ref<string[]>([]);

if (groupRootContext) {
  innerCollection = groupRootContext.collection;
} else {
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
}

const treeStructure = reactive<{
  primary?: ComponentInternalInstance;
  children?: ComponentInternalInstance[];
  childrenGroup?: ComponentInternalInstance[];
}>({
  primary: undefined,
  children: [],
  childrenGroup: [],
});
const isAllChecked = ref(false);
const isIndeterminate = ref(false);
watchEffect(
  () => {
    const _oneChecked =
      treeStructure.children?.some((checkbox) => {
        return checkbox.vnode.component?.exposed?.innerChecked.value;
      }) ||
      treeStructure.childrenGroup?.some((group) => {
        return (
          group.vnode.component?.exposed?.isAllChecked.value ||
          group.vnode.component?.exposed?.isIndeterminate.value
        );
      });
    let _allChecked = treeStructure.children?.every((checkbox) => {
      return checkbox.vnode.component?.exposed?.innerChecked.value;
    });
    if (treeStructure.childrenGroup?.length) {
      _allChecked =
        _allChecked &&
        treeStructure.childrenGroup?.every((group) => {
          return group.vnode.component?.exposed?.isAllChecked.value;
        });
    }
    if (treeStructure.primary) {
      treeStructure.primary.vnode.component?.exposed?.setChecked(
        _allChecked ? true : _oneChecked ? 'indeterminate' : false
      );
    }
    isAllChecked.value = _allChecked as boolean;
    isIndeterminate.value = (!_allChecked && _oneChecked) as boolean;
  },
  { flush: 'post' }
);

const setPrimaryChecked = (checked: boolean | undefined) => {
  const _allChildrenNames =
    treeStructure.children?.map((item) => item.vnode.component?.exposed?.name) || [];
  if (checked) {
    innerCollection.value = union(innerCollection.value, _allChildrenNames);
  } else {
    innerCollection.value = innerCollection.value.filter((item) => {
      return !_allChildrenNames.includes(item);
    });
  }
  if (treeStructure.childrenGroup?.length) {
    treeStructure.childrenGroup.forEach((group) => {
      group.vnode.component?.exposed?.setPrimaryChecked(checked);
    });
  }
};

provideCheckboxGroupContext({
  collection: innerCollection,
  indeterminateCollection: innerIndeterminateCollection,
  onChecked: (name?: string, value?: boolean | 'indeterminate', isPrimary?: boolean) => {
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
      if (treeStructure.primary && isPrimary) {
        setPrimaryChecked(value);
      }
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
  setGroupInstance: (instance) => {
    if (instance) {
      treeStructure.childrenGroup?.push(instance);
    }
  },
});

defineExpose({
  isAllChecked,
  isIndeterminate,
  setPrimaryChecked,
});
</script>

<template>
  <Primitive :class="propsClass" v-bind="forwarded">
    <slot></slot>
  </Primitive>
</template>
