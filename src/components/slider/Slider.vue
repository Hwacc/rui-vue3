<script lang="ts">
// see: https://vue-3-slider-component.netlify.app/?path=/docs/vue-3-slider-component--docs
import type {
  DotOption,
  Styles,
  Marks,
  MarksFunction,
  ProcessFunc,
  TooltipFormatter,
  Value,
} from 'vue-3-slider-component';
import {
  useFloating,
  shift,
  autoUpdate,
  offset,
  UseFloatingOptions,
  Middleware,
  ShiftOptions,
  OffsetOptions,
  ArrowOptions,
  arrow,
  Strategy,
} from '@floating-ui/vue';
type SliderProps = {
  adsorb?: boolean;
  clickable?: boolean;
  contained?: boolean;
  data?: Array<number> | Array<string> | Array<object> | Record<string, any>;
  dataLabel?: string;
  dataValue?: string;
  direction?: 'ltr' | 'rtl' | 'ttb' | 'btt';
  disabled?: boolean;
  dotAttrs?: Record<string, any>;
  dotSize?: number | [number, number];
  dotStyle?: Styles;
  dotOptions?: DotOption | Array<DotOption>;
  dragOnClick?: boolean;
  duration?: number;
  enableCross?: boolean;
  fixed?: boolean;
  included?: boolean;
  interval?: number;
  keydownHook?: (e: KeyboardEvent) => (index: number) => number | boolean;
  labelActiveStyle?: Styles;
  labelStyle?: Styles;
  lazy?: boolean;
  marks?: boolean | Marks | Array<number | string> | MarksFunction;
  max?: number;
  maxRange?: number;
  min?: number;
  minRange?: number;
  order?: boolean;
  process?: boolean | ProcessFunc;
  processStyle?: Styles;
  railStyle?: Styles;
  silent?: boolean;
  stepActiveStyle?: Styles;
  stepStyle?: Styles;
  tooltip?: 'none' | 'always' | 'hover' | 'focus' | 'active';
  tooltipFormatter?: TooltipFormatter | Array<TooltipFormatter>;
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
  tooltipStyle?: Styles;
  useKeyboard?: boolean;
  value?: Value | Array<Value>;
  width?: number | string;
  height?: number | string;
  zoom?: number;
};
type SliderSlotDotProps = {
  pos: number;
  index: number;
  value: number | string;
  focus: boolean;
  disabled: boolean;
};
type SliderSlotLabelProps = {
  label: number | string;
  pos: number;
  value: number | string;
  active: boolean;
};
type SliderSlotMarkProps = {
  label: number | string;
  pos: number;
  value: number | string;
  active: boolean;
};
type SliderSlotProcessProps = {
  start: number;
  end: number;
  index: number;
  style: Record<string, any>;
};
type SliderSlotStepProps = {
  label: number | string;
  pos: number;
  value: number | string;
  active: boolean;
};
type SliderSlotTooltipProps = {
  pos: number;
  index: number;
  value: number | string;
  focus: boolean;
  disabled: boolean;
};
export enum SLIDER_ERROR_TYPE {
  VALUE = 1, // Value is illegal
  INTERVAL = 2, // `interval` cannot be divisible by `(max - min)`
  MIN, // Value is less than min
  MAX, // Value is greater than max
  ORDER, // When `order` is false, `minRange/maxRange/enableCross/fixed` is still set
}

export type FloatingTooltipOptions = Partial<
  Omit<UseFloatingOptions, 'middleware' | 'whileElementsMounted'>
> & {
  shift?: ShiftOptions;
  offset?: OffsetOptions;
  arrow?: ArrowOptions;
  content?: any;
  class?: HTMLAttributes['class'];
  arrowClass?: HTMLAttributes['class'];
  teleport?: boolean;
};
const DEFAULT_FLOATING_TOOLTIP_OPTIONS: FloatingTooltipOptions = {
  open: true,
  placement: 'bottom',
  strategy: 'absolute',
  transform: true,
  teleport: false,
  offset: {
    mainAxis: 8,
    crossAxis: 0,
  },
  shift: {
    mainAxis: true,
    crossAxis: false,
    boundary: undefined,
  },
  arrow: {
    element: undefined,
    padding: 0,
  },
};
export const useFloatingTooltip = (options: MaybeRef<FloatingTooltipOptions>) => {
  const floatingBoundaryRef = ref<ComponentPublicInstance | HTMLElement | null>(null);
  const floatingTooltipRef = ref<HTMLElement | null>(null);
  const floatingReferenceRef = ref<HTMLElement | null>(null);
  const floatingArrowRef = ref<HTMLElement | null>(null);

  const innerOptions = toRefs(unref(options));
  const middleware = ref<Middleware[]>([]);
  const { floatingStyles, update, middlewareData } = useFloating(
    floatingReferenceRef,
    floatingTooltipRef,
    {
      ...(innerOptions as UseFloatingOptions),
      middleware,
      whileElementsMounted: autoUpdate,
    }
  );

  const updateMiddleware = () => {
    let boundary: any = innerOptions.shift?.value?.boundary;
    if (isNil(boundary)) {
      if (floatingBoundaryRef.value instanceof HTMLElement) {
        boundary = floatingBoundaryRef.value;
      } else if (floatingBoundaryRef.value?.$el) {
        boundary = floatingBoundaryRef.value.$el;
      }
    }
    console.log('updateMiddleware', innerOptions.arrow?.value?.padding);
    middleware.value = [
      offset(innerOptions.offset?.value),
      shift({
        ...(unref(innerOptions.shift) ?? {}),
        boundary,
      }),
      arrow({
        element: innerOptions.arrow?.value?.element || floatingArrowRef.value,
        padding: innerOptions.arrow?.value?.padding,
      }),
    ];
  };

  watch(
    () => options,
    (opts) => {
      for (let key in unref(opts)) {
        (innerOptions as any)[key].value = (unref(opts) as any)[key];
      }
      updateMiddleware();
    },
    { deep: true }
  );

  onMounted(() => {
    updateMiddleware();
  });

  const floatingTooltipArrowPosition = computed(() => {
    const placement = unref(innerOptions.placement) as string;
    if (/(top|bottom)/.test(placement)) {
      let y: number | string | undefined = middlewareData.value.arrow?.y;
      if (isNil(y)) {
        if (placement.includes('top')) {
          y = floatingTooltipRef.value?.offsetHeight || '100%';
        }
        if (placement.includes('bottom')) {
          y = 0;
        }
      }
      return {
        x: middlewareData.value.arrow?.x ?? 0,
        y,
        ...omit(middlewareData.value.arrow, 'x', 'y'),
      };
    } else if (/(left|right)/.test(placement)) {
      let x: number | string | undefined = middlewareData.value.arrow?.x;
      if (isNil(x)) {
        if (placement.includes('left')) {
          x = floatingTooltipRef.value?.offsetWidth || '100%';
        }
        if (placement.includes('right')) {
          x = 0;
        }
      }
      return {
        x,
        y: middlewareData.value.arrow?.y ?? 0,
        ...omit(middlewareData.value.arrow, 'x', 'y'),
      };
    }
  });

  const floatingTooltipArrowStyles = computed(() => {
    const placement = unref(innerOptions.placement) as string;
    const styles = {
      left: isNumber(floatingTooltipArrowPosition.value?.x)
        ? floatingTooltipArrowPosition.value?.x + 'px'
        : floatingTooltipArrowPosition.value?.x,
      top: isNumber(floatingTooltipArrowPosition.value?.y)
        ? floatingTooltipArrowPosition.value?.y + 'px'
        : floatingTooltipArrowPosition.value?.y,
      transform: '',
    };
    if (/(bottom)/.test(placement as string)) {
      styles.transform = 'translateY(-100%)';
    }
    if (/(right)/.test(placement as string)) {
      styles.transform = 'translateX(-100%)';
    }
    return styles;
  });

  return {
    floatingBoundaryRef,
    floatingTooltipRef,
    floatingReferenceRef,
    floatingArrowRef,
    floatingTooltipStyles: floatingStyles,
    floatingTooltipArrowStyles,
    updateFloatingTooltip: update,
    middlewareData,
  };
};
</script>

<script setup lang="ts">
import Slider from 'vue-3-slider-component';
import { Primitive, useForwardPropsEmits, type PrimitiveProps } from 'reka-ui';
import {
  ComponentPublicInstance,
  computed,
  ComputedRef,
  MaybeRef,
  onMounted,
  Ref,
  ref,
  toRefs,
  unref,
  watch,
  type HTMLAttributes,
  Teleport,
} from 'vue';
import { isNil, merge, omit, isNumber, isObject } from 'lodash-es';
import { rem2px } from '@/lib/utils';
import { cn } from '@/lib/utils';

const {
  wrapClass,
  class: propsClass,
  as,
  asChild,
  direction = 'ltr',
  railStyle,
  processStyle,
  tooltipPlacement = 'top',
  dotSize,
  width,
  height,
  size = 'default',
  floatingTooltip,
  ...props
} = defineProps<
  PrimitiveProps &
    SliderProps & {
      wrapClass?: HTMLAttributes['class'];
      class?: HTMLAttributes['class'];
      size?: 'default' | 'sm' | 'lg' | 'custom';
      floatingTooltip?: FloatingTooltipOptions | boolean | undefined;
    }
>();

defineSlots<{
  dot?: (dotProps: SliderSlotDotProps) => any;
  label?: (labelProps: SliderSlotLabelProps) => any;
  mark?: (markProps: SliderSlotMarkProps) => any;
  process?: (processProps: SliderSlotProcessProps) => any;
  step?: (stepProps: SliderSlotStepProps) => any;
  tooltip?: (tooltipProps: SliderSlotTooltipProps) => any;
  floatingTooltip?: (
    tooltipProps: SliderSlotTooltipProps & {
      floatingTooltipStyles: Readonly<
        Ref<{
          position: Strategy;
          top: string;
          left: string;
          transform?: string;
          willChange?: string;
        }>
      >;
      floatingTooltipArrowPosition: ComputedRef<
        | {
            centerOffset: number;
            alignmentOffset?: number | undefined;
            x: string | number | undefined;
            y: string | number | undefined;
          }
        | undefined
      >;
    }
  ) => any;
}>();
const emits = defineEmits<{
  change: [value: number | string | number[] | string[], index: number];
  dragEnd: [index: number];
  dragStart: [index: number];
  dragging: [value: number | string | number[] | string[], index: number];
  error: [type: SLIDER_ERROR_TYPE, message: string];
}>();
const forwarded = useForwardPropsEmits(props, emits);
const model = defineModel<number | string | number[] | string[]>();

// styles
const mergedRailStyle = computed(() => {
  return merge(
    {
      backgroundColor: '#333',
    },
    railStyle
  );
});
const mergedProcessStyle = computed(() => {
  return merge(
    {
      backgroundColor: '#44d62c',
    },
    processStyle
  );
});
const computedWidth = computed(() => {
  if (direction === 'ttb' || direction === 'btt') {
    switch (size) {
      case 'default':
        return '.125rem';
      case 'sm':
        return '.0625rem';
      case 'lg':
        return '.25rem';
      case 'custom':
        return width;
    }
  } else if (direction === 'ltr' || direction === 'rtl') {
    return width;
  }
});
const computedHeight = computed(() => {
  if (direction === 'ttb' || direction === 'btt') {
    return height;
  } else if (direction === 'ltr' || direction === 'rtl') {
    switch (size) {
      case 'default':
        return '.125rem';
      case 'sm':
        return '.0625rem';
      case 'lg':
        return '.25rem';
      case 'custom':
        return height;
    }
  }
});
const computedDotSize = computed(() => {
  switch (size) {
    case 'default':
      return [rem2px(0.625), rem2px(0.625)];
    case 'sm':
      return [rem2px(0.5), rem2px(0.5)];
    case 'lg':
      return [rem2px(0.75), rem2px(0.75)];
    case 'custom':
      return dotSize;
  }
});
const dotDragIndex = ref(-1);
const dotDragStart = ref(false);

const floatingTooltipOptions = ref<FloatingTooltipOptions>(
  isObject(floatingTooltip)
    ? merge({}, DEFAULT_FLOATING_TOOLTIP_OPTIONS, floatingTooltip)
    : DEFAULT_FLOATING_TOOLTIP_OPTIONS
);
watch(
  () => floatingTooltip,
  (opts) => {
    floatingTooltipOptions.value = isObject(opts)
      ? merge({}, DEFAULT_FLOATING_TOOLTIP_OPTIONS, opts)
      : DEFAULT_FLOATING_TOOLTIP_OPTIONS;
  },
  { deep: true }
);
const {
  floatingBoundaryRef,
  floatingTooltipRef,
  floatingReferenceRef,
  floatingArrowRef,
  floatingTooltipArrowStyles,
  floatingTooltipStyles,
  updateFloatingTooltip,
} = useFloatingTooltip(floatingTooltipOptions);

const getFloatingTooltipContent = (value: number | string) => {
  return isObject(floatingTooltip) && floatingTooltip.content ? floatingTooltip.content : value;
};
</script>

<template>
  <Primitive :class="wrapClass" :as="as" :asChild="asChild">
    <Slider
      v-model="model"
      ref="floatingBoundaryRef"
      :class="propsClass"
      :direction="direction"
      :width="computedWidth"
      :height="computedHeight"
      :style="{
        display: 'flex',
        alignItems: 'center',
      }"
      :railStyle="mergedRailStyle"
      :processStyle="mergedProcessStyle"
      :dotSize="computedDotSize"
      :tooltipPlacement="tooltipPlacement"
      v-bind="forwarded"
      @drag-start="(index: number) => {
        dotDragIndex = index;
        dotDragStart = true;
        emits('dragStart', index);
      }"
      @dragging="(value: number | string | number[] | string[], index: number) => {
        floatingTooltip && updateFloatingTooltip();
        emits('dragging', value, index);
      }"
      @drag-end="(index: number) => {
        dotDragStart = false;
        dotDragIndex = -1;
        emits('dragEnd', index);
      }"
    >
      <template #dot="{ index, ...rest }">
        <div class="w-full h-full" ref="floatingReferenceRef">
          <slot name="dot" v-bind="{ index, ...rest }">
            <div
              :class="
                cn(
                  [
                    'w-full h-full rounded-full bg-h00 border-[.125rem] border-rz-green transition-transform',
                  ],
                  [size === 'sm' && 'border-[.0625rem]'],
                  [size === 'lg' && 'border-[.25rem]'],
                  [index === dotDragIndex && dotDragStart && 'scale-125']
                )
              "
            />
          </slot>
        </div>
      </template>
      <template #label="labelProps">
        <slot name="label" v-bind="labelProps" />
      </template>
      <template #mark="markProps">
        <slot name="mark" v-bind="markProps" />
      </template>
      <template #process="processProps">
        <slot name="process" v-bind="processProps" />
      </template>
      <template #step="stepProps">
        <slot name="step" v-bind="stepProps" />
      </template>
      <template #tooltip="tooltipProps">
        <slot
          v-if="floatingTooltip"
          name="floatingTooltip"
          v-bind="{
            ...tooltipProps,
            floatingTooltipOptions,
            floatingTooltipStyles,
            floatingTooltipArrowStyles,
          }"
        >
          <Component :is="floatingTooltipOptions.teleport ? Teleport : 'div'" to="body">
            <div
              :class="
                cn(
                  'flex px-2 py-1 bg-rz-green rounded text-h00 text-xs',
                  floatingTooltipOptions.class
                )
              "
              :style="floatingTooltipStyles"
              ref="floatingTooltipRef"
            >
              <Component
                v-if="isObject(getFloatingTooltipContent(tooltipProps.value))"
                :is="getFloatingTooltipContent(tooltipProps.value)"
              />
              <div v-else>
                {{ getFloatingTooltipContent(tooltipProps.value) }}
              </div>
              <svg
                v-if="/(top|bottom)/.test(floatingTooltipOptions.placement as string)"
                :class="cn([
                'absolute w-1.5 h-0.75 fill-rz-green',
                /(top)/.test(floatingTooltipOptions.placement as string) && 'rotate-180',
              ], floatingTooltipOptions.arrowClass)"
                viewBox="0 0 10 5"
                ref="floatingArrowRef"
                :style="floatingTooltipArrowStyles"
              >
                <path d="M5,0 L0,5 L10,5 Z" />
              </svg>
              <svg
                v-else="/(left|right)/.test(floatingTooltipOptions.placement as string)"
                :class="cn([
                'absolute w-0.75 h-1.5 fill-rz-green',
                /(left)/.test(floatingTooltipOptions.placement as string) && 'rotate-180',
              ], floatingTooltipOptions.arrowClass)"
                viewBox="0 0 5 10"
                ref="floatingArrowRef"
                :style="floatingTooltipArrowStyles"
              >
                <path d="M5,0 L0,5 L5,10 Z" />
              </svg>
            </div>
          </Component>
        </slot>
        <slot v-else name="tooltip" v-bind="tooltipProps">
          <div
            :class="[
              'flex px-2 py-1 bg-rz-green rounded text-h00 text-xs',
              'vue-slider-default-tooltip',
            ]"
            :data-placement="tooltipPlacement"
          >
            {{ tooltipProps.value }}
          </div>
        </slot>
      </template>
    </Slider>
  </Primitive>
</template>

<style lang="css" scoped>
::v-deep(.vue-slider-dot:focus-visible) {
  outline: var(--outline);
}

.vue-slider-default-tooltip {
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
  }
  &[data-placement='top'] {
    &:after {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid var(--color-rz-green);
      bottom: 0px;
      left: 50%;
      transform: translate(-50%, 100%);
    }
  }
  &[data-placement='bottom'] {
    &:after {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 4px solid var(--color-rz-green);
      top: 0px;
      left: 50%;
      transform: translate(-50%, -100%);
    }
  }
  &[data-placement='left'] {
    &:after {
      border-left: 4px solid var(--color-rz-green);
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      top: 50%;
      right: 0px;
      transform: translate(100%, -50%);
    }
  }
  &[data-placement='right'] {
    &:after {
      border-right: 4px solid var(--color-rz-green);
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      top: 50%;
      left: 0px;
      transform: translate(-100%, -50%);
    }
  }
}
</style>
