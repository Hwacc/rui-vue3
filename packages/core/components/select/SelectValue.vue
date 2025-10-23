<script lang="tsx">
import type { AcceptableValue, SelectValueProps } from 'reka-ui'
import type { HTMLAttributes, SlotsType } from 'vue'
import { filter, isEmpty } from 'lodash-es'
import { X } from 'lucide-vue-next'
import { injectSelectRootContext, SelectValue as RekaSelectValue } from 'reka-ui'
import { defineComponent, toRefs } from 'vue'
import { tvValue } from '.'

export default defineComponent({
  name: 'SelectValue',
  components: {
    RekaSelectValue,
  },
  slots: Object as SlotsType<{
    default: {
      selectedLabel: string | string[]
      modelValue: AcceptableValue | AcceptableValue[]
    }
  }>,
  setup(
    props: SelectValueProps & {
      class?: HTMLAttributes['class']
      unstyled?: boolean
      ui?: {
        base?: {
          class?: HTMLAttributes['class']
        }
        close?: {
          class?: HTMLAttributes['class']
        }
        closeIcon?: {
          class?: HTMLAttributes['class']
        }
      }
    },
    { slots },
  ) {
    const { multiple, modelValue: rootModelValue } = injectSelectRootContext()
    const { class: propsClass, ui, placeholder, asChild, as, unstyled } = toRefs(props)

    const { base, close, closeIcon } = tvValue()
    return () => {
      return (
        <RekaSelectValue
          class={base({
            unstyled: unstyled?.value ?? false,
            class: [ui?.value?.base?.class, propsClass?.value],
          })}
          as={as?.value}
          asChild={asChild?.value}
          placeholder={placeholder?.value}
          style={{
            pointerEvents: 'normal',
          }}
        >
          {{
            default: ({
              selectedLabel,
              modelValue,
            }: {
              selectedLabel: string | string[]
              modelValue: AcceptableValue | AcceptableValue[]
            }) => {
              if (slots.default) {
                return slots.default({
                  selectedLabel,
                  modelValue,
                })
              }
              if (isEmpty(selectedLabel))
                return placeholder?.value
              if (!multiple.value) {
                return selectedLabel
              }
              else {
                return (selectedLabel as AcceptableValue[]).map((label, index) => (
                  <span
                    key={index}
                    class={close({
                      unstyled: unstyled?.value ?? false,
                      class: ui?.value?.close?.class,
                    })}
                  >
                    {label}
                    <X
                      class={closeIcon({
                        unstyled: unstyled?.value ?? false,
                        class: ui?.value?.closeIcon?.class,
                      })}
                      onClick={(event: any) => {
                        event.stopPropagation()
                        rootModelValue.value = filter(
                          modelValue as AcceptableValue[],
                          (_, key) => key !== index,
                        )
                      }}
                    />
                  </span>
                ))
              }
            },
          }}
        </RekaSelectValue>
      )
    }
  },
})
</script>
