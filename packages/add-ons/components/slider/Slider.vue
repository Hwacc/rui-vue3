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
import { useForwardPropsEmits } from '@/add-ons/lib/useFowardPropsEmits';
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
    rootBoundary: 'document',
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
    const rootBoundary = innerOptions.shift?.value?.rootBoundary ?? 'document';
    if (isNil(boundary)) {
      if (floatingBoundaryRef.value instanceof HTMLElement) {
        boundary = floatingBoundaryRef.value;
      } else if (floatingBoundaryRef.value?.$el) {
        boundary = floatingBoundaryRef.value.$el;
      }
    }
    middleware.value = [
      offset(innerOptions.offset?.value),
      shift({
        ...(unref(innerOptions.shift) ?? {}),
        boundary,
        rootBoundary,
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
import { getNodeCssVar, rem2px } from '@/core/lib/utils';
import { cn } from '@/core/lib/utils';
import { sliderVariants, sliderDotVariants, sliderTooltipVariants } from '.';

const {
  class: propsClass,
  direction = 'ltr',
  railStyle,
  processStyle,
  tooltipPlacement = 'top',
  dotSize,
  width,
  height,
  size = 'base',
  duration = 0.15,
  floatingTooltip,
  disableRuiClass,
  ...props
} = defineProps<
  SliderProps & {
    class?: HTMLAttributes['class'];
    size?: 'base' | 'sm' | 'lg';
    floatingTooltip?: FloatingTooltipOptions | boolean | undefined;
    disableRuiClass?: boolean;
  }
>();
// default model
const model = defineModel<number | string | number[] | string[]>();
// slots
defineSlots<{
  dot?: (dotProps: SliderSlotDotProps & { class: HTMLAttributes['class'] }) => any;
  label?: (labelProps: SliderSlotLabelProps & { class: HTMLAttributes['class'] }) => any;
  mark?: (markProps: SliderSlotMarkProps & { class: HTMLAttributes['class'] }) => any;
  process?: (processProps: SliderSlotProcessProps & { class: HTMLAttributes['class'] }) => any;
  step?: (stepProps: SliderSlotStepProps & { class: HTMLAttributes['class'] }) => any;
  tooltip?: (
    tooltipProps: SliderSlotTooltipProps & {
      class: HTMLAttributes['class'];
      variant: 'default' | 'floating';
    }
  ) => any;
  floatingTooltip?: (
    tooltipProps: SliderSlotTooltipProps & {
      class: HTMLAttributes['class'];
      variant: 'default' | 'floating';
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

// emits
const emits = defineEmits<{
  change: [value: number | string | number[] | string[], index: number];
  dragEnd: [index: number];
  dragStart: [index: number];
  dragging: [value: number | string | number[] | string[], index: number];
  error: [type: SLIDER_ERROR_TYPE, message: string];
}>();

const forwarded = useForwardPropsEmits(props, emits);

const sliderRef = ref<{ $el: HTMLElement }>();

// styles
const mergedRailStyle = computed(() => {
  return merge(
    {
      backgroundColor: disableRuiClass
        ? undefined
        : getNodeCssVar(sliderRef.value?.$el, '--rui-slider-rail', '#000'),
    },
    railStyle
  );
});
const mergedProcessStyle = computed(() => {
  return merge(
    {
      backgroundColor: disableRuiClass
        ? undefined
        : getNodeCssVar(sliderRef.value?.$el, '--rui-slider-progress', '#fff'),
    },
    processStyle
  );
});
const computedWidth = computed(() => {
  if (direction === 'ttb' || direction === 'btt') {
    switch (size) {
      case 'base':
        return '.125rem';
      case 'sm':
        return '.0625rem';
      case 'lg':
        return '.25rem';
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
      case 'base':
        return '.125rem';
      case 'sm':
        return '.0625rem';
      case 'lg':
        return '.25rem';
    }
  }
});
const computedDotSize = computed(() => {
  switch (size) {
    case 'base':
      return [rem2px(0.625), rem2px(0.625)];
    case 'sm':
      return [rem2px(0.5), rem2px(0.5)];
    case 'lg':
      return [rem2px(0.75), rem2px(0.75)];
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
  <Slider
    v-bind="forwarded"
    v-model="model"
    :ref="(r: any) => {
      floatingBoundaryRef = r;
      sliderRef = r;
    }"
    :class="cn(sliderVariants({ disableRuiClass }), propsClass)"
    :direction="direction"
    :width="computedWidth"
    :height="computedHeight"
    :duration="duration"
    :railStyle="mergedRailStyle"
    :processStyle="mergedProcessStyle"
    :dotSize="computedDotSize"
    :tooltipPlacement="tooltipPlacement"
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
        <slot
          name="dot"
          v-bind="{
            index,
            class: sliderDotVariants({
              size,
              disableRuiClass,
              scale: index === dotDragIndex && dotDragStart,
            }),
            ...rest,
          }"
        >
          <div
            :class="
              cn(
                sliderDotVariants({
                  size,
                  disableRuiClass,
                  scale: index === dotDragIndex && dotDragStart,
                })
              )
            "
          />
        </slot>
      </div>
    </template>
    <template #label="labelProps">
      <slot
        name="label"
        v-bind="{ ...labelProps, class: disableRuiClass ? '' : 'rui-vue-slider-label' }"
      />
    </template>
    <template #mark="markProps">
      <slot
        name="mark"
        v-bind="{ ...markProps, class: disableRuiClass ? '' : 'rui-vue-slider-mark' }"
      />
    </template>
    <template #process="processProps">
      <slot
        name="process"
        v-bind="{ ...processProps, class: disableRuiClass ? '' : 'rui-vue-slider-process' }"
      />
    </template>
    <template #step="stepProps">
      <slot
        name="step"
        v-bind="{ ...stepProps, class: disableRuiClass ? '' : 'rui-vue-slider-step' }"
      />
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
          class: cn(
            sliderTooltipVariants({
              variant: 'floating',
              disableRuiClass,
            }),
            floatingTooltipOptions.class
          ),
          variant: 'floating',
        }"
      >
        <Component :is="floatingTooltipOptions.teleport ? Teleport : 'div'" to="body">
          <div
            :class="
              cn(
                sliderTooltipVariants({
                  variant: 'floating',
                  disableRuiClass,
                }),
                floatingTooltipOptions.class
              )
            "
            :style="floatingTooltipStyles"
            ref="floatingTooltipRef"
            data-variant="floating"
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
                'absolute w-1.5 h-0.75',
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
                'absolute w-0.75 h-1.5',
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
      <slot
        v-else
        name="tooltip"
        v-bind="{
          class: sliderTooltipVariants({
            variant: 'default',
            placement: tooltipPlacement,
            disableRuiClass,
          }),
          variant: 'default',
          ...tooltipProps,
        }"
      >
        <div
          :class="
            sliderTooltipVariants({
              variant: 'default',
              placement: tooltipPlacement,
              disableRuiClass,
            })
          "
          data-variant="floating"
          :data-placement="tooltipPlacement"
        >
          {{ tooltipProps.value }}
        </div>
      </slot>
    </template>
  </Slider>
</template>

<style lang="css" scoped>
::v-deep(.vue-slider-dot:focus-visible) {
  outline: var(--outline);
}
</style>
