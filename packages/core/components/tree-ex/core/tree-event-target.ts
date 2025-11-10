import type TreeNode from './tree-node'
import type { TreeNodeKeyType } from './types'

interface IListenersMap {
  [eventName: string]: Function[]
}

type NodeGeneralListenerType = <T extends Record<string, any>>(node: TreeNode<T>) => void

export type ListenerType<T extends keyof IEventNames<any>> = IEventNames<any>[T]

export interface IEventNames<K extends Record<string, any>> {
  'set-data': () => void
  'visible-data-change': () => void
  'render-data-change': () => void
  'expand': NodeGeneralListenerType
  'select': NodeGeneralListenerType
  'unselect': NodeGeneralListenerType
  'selected-change': (
    node: TreeNode<K> | null,
    key: TreeNodeKeyType | null,
  ) => void
  'check': NodeGeneralListenerType
  'uncheck': NodeGeneralListenerType
  'checked-change': (nodes: TreeNode<K>[], keys: TreeNodeKeyType[]) => void
}

export default class TreeEventTarget {
  /** 事件 listeners */
  private listenersMap: IListenersMap = {}

  on<T extends keyof IEventNames<any>>(
    eventName: T,
    listener: ListenerType<T> | Array<ListenerType<T>>,
  ): void {
    if (!this.listenersMap[eventName]) {
      this.listenersMap[eventName] = []
    }
    let listeners: Array<ListenerType<T>> = []
    if (!Array.isArray(listener)) {
      listeners = [listener]
    }
    else {
      listeners = listener
    }
    listeners.forEach((listener) => {
      if (!this.listenersMap[eventName].includes(listener)) {
        this.listenersMap[eventName].push(listener)
      }
    })
  }

  off<T extends keyof IEventNames<any>>(
    eventName: T,
    listener?: ListenerType<T>,
  ): void {
    if (!this.listenersMap[eventName])
      return
    if (!listener) {
      this.listenersMap[eventName] = []
    }
    else {
      const index = this.listenersMap[eventName].indexOf(listener)
      if (index > -1) {
        this.listenersMap[eventName].splice(index, 1)
      }
    }
  }

  emit<T extends keyof IEventNames<any>>(
    eventName: T,
    ...args: Parameters<IEventNames<any>[T]>
  ): void {
    if (!this.listenersMap[eventName])
      return
    const length: number = this.listenersMap[eventName].length
    for (let i: number = 0; i < length; i++) {
      this.listenersMap[eventName][i](...args)
    }
  }

  disposeListeners(): void {
    for (const eventName in this.listenersMap) {
      this.listenersMap[eventName] = []
    }
  }
}
