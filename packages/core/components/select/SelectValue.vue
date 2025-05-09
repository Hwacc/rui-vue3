<script lang="tsx">
import type { AcceptableValue, SelectValueProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { filter, isEmpty } from 'lodash-es'
import { X } from 'lucide-vue-next'
import {
  injectSelectRootContext,
  SelectValue as RekaSelectValue,
} from 'reka-ui'
import { defineComponent, toRefs } from 'vue'
import { selectValueVariants } from '.'

export default defineComponent({
  name: 'SelectValue',
  components: {
    RekaSelectValue,
  },
  setup(
    props: SelectValueProps & {
      class?: HTMLAttributes['class']
      unstyled?: boolean
    },
  ) {
    const { multiple, modelValue: rootModelValue } = injectSelectRootContext()
    const {
      class: propsClass,
      placeholder,
      asChild,
      as,
      unstyled,
    } = toRefs(props)
    return () => {
      return (
        <RekaSelectValue
          class={cn(
            selectValueVariants({ unstyled: unstyled?.value }),
            propsClass?.value,
          )}
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
              if (isEmpty(selectedLabel))
                return placeholder?.value
              if (!multiple.value) {
                return selectedLabel
              }
              else {
                return (selectedLabel as AcceptableValue[]).map(
                  (label, index) => (
                    <span key={index} class="relative py-0.5 pl-1 pr-5">
                      {label}
                      <X
                        class="absolute right-0.75 top-0.75 size-3"
                        onClick={(event: any) => {
                          event.stopPropagation()
                          rootModelValue.value = filter(
                            modelValue as AcceptableValue[],
                            (_, key) => key !== index,
                          )
                        }}
                      />
                    </span>
                  ),
                )
              }
            },
          }}
        </RekaSelectValue>
      )
    }
  },
})
</script>
