<script setup lang="ts">
import { Input } from '@rui/core/components/input'
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '@rui/core/components/tooltip'
import { Star } from 'lucide-vue-next'
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <div class="flex gap-4 items-center">
      <Input class="w-[12.5rem]" placeholder="Default Input" clearable>
        <template #prefix>
          <Tooltip :delay-duration="0">
            <TooltipTrigger>
              <Star class="size-3" />
            </TooltipTrigger>
            <TooltipContent align="start">
              Prefix Star
              <TooltipArrow variant="css" :width="6" :height="3" />
            </TooltipContent>
          </Tooltip>
        </template>
        <template #suffix>
          <Tooltip :delay-duration="0">
            <TooltipTrigger>
              <Star class="size-3" />
            </TooltipTrigger>
            <TooltipContent>
              Suffix Star
              <TooltipArrow />
            </TooltipContent>
          </Tooltip>
        </template>
      </Input>
      <Input size="lg" placeholder="Large input" />
      <Input size="sm" placeholder="Small input" />
      <Input readonly placeholder="Readonly input" model-value="Readonly input" />
      <Input disabled placeholder="Disabled input" />
    </div>
  </div>
</template>
