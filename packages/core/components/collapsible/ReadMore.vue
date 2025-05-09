<script lang="ts">
import type {
  CollapsibleRootEmits,
  CollapsibleRootProps,
  CollapsibleTriggerProps,
} from 'reka-ui'
import type { HTMLAttributes, Ref } from 'vue'
import {
  createContext,
  useForwardPropsEmits,
} from 'reka-ui'

export interface ReadMoreProps extends CollapsibleRootProps {
  unstyled?: boolean
  triggerProps?: CollapsibleTriggerProps & {
    class?: HTMLAttributes['class']
    viewLessText?: string
    viewMoreText?: string
  }
  contentProps?: ReadMoreContentProps & {
    class?: HTMLAttributes['class']
  }
}

export interface ReadMoreContext {
  showTrigger?: Ref<boolean>
}
export const [injectReadMoreContext, provideReadMoreContext]
  = createContext<ReadMoreContext>('ReadMoreContext')
</script>

<script setup lang="ts">
import type {
  ReadMoreContentProps,
} from './ReadMoreContent.vue'
import { cn } from '@rui/core/lib/utils'
import { computed, ref } from 'vue'
import {
  Collapsible,
  CollapsibleTrigger,
  readMoreRootVariant,
  readMoreTriggerVariant,
} from '.'
import ReadMoreContent from './ReadMoreContent.vue'

const {
  triggerProps,
  contentProps,
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  ReadMoreProps & {
    class?: HTMLAttributes['class']
  }
>()
const emits = defineEmits<
  CollapsibleRootEmits & {
    contentFound: [void]
  }
>()

const delegateTriggerProps = computed(() => {
  const _delegete = {
    ...triggerProps,
  }
  delete _delegete?.class
  delete _delegete?.viewLessText
  delete _delegete?.viewMoreText
  return _delegete
})

const rootForwarded = useForwardPropsEmits(props, emits)
const contentForwarded = useForwardPropsEmits(contentProps ?? {})

const showTrigger = ref(false)
provideReadMoreContext({
  showTrigger,
})
</script>

<template>
  <Collapsible
    v-slot="{ open }"
    :class="cn(readMoreRootVariant({ unstyled }), propsClass)"
    v-bind="rootForwarded"
  >
    <slot
      name="trigger"
      v-bind="{
        open,
        showTrigger,
        viewLessText: triggerProps?.viewLessText,
        viewMoreText: triggerProps?.viewMoreText,
      }"
    >
      <CollapsibleTrigger
        v-if="showTrigger"
        :class="cn(readMoreTriggerVariant({ unstyled }), triggerProps?.class)"
        v-bind="delegateTriggerProps"
      >
        {{
          open
            ? triggerProps?.viewLessText ?? 'View Less'
            : triggerProps?.viewMoreText ?? 'View More'
        }}
      </CollapsibleTrigger>
    </slot>
    <ReadMoreContent
      v-bind="contentForwarded"
      @content-found="emits('contentFound')"
    >
      <template #default>
        <slot name="default" v-bind="{ open, showTrigger }" />
      </template>
    </ReadMoreContent>
  </Collapsible>
</template>
