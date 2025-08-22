<!--
HACK:
Sometimes, we need a simple Trigger that is used only in the browser of a single environment.
This Select component only responds to mouse events and allows normal event bubbling,
so we have the opportunity to capture mouse events internally.
-->

<script lang="ts">
import type { PrimitiveProps, ReferenceElement } from 'reka-ui'
import { isEmpty } from 'lodash-es'
import { tvTrigger } from '.'

const OPEN_KEYS = [' ', 'Enter', 'ArrowUp', 'ArrowDown']
interface PopperAnchorProps extends PrimitiveProps {
  reference?: ReferenceElement
}
export interface SelectTriggerProps extends PopperAnchorProps {
  disabled?: boolean
}
</script>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  injectSelectRootContext,
  Primitive,
  SelectIcon,
  useForwardExpose,
  useForwardProps,
  useId,
} from 'reka-ui'
import { computed, onMounted, unref } from 'vue'
// @ts-expect-error reka-ui not export PopperAnchor
// eslint-disable-next-line antfu/no-import-dist, antfu/no-import-node-modules-by-path
import { PopperAnchor_default as PopperAnchor } from '../../node_modules/reka-ui/dist/Popper/PopperAnchor.js'

defineOptions({
  name: 'SelectMouseTrigger',
})

const {
  as,
  asChild,
  class: propsClass,
  unstyled,
  tabindex = 0,
  ...props
} = defineProps<
  SelectTriggerProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    tabindex?: HTMLAttributes['tabindex']
    ui?: {
      root?: {
        class?: HTMLAttributes['class']
      }
      icon?: {
        class?: HTMLAttributes['class']
      }
      triangle?: {
        class?: HTMLAttributes['class']
      }
    }
  }
>()

const forwarded = useForwardProps(props)
const rootContext = injectSelectRootContext()
const { forwardRef, currentElement: triggerElement } = useForwardExpose()

const isDisabled = computed(() => rootContext.disabled?.value || forwarded.value.disabled)

rootContext.contentId ||= useId(undefined, 'reka-select-content')
const { base, icon, triangle } = tvTrigger()

onMounted(() => {
  rootContext.onTriggerChange(triggerElement.value)
})
</script>

<!-- FIXED: we found that if primitive as 'button' or any focusable element, it will trigger the click event -->
<!-- so we force use div as the primitive element and add tabindex to make it focusable -->
<template>
  <PopperAnchor
    as-child
    :reference="forwarded.reference"
  >
    <Primitive
      :ref="forwardRef"
      :class="base({ unstyled, class: [ui?.root?.class, propsClass] })"
      role="combobox"
      :aria-controls="rootContext.contentId"
      :aria-expanded="rootContext.open.value || false"
      :aria-required="rootContext.required?.value"
      aria-autocomplete="none"
      :disabled="isDisabled"
      :dir="rootContext?.dir.value"
      :data-state="rootContext?.open.value ? 'open' : 'closed'"
      :data-disabled="isDisabled ? '' : undefined"
      :data-placeholder="!isEmpty(rootContext.modelValue?.value) ? undefined : ''"
      as="div"
      :tabindex="tabindex"
      :as-child="asChild"
      :type="undefined"
      @click="
        (event: MouseEvent) => {
          (event?.currentTarget as HTMLElement)?.focus()
          !isDisabled && rootContext.onOpenChange(true)
        }
      "
      @keydown="
        (event: any) => {
          const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
          if (!isModifierKey && event.key.length === 1) if (event.key === ' ') return;
          if (OPEN_KEYS.includes(event.key)) {
            !isDisabled && rootContext.onOpenChange(true);
            event.preventDefault();
          }
        }
      "
    >
      <slot />
      <slot
        name="icon"
        v-bind="{ open: unref(rootContext.open) }"
      >
        <SelectIcon
          as="i"
          :class="icon({ unstyled, class: ui?.icon?.class })"
          :data-state="unref(rootContext.open) ? 'open' : 'closed'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            view-box="0 0 7 3"
            :class="
              triangle({ unstyled, open: unref(rootContext.open), class: ui?.triangle?.class })
            "
            :data-state="unref(rootContext.open) ? 'open' : 'closed'"
          >
            <path d="M0 0 L3.5 3 L7 0 Z" />
          </svg>
        </SelectIcon>
      </slot>
    </Primitive>
  </PopperAnchor>
</template>
