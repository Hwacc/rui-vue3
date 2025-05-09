<script lang="tsx">
import { filter, isEmpty } from 'lodash-es';
import type { SelectValueProps, AcceptableValue } from 'reka-ui';
import { injectSelectRootContext, SelectValue as RekaSelectValue } from 'reka-ui';
import { defineComponent, HTMLAttributes, toRefs, watch } from 'vue';
import { X } from 'lucide-vue-next';
import { selectValueVariants } from '.';
import { cn } from '@rui/core/lib/utils';

export default defineComponent({
  name: 'SelectValue',
  components: {
    RekaSelectValue,
  },
  setup(props: SelectValueProps & { class?: HTMLAttributes['class']; unstyled?: boolean }) {
    const {
      multiple,
      triggerPointerDownPosRef,
      modelValue: rootModelValue,
    } = injectSelectRootContext();
    const { class: propsClass, placeholder, asChild, as, unstyled } = toRefs(props);

    watch(triggerPointerDownPosRef, (val) => {
      console.log('triggerPointerDownPosRef', val);
    });
    return () => {
      return (
        <RekaSelectValue
          class={cn(
            selectValueVariants({ unstyled: unstyled?.value }),
            propsClass?.value
          )}
          as={as?.value}
          asChild={asChild?.value}
          placeholder={placeholder?.value}
          style={{
            pointerEvents: 'normal',
          }}>
          {{
            default: ({
              selectedLabel,
              modelValue,
            }: {
              selectedLabel: string | string[];
              modelValue: AcceptableValue | AcceptableValue[];
            }) => {
              if (isEmpty(selectedLabel)) return placeholder?.value;
              if (!multiple.value) {
                return selectedLabel;
              } else {
                return (selectedLabel as AcceptableValue[]).map((label, index) => (
                  <span
                    key={index}
                    class='relative py-0.5 pl-1 pr-5'>
                    {label}
                    <X
                      class='absolute right-0.75 top-0.75 size-3'
                      onClick={(event: any) => {
                        event.stopPropagation();
                        rootModelValue.value = filter(
                          modelValue as AcceptableValue[],
                          (_, key) => key !== index
                        );
                      }}
                    />
                  </span>
                ));
              }
            },
          }}
        </RekaSelectValue>
      );
    };
  },
});
</script>
