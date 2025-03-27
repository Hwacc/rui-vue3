<script setup lang="ts">
import { cn, getCssVar } from '@/lib/utils';
import { useForwardExpose } from 'reka-ui';
import { computed, HTMLAttributes, watch } from 'vue';
import { circleProgressClass, circleProgressIndicatorClass } from '.';
import { colorHex2RgbObject, detectCssColorType } from '@/lib/colors';

const {
  class: propsClass,
  modelValue = 0,
  strokeWidth = 2,
  type = 'full',
  indicatorClass,
  indicatorType = 'normal',
} = defineProps<{
  class?: HTMLAttributes['class'];
  type?: 'arc' | 'full';
  modelValue?: number;
  strokeWidth?: number;
  indicatorClass?: HTMLAttributes['class'];
  indicatorType?: 'normal' | 'transfer';
}>();

const area = computed(() => {
  const r = 24 - strokeWidth;
  return Math.ceil(2 * Math.PI * r);
});

const arc = computed(() => {
  const r = 24 - strokeWidth;
  const theta = (180 * 100) / (Math.PI * 22); // 以r = 22为基准计算圆心角
  return Math.ceil((theta * Math.PI * r) / 180);
});

const progress = computed(() => {
  if (type === 'arc') {
    return arc.value - (modelValue / 100) * arc.value;
  } else {
    return area.value - (modelValue / 100) * area.value;
  }
});

const progressColor = computed(() => {
  if (indicatorType === 'transfer') {
    const { type: fromType, value: fromValue } = detectCssColorType(
      getCssVar('--progress-indicator-transfer-from', '#000') as string
    );
    const { type: toType, value: toValue } = detectCssColorType(
      getCssVar('--progress-indicator-transfer-to', '#fff') as string
    );
    if (fromType !== toType)
      throw new Error('transfer indicator from and to must be same color type');
    const step = (modelValue ?? 0) / 100;

    let _transferColor = '';
    switch (fromType) {
      case 'lab': {
        _transferColor = `lab(${fromValue.l + (toValue.l - fromValue.l) * step} ${
          fromValue.a + (toValue.a - fromValue.a) * step
        } ${fromValue.b + (toValue.b - fromValue.b) * step})`;
        break;
      }
      case 'hex':
      case 'hexa': {
        const fromRGB = colorHex2RgbObject(fromValue);
        const toRGB = colorHex2RgbObject(toValue);
        _transferColor = `rgb(${fromRGB.r + (toRGB.r - fromRGB.r) * step} ${
          fromRGB.g + (toRGB.g - fromRGB.g) * step
        } ${fromRGB.b + (toRGB.b - fromRGB.b) * step})`;
        break;
      }
      case 'rgb':
      case 'rgba': {
        _transferColor = `rgb(${fromValue.r + (toValue.r - fromValue.r) * step} ${
          fromValue.g + (toValue.g - fromValue.g) * step
        } ${fromValue.b + (toValue.b - fromValue.b) * step})`;
        break;
      }
    }
    return _transferColor;
  }
});

const { forwardRef } = useForwardExpose();
</script>

<template>
  <div :class="cn(circleProgressClass, propsClass)">
    <div
      v-if="type === 'arc'"
      :class="cn(circleProgressIndicatorClass, indicatorClass)"
      :data-type="indicatorType"
      :ref="forwardRef"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 56">
        <g fill="none">
          <circle
            class="stroke-progress-bg"
            cx="24"
            cy="24"
            :r="24 - strokeWidth"
            :stroke-width="strokeWidth"
            :stroke-dasharray="`${arc} 1000`"
            stroke-dashoffset="0"
            transform="rotate(140.5,24,24)"
          />
          <circle
            cx="24"
            cy="24"
            :r="24 - strokeWidth"
            :stroke="
              indicatorType === 'transfer' ? progressColor : 'var(--progress-indicator-default)'
            "
            :stroke-width="strokeWidth"
            :stroke-dasharray="`${arc} 1000`"
            :stroke-dashoffset="progress"
            transform="rotate(140.5,24,24)"
          />
          <text
            v-show="progress > 0"
            class="text-xs font-rob-bold fill-hff"
            x="50%"
            y="52"
            style="text-anchor: middle"
          >
            {{ `${~~modelValue}%` }}
          </text>
        </g>
      </svg>
      <slot />
    </div>
    <div v-else :class="cn(circleProgressIndicatorClass, indicatorClass)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 56">
        <g fill="none">
          <circle
            class="stroke-progress-bg"
            cx="24"
            cy="24"
            :r="24 - strokeWidth"
            :stroke-width="strokeWidth"
            stroke-dasharray="1000"
            stroke-dashoffset="0"
          />
          <circle
            cx="24"
            cy="24"
            :r="24 - strokeWidth"
            stroke="#44D62C "
            :stroke-width="strokeWidth"
            :stroke-dasharray="area"
            :stroke-dashoffset="progress"
            transform="rotate(-90, 24, 24)"
          />
        </g>
      </svg>
      <slot />
    </div>
  </div>
</template>
