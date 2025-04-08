<script setup lang="ts">
import type { SelectLabelProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/core/lib/utils';
import { injectSelectRootContext, SelectLabel } from 'reka-ui';
import { selectLabelVariants } from '.';

const props = defineProps<
  SelectLabelProps & { class?: HTMLAttributes['class']; unstyled?: boolean }
>();
const { multiple } = injectSelectRootContext();
</script>

<template>
  <SelectLabel
    :class="
      cn(
        selectLabelVariants({ unstyled: props.unstyled }),
        multiple && 'pl-8',
        props.class
      )
    "
  >
    <slot />
  </SelectLabel>
</template>
