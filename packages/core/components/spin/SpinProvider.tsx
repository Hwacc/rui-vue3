import { cn } from '@rui/core/lib/utils'
import { LoaderCircle } from 'lucide-vue-next'
import { Primitive } from 'reka-ui'
import { defineComponent, provide } from 'vue'
import { tvSpin } from '.'

export const SpinProvider = defineComponent({
  name: 'SpinProvider',
  setup(_props, { slots }) {
    const renderIcon = (props: any) => {
      const icon = slots.icon?.({
        mode: props.mode,
        size: props.size,
        unstyled: props.unstyled,
      })
      const { icon: iconVariant } = tvSpin({
        mode: props.mode,
        size: props.size,
        unstyled: props.unstyled,
      });
      if (icon) {
        return (
          <Primitive
            class={cn(
              iconVariant({
                class: props.class,
              }),
            )}
            asChild
            data-variant="custom"
          >
            {icon[0]}
          </Primitive>
        )
      }
      else {
        return (
          <LoaderCircle
            class={cn(
              iconVariant({
                class: props.class,
              }),
            )}
            data-variant="default"
          />
        )
      }
    }
    provide('SpinProvider', {
      renderIcon,
    })
    return () => slots.default?.()
  },
})
