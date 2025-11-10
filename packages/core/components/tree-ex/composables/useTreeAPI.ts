import type { Reactive } from 'vue'
import type TreeStore from '../core/tree-store'
import type { AnyPropsArrayType } from '../core/types'
import type { TreeRootProps } from '../interface'
import { ref } from 'vue'

export function useTreeAPI(store: Reactive<TreeStore>, props: TreeRootProps) {
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
          store.setData(root as AnyPropsArrayType)
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
