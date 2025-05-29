import type { Ref } from 'vue'
import { injectConfigProviderContext } from 'reka-ui'
import { computed, ref } from 'vue'

export function useDirection(dir?: Ref<Direction | undefined>) {
  const context = injectConfigProviderContext({
    dir: ref('ltr'),
  })
  return computed(() => dir?.value || context.dir?.value || 'ltr')
}
