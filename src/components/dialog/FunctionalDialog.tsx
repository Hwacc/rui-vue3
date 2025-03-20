import { createApp, defineComponent, ref } from 'vue';
import {
  Dialog,
  DialogCloseFrom,
  DialogContent,
  DialogContentBody,
  DialogFooter,
  DialogHeader,
  DialogScrollContent
} from '.';
import { DialogContentPropsImp } from './DialogContent.vue';
import { isNil } from 'lodash-es';

type DialogOptions = {
  dialogContentProps?: DialogContentPropsImp;
  title?: string | (() => any);
  content?: string | (() => any);
  type?: 'default' | 'scroll';
  footer?: () => any;
  render?: () => any;
  onOpen?: () => void;
  onOpened?: () => void;
  onClose?: ({ from }: { from: DialogCloseFrom | undefined }) => void;
  onClosed?: ({ from }: { from: DialogCloseFrom | undefined }) => void;
  onOk?: () => void;
  onCancel?: () => void;
};

export const openDialog = ({
  type = 'default',
  dialogContentProps = {},
  title,
  content,
  footer,
  render,
  onOpen,
  onOpened,
  onClose,
  onClosed,
  onOk,
  onCancel,
}: DialogOptions) => {
  const open = ref(false);
  const DialogComponent = defineComponent<{ onClosed: () => void }>({
    name: 'Dialog',
    props: {
      onClosed: {
        type: Function,
        default: () => {},
      },
    },
    setup(props) {
      const { onClosed: onPropsClosed } = props;
      return () => {
        const _contentProps = {
          ...dialogContentProps,
          showClose: isNil(render) && dialogContentProps.showClose,
        };
        const contentSlots = {
          default: () => {
            if (render) return render();
            else
              return (
                <>
                  <DialogHeader>
                    {{
                      default: () => {
                        if (typeof title === 'function') return title();
                        return title;
                      },
                    }}
                  </DialogHeader>
                  <DialogContentBody>
                    {{
                      default: () => {
                        if (typeof content === 'function') return content();
                        return content;
                      },
                    }}
                  </DialogContentBody>
                  {!footer ? (
                    <DialogFooter onOk={onOk} onCancel={onCancel} />
                  ) : (
                    <DialogFooter>
                      {{
                        default: footer,
                      }}
                    </DialogFooter>
                  )}
                </>
              );
          },
        };
        return (
          <Dialog v-model={[open.value, 'open']}>
            {type === 'scroll' && (
              <DialogScrollContent
                {..._contentProps}
                onOpen={onOpen}
                onOpened={onOpened}
                onClose={onClose}
                onClosed={(arg: { from: DialogCloseFrom | undefined }) => {
                  onClosed?.(arg);
                  onPropsClosed();
                }}>
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
                  onClosed?.(arg);
                  onPropsClosed();
                }}>
                {contentSlots}
              </DialogContent>
            )}
          </Dialog>
        );
      };
    },
  });
  // create a dialog
  let dialogRoot: HTMLDivElement | null = document.createElement('div');
  const dialogApp = createApp(DialogComponent, {
    onClosed: () => {
      dialogApp.unmount();
      dialogRoot = null;
    },
  });
  dialogApp.mount(dialogRoot);
  // open the dialog
  open.value = true;
  const close = () => {
    open.value = false;
  };
  return [close];
};
