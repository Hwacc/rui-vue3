<script lang="tsx">
import { filter, isEmpty } from 'lodash-es';
import type { SelectValueProps, AcceptableValue } from 'reka-ui';
import { injectSelectRootContext, SelectValue, useForwardProps } from 'reka-ui';
import { defineComponent, getCurrentInstance, HTMLAttributes, toRefs, watch } from 'vue';
import { X } from 'lucide-vue-next';

export default defineComponent({
  name: 'SelectValue',
  components: {
    RekaSelectValue: SelectValue,
  },
  setup(props: SelectValueProps & { class?: HTMLAttributes['class'] }) {
    const {
      multiple,
      triggerPointerDownPosRef,
      modelValue: rootModelValue,
    } = injectSelectRootContext();
    const { class: propsClass, ...delegateProps } = toRefs(props);
    const forwarded = useForwardProps(delegateProps);

    const instance = getCurrentInstance();
    console.log('instance', instance);


    watch(triggerPointerDownPosRef, (val) => {
      console.log('triggerPointerDownPosRef', val);
    });

    return () => {
      return (
        <reka-select-value
          {...forwarded.value}
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
              if (isEmpty(selectedLabel)) return delegateProps.placeholder?.value;
              if (!multiple.value) {
                return selectedLabel;
              } else {
                return (
                  <div class='flex items-center gap-1 text-sm'>
                    {(selectedLabel as AcceptableValue[]).map((label, index) => (
                      <span
                        key={index}
                        class='relative bg-h33 text-xs rounded-[.875rem] py-0.5 pl-1 pr-5'>
                        {label}
                        <X
                          class='absolute right-0.75 top-0.75 size-3 hover:stroke-hff'
                          onClick={(event: any) => {
                            event.stopPropagation();
                            rootModelValue.value = filter(
                              modelValue as AcceptableValue[],
                              (_, key) => key !== index
                            );
                          }}
                        />
                      </span>
                    ))}
                  </div>
                );
              }
            },
          }}
        </reka-select-value>
      );
    };
  },
});
</script>
