<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import type { LoadingStateHandler, VirtualInfiniteLoadingVariants } from '.'
import { LoaderCircle } from 'lucide-vue-next'
import { onMounted, onUnmounted, shallowRef, useTemplateRef, watch } from 'vue'
import { injectVirtualContext, LOADING_STATE, tvVirtualInfiniteLoading } from '.'

defineOptions({
  name: 'VirtualInfiniteLoading',
})
const {
  enableFirstLoad = true,
  enableRetry = true,
  unstyled = false,
  size = 'base',
  class: propsClass,
} = defineProps<{
  enableFirstLoad?: boolean
  enableRetry?: boolean
  unstyled?: boolean
  size?: VirtualInfiniteLoadingVariants['size']
  class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{ infinite: [$state: LoadingStateHandler] }>()
defineSlots<{
  loading: (props: {}) => any
  spinner: (props: {}) => any
  complete: (props: {}) => any
  error: (props: { retry: () => void }) => any
}>()

const context = injectVirtualContext()
const { infiniteState: state } = context

const el = useTemplateRef('el')
const stateHandler: LoadingStateHandler = {
  loading() {
    state.value = LOADING_STATE.LOADING
  },
  loaded() {
    state.value = LOADING_STATE.LOADED
  },
  complete() {
    state.value = LOADING_STATE.COMPLETE
  },
  error() {
    state.value = LOADING_STATE.ERROR
  },
}
function doInfinite() {
  stateHandler.loading()
  emit('infinite', stateHandler)
}

const observer = shallowRef<IntersectionObserver | null>(null)
onMounted(() => {
  if (state.value === LOADING_STATE.IDLE && enableFirstLoad) {
    doInfinite()
    return
  }
  if (state.value === LOADING_STATE.LOADED) {
    stateHandler.loading()
  }
  observer.value = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry.isIntersecting && state.value === LOADING_STATE.LOADING)
        doInfinite()
    },
    { root: context.parentEl?.value, rootMargin: '0px 0px 0px 0px' },
  )
  if (el.value)
    observer.value?.observe(el.value)
})

onUnmounted(() => {
  observer.value?.disconnect()
  observer.value = null
})

// measure infinite loading element
const { virtualizer } = injectVirtualContext()
watch(el, (el) => {
  if (virtualizer?.value && el)
    virtualizer.value.measureElement(el)
})

const { base, loading, spinner, complete, error } = tvVirtualInfiniteLoading()
</script>

<template>
  <div
    ref="el"
    :class="base({ size, unstyled, class: propsClass })"
  >
    <slot
      v-if="state === 'loading'"
      name="loading"
    >
      <div :class="loading({ size, unstyled })">
        <slot name="spinner">
          <LoaderCircle :class="spinner({ size, unstyled })" />
        </slot>
      </div>
    </slot>
    <slot
      v-else-if="state === 'complete'"
      name="complete"
    >
      <div :class="complete({ size, unstyled })">
        No more results!
      </div>
    </slot>
    <slot
      v-else-if="state === 'error'"
      name="error"
      :retry="doInfinite"
    >
      <div :class="error({ size, unstyled })">
        <span>Oops something went wrong!</span>
        <button
          v-if="enableRetry"
          class="retry"
          @click="doInfinite"
        >
          retry
        </button>
      </div>
    </slot>
  </div>
</template>
