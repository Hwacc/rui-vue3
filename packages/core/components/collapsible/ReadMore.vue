<script lang="ts">
import { HTMLAttributes } from 'vue';
import { CollapsibleRootProps, CollapsibleTriggerProps, createContext } from 'reka-ui';

export interface ReadMoreProps extends CollapsibleRootProps {
  disableRuiClass?: boolean;
  triggerProps?: CollapsibleTriggerProps & {
    class?: HTMLAttributes['class'];
    viewLessText?: string;
    viewMoreText?: string;
  };
  contentProps?: ReadMoreContentProps & {
    class?: HTMLAttributes['class'];
  };
}

export interface ReadMoreContext {
  showTrigger?: Ref<boolean>;
}
export const [injectReadMoreContext, provideReadMoreContext] =
  createContext<ReadMoreContext>('ReadMoreContext');
</script>

<script setup lang="ts">
import { Collapsible, CollapsibleTrigger, readMoreRootVariant, readMoreTriggerVariant } from '.';
import { default as ReadMoreContent, ReadMoreContentProps } from './ReadMoreContent.vue';
import { useForwardPropsEmits, CollapsibleRootEmits } from 'reka-ui';
import { cn } from '@/core/lib/utils';
import { computed, Ref, ref } from 'vue';

const {
  triggerProps,
  contentProps,
  class: propsClass,
  disableRuiClass,
  ...props
} = defineProps<
  ReadMoreProps & {
    class?: HTMLAttributes['class'];
  }
>();
const emits = defineEmits<
  CollapsibleRootEmits & {
    contentFound: [void];
  }
>();

const delegateTriggerProps = computed(() => {
  const _delegete = {
    ...triggerProps,
  };
  delete _delegete?.class;
  delete _delegete?.viewLessText;
  delete _delegete?.viewMoreText;
  return _delegete;
});

const rootForwarded = useForwardPropsEmits(props, emits);
const contentForwarded = useForwardPropsEmits(contentProps ?? {});

const showTrigger = ref(false);
provideReadMoreContext({
  showTrigger,
});
</script>

<template>
  <Collapsible
    :class="cn(readMoreRootVariant({ disableRuiClass }), propsClass)"
    v-bind="rootForwarded"
    v-slot="{ open }"
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
        :class="cn(readMoreTriggerVariant({ disableRuiClass }), triggerProps?.class)"
        v-bind="delegateTriggerProps"
      >
        {{
          open
            ? triggerProps?.viewLessText ?? 'View Less'
            : triggerProps?.viewMoreText ?? 'View More'
        }}
      </CollapsibleTrigger>
    </slot>
    <ReadMoreContent v-bind="contentForwarded"  @content-found="emits('contentFound')">
      <template #default>
        <slot name="default" v-bind="{ open, showTrigger }"></slot>
      </template>
    </ReadMoreContent>
  </Collapsible>
</template>
