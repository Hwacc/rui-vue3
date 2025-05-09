<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from 'reka-ui'
import type { PopoverProviderExProps } from './PopoverProviderEx'
import { omit, pick } from 'lodash-es'
import { PopoverRoot, useForwardPropsEmits } from 'reka-ui'
import { PopoverProviderEx } from './PopoverProviderEx'

const props = defineProps<PopoverRootProps & PopoverProviderExProps>()
const emits = defineEmits<PopoverRootEmits>()

const forwarded = useForwardPropsEmits(
  pick(props, ['modal', 'open', 'defaultOpen']),
  emits,
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
