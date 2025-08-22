import type { HTMLAttributes, VNode } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type {
  ToastAction,
  ToastClose,
  ToastDescription,
  Toast as ToastRoot,
  ToastTitle,
} from '../toast'
import { computed, ref } from 'vue'

const MESSAGE_LIMIT = 1
const MESSAGE_REMOVE_DELAY = 200

export type MessagerToast = {
  id: string
  open?: boolean
  variant?: StatusVariants
  title?: string
  icon?: VNode | (() => VNode)
  unstyled?: boolean
  ui?: {
    root?: ComponentProps<typeof ToastRoot>
    title?: ComponentProps<typeof ToastTitle>
    description?: ComponentProps<typeof ToastDescription>
    action?: ComponentProps<typeof ToastAction>
    close?: ComponentProps<typeof ToastClose>
    icon?: {
      class?: HTMLAttributes['class']
    }
  }
  onOpenChange?: ((value: boolean) => void) | undefined
}

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof actionTypes
type Action
  = | {
    type: ActionType['ADD_TOAST']
    message: MessagerToast
  }
  | {
    type: ActionType['UPDATE_TOAST']
    message: Partial<MessagerToast>
  }
  | {
    type: ActionType['DISMISS_TOAST']
    messageId?: MessagerToast['id']
  }
  | {
    type: ActionType['REMOVE_TOAST']
    messageId?: MessagerToast['id']
  }

interface State {
  messages: MessagerToast[]
}

const messageTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

function addToRemoveQueue(msgId: string) {
  if (messageTimeouts.has(msgId))
    return

  const timeout = setTimeout(() => {
    messageTimeouts.delete(msgId)
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      messageId: msgId,
    })
  }, MESSAGE_REMOVE_DELAY)

  messageTimeouts.set(msgId, timeout)
}

const state = ref<State>({
  messages: [],
})

function dispatch(action: Action) {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      state.value.messages = [action.message, ...state.value.messages].slice(0, MESSAGE_LIMIT)
      break

    case actionTypes.UPDATE_TOAST:
      state.value.messages = state.value.messages.map(t =>
        t.id === action.message.id ? { ...t, ...action.message } : t,
      )
      break

    case actionTypes.DISMISS_TOAST: {
      const { messageId } = action
      if (messageId) {
        addToRemoveQueue(messageId)
      }
      else {
        state.value.messages.forEach((message) => {
          addToRemoveQueue(message.id)
        })
      }
      state.value.messages = state.value.messages.map(msg =>
        msg.id === messageId || messageId === undefined
          ? {
              ...msg,
              open: false,
            }
          : msg,
      )
      break
    }

    case actionTypes.REMOVE_TOAST:
      if (action.messageId === undefined) {
        state.value.messages = []
      }
      else {
        state.value.messages = state.value.messages.filter(msg => msg.id !== action.messageId)
      }
      break
  }
}

function useMessage() {
  return {
    messages: computed(() => state.value.messages),
    message,
    dismiss: (msgId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, messageId: msgId }),
  }
}

type Toast = Omit<MessagerToast, 'id'>

function message(props: Toast) {
  const id = `m-${genId()}`

  const update = (props: MessagerToast) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      message: { ...props, id },
    })

  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, messageId: id })

  dispatch({
    type: actionTypes.ADD_TOAST,
    message: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => { !open && dismiss() },
    },
  })

  return {
    id,
    dismiss,
    update,
  }
}

export { message, useMessage }
