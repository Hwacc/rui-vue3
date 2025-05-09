<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipTrigger, TooltipArrow } from '@rui/core/components/tooltip';
import { Star } from 'lucide-vue-next';
import { Input } from '@rui/core/components/input';
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
              <TooltipArrow variant="css" :width="6" :height="3"></TooltipArrow>
            </TooltipContent>
          </Tooltip>
        </template>
        <template #suffix>
          <Tooltip :delayDuration="0">
            <TooltipTrigger>
              <Star class="size-3" />
            </TooltipTrigger>
            <TooltipContent>
              Suffix Star
              <TooltipArrow></TooltipArrow>
            </TooltipContent>
          </Tooltip>
        </template>
      </Input>
      <Input size="lg" placeholder="Large input" />
      <Input size="sm" placeholder="Small input" />
      <Input readonly placeholder="Readonly input" modelValue="Readonly input" />
      <Input disabled placeholder="Disabled input" />
    </div>
  </div>
</template>
