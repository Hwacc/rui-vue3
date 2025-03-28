<script setup lang="ts">
import { cn, getNodeCssVar } from '@/lib/utils';
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'reka-ui';
import { computed, nextTick, reactive, ref, watchEffect, type HTMLAttributes } from 'vue';
import { progressVariants, progressIndicatorVariants, ProgressIndicatorVariants } from '.';
import { colorHex2RgbObject, detectCssColorType } from '@/lib/colors';

const {
  class: propsClass,
  indicatorType = 'default',
  disableRuiClass,
  ...props
} = defineProps<
  ProgressRootProps & {
    class?: HTMLAttributes['class'];
    indicatorType?: ProgressIndicatorVariants['type'];
    disableRuiClass?: boolean;
  }
>();

const indicatorRef = ref<any>(null);
const transferStyle = reactive({
  transform: `translateX(-${100 - (props.modelValue ?? 0)}%)`,
  background: '',
});
watchEffect(
  () => {
    if (indicatorType === 'transfer') {
      transferStyle.transform = `translateX(-${100 - (props.modelValue ?? 0)}%)`;
      const { type: fromType, value: fromValue } = detectCssColorType(
        getNodeCssVar(indicatorRef.value?.$el, '--transfer-from', '#000') as string
      );
      const { type: toType, value: toValue } = detectCssColorType(
        getNodeCssVar(indicatorRef.value?.$el, '--transfer-to', '#fff') as string
      );
      if (fromType !== toType)
        throw new Error('transfer indicator from and to must be same color type');
      const step = (props.modelValue ?? 0) / 100;
      switch (fromType) {
        case 'lab': {
          transferStyle.background = `lab(${fromValue.l + (toValue.l - fromValue.l) * step} ${
            fromValue.a + (toValue.a - fromValue.a) * step
          } ${fromValue.b + (toValue.b - fromValue.b) * step})`;
          break;
        }
        case 'hex':
        case 'hexa': {
          const fromRGB = colorHex2RgbObject(fromValue);
          const toRGB = colorHex2RgbObject(toValue);
          transferStyle.background = `rgb(${fromRGB.r + (toRGB.r - fromRGB.r) * step} ${
            fromRGB.g + (toRGB.g - fromRGB.g) * step
          } ${fromRGB.b + (toRGB.b - fromRGB.b) * step})`;
          break;
        }
        case 'rgb':
        case 'rgba': {
          transferStyle.background = `rgb(${fromValue.r + (toValue.r - fromValue.r) * step} ${
            fromValue.g + (toValue.g - fromValue.g) * step
          } ${fromValue.b + (toValue.b - fromValue.b) * step})`;
          break;
        }
      }
    }
  },
  { flush: 'post' }
);
</script>

<template>
  <ProgressRoot v-bind="props" :class="cn(progressVariants({ disableRuiClass }), propsClass)">
    <ProgressIndicator
      :class="progressIndicatorVariants({ disableRuiClass, type: indicatorType })"
      ref="indicatorRef"
      :data-type="indicatorType"
      :style="
        indicatorType === 'transfer'
          ? transferStyle
          : `transform: translateX(-${100 - (props.modelValue ?? 0)}%);`
      "
    />
  </ProgressRoot>
</template>
