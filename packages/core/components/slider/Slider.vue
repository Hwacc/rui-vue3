<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { sliderClass, sliderRangeClass, sliderThumbClass, sliderTrackClass } from '.'

const { class: propsClass, ...props } = defineProps<
  SliderRootProps & { class?: HTMLAttributes['class'] }
>()
const emits = defineEmits<SliderRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SliderRoot :class="cn(sliderClass, propsClass)" v-bind="forwarded">
    <SliderTrack :class="sliderTrackClass">
      <SliderRange :class="sliderRangeClass" />
    </SliderTrack>
    <SliderThumb v-for="(_, key) in modelValue" :key="key" :class="sliderThumbClass" />
  </SliderRoot>
</template>
