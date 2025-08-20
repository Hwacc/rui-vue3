import type { ComponentProps } from 'vue-component-type-helpers'
import type { DialogCloseFrom } from '.'
import { isNil } from 'lodash-es'
import { createApp, defineComponent, ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogContentBody,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
} from '.'

type DialogOptions = {
  // dialogContentProps?: IDialogContentProps
  title?: string | (() => any)
  content?: string | (() => any)
  type?: 'default' | 'scroll'
  ui?: {
    root?: ComponentProps<typeof Dialog>
    content?: ComponentProps<typeof DialogContent> | ComponentProps<typeof DialogScrollContent>
    header?: ComponentProps<typeof DialogHeader>
    body?: ComponentProps<typeof DialogContentBody>
    footer?: ComponentProps<typeof DialogFooter>
  }
  noHeader?: boolean
  footer?: () => any
  render?: () => any
  onOpen?: () => void
  onOpened?: () => void
  onClose?: ({ from }: { from: DialogCloseFrom | undefined }) => void
  onClosed?: ({ from }: { from: DialogCloseFrom | undefined }) => void
  onOk?: () => void
  onCancel?: () => void
}

export function dialog({
  type = 'default',
  title,
  content,
  ui,
  noHeader = false,
  footer,
  render,
  onOpen,
  onOpened,
  onClose,
  onClosed,
  onOk,
  onCancel,
}: DialogOptions) {
  const open = ref(false)
  const DialogComponent = defineComponent<{ onClosed: () => void }>({
    name: 'Dialog',
    props: {
      onClosed: {
        type: Function,
        default: () => {},
      },
    },
    setup(props) {
      const { onClosed: onPropsClosed } = props
      return () => {
        const _contentProps = {
          ...ui?.content,
          showClose: isNil(render) && ui?.content?.showClose,
        }
        const contentSlots = {
          default: () => {
            if (render) {
              return render()
            }
            else {
              return (
                <>
                  {
                    !noHeader && 
                    <DialogHeader {...ui?.header}>
                      {{
                        default: () => {
                          if (typeof title === 'function')
                            return title()
                          return title
                        },
                      }}
                    </DialogHeader>
                  }
                  <DialogContentBody {...ui?.body}>
                    {{
                      default: () => {
                        if (typeof content === 'function')
                          return content()
                        return content
                      },
                    }}
                  </DialogContentBody>
                  {!footer
                    ? (
                        <DialogFooter
                          {...ui?.footer}
                          onOk={onOk}
                          onCancel={onCancel}
                        />
                      )
                    : (
                        <DialogFooter {...ui?.footer}>
                          {{
                            default: footer,
                          }}
                        </DialogFooter>
                      )}
                </>
              )
            }
          },
        }
        return (
          <Dialog
            {...ui?.root}
            v-model={[open.value, 'open']}
          >
            {type === 'scroll' && (
              <DialogScrollContent
                {..._contentProps}
                onOpen={onOpen}
                onOpened={onOpened}
                onClose={onClose}
                onClosed={(arg: { from: DialogCloseFrom | undefined }) => {
                  onClosed?.(arg)
                  onPropsClosed()
                }}
              >
                {contentSlots}
              </DialogScrollContent>
            )}
            {type === 'default' && (
              <DialogContent
                {..._contentProps}
                onOpen={onOpen}
                onOpened={onOpened}
                onClose={onClose}
                onClosed={(arg: { from: DialogCloseFrom | undefined }) => {
                  onClosed?.(arg)
                  onPropsClosed()
                }}
              >
                {contentSlots}
              </DialogContent>
            )}
          </Dialog>
        )
      }
    },
  })
  // create a dialog
  let dialogRoot: HTMLDivElement | null = document.createElement('div')
  const dialogApp = createApp(DialogComponent, {
    onClosed: () => {
      dialogApp.unmount()
      dialogRoot = null
    },
  })
  dialogApp.mount(dialogRoot)
  // open the dialog
  open.value = true
  const close = () => {
    open.value = false
  }
  return { close }
}
