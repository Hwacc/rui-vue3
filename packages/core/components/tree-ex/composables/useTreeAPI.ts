import type { Reactive } from 'vue'
import type TreeStore from '../core/tree-store'
import type { TreeRootProps } from '../interface'
import { ref } from 'vue'

export function useTreeAPI<T extends Record<string, any>>(
  store: Reactive<TreeStore<T>>,
  props: TreeRootProps<T>,
) {
  const isRootLoading = ref(false)

  async function loadRootNodes() {
    isRootLoading.value = true
    try {
      try {
        const root = await new Promise((resolve, reject) => {
          if (props.load)
            props.load(null, resolve, reject)
        })
        if (Array.isArray(root)) {
          store.setData(root as T[])
        }
      }
      catch {}
    }
    finally {
      isRootLoading.value = false
    }
  }
  return {
    isRootLoading,
    loadRootNodes,
  }
}
