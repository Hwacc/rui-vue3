<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from 'reka-ui'
import { PopoverRoot, useForwardPropsEmits } from 'reka-ui'
import { PopoverProviderEx, PopoverProviderExProps } from './PopoverProviderEx'
import { omit, pick } from 'lodash-es'

const props = defineProps<PopoverRootProps & PopoverProviderExProps>()
const emits = defineEmits<PopoverRootEmits>()

const forwarded = useForwardPropsEmits(
  pick(props, ['modal', 'open', 'defaultOpen']),
  emits
)
</script>

<template>
  <PopoverRoot v-bind="forwarded">
    <PopoverProviderEx
      v-bind="{ ...omit(props, ['modal', 'open', 'defaultOpen']) }"
    >
      <slot />
    </PopoverProviderEx>
  </PopoverRoot>
</template>
