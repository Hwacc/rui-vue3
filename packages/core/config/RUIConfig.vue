<script lang="ts" setup>
import type { IconifyIcon, IconifyJSON, PartialIconifyAPIConfig } from '@iconify/vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { addAPIProvider, addCollection, addIcon } from '@iconify/vue'
import { Messager } from '@rui/core/components/message'
import { Toaster } from '@rui/core/components/toast'
import { TooltipProvider } from '@rui/core/components/tooltip'
import { merge } from 'lodash-es'
import { computed } from 'vue'

const { tooltip, toaster, messager, iconify } = defineProps<{
  tooltip?: ComponentProps<typeof TooltipProvider>
  toaster?: ComponentProps<typeof Toaster>
  messager?: ComponentProps<typeof Messager>
  iconify?: {
    addIcons?: Array<[string, IconifyIcon | null]>
    addCollections?: Array<[IconifyJSON, string | undefined]>
    addAPIProviders?: Array<[string, PartialIconifyAPIConfig]>
  }
}>()

const tooltipOptions = computed(() => merge({}, tooltip))
const toasterOptions = computed(() => merge({ position: 'bottom-right', duration: 5000 }, toaster))
const messagerOptions = computed(() => merge({ duration: 2000 }, messager))

if (iconify?.addIcons) {
  iconify.addIcons.forEach(([icon, iconifyIcon]) => addIcon(icon, iconifyIcon))
}
if (iconify?.addCollections) {
  iconify.addCollections.forEach(([json, provider]) => {
    addCollection(json, provider)
  })
}
if (iconify?.addAPIProviders) {
  iconify.addAPIProviders.forEach(([provider, config]) => {
    addAPIProvider(provider, config)
  })
}
</script>

<template>
  <TooltipProvider v-bind="tooltipOptions">
    <slot />
    <Toaster v-bind="toasterOptions" />
    <Messager v-bind="messagerOptions" />
  </TooltipProvider>
</template>
