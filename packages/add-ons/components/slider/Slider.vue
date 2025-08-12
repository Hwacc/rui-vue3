<script lang="ts">
import type {
  ArrowOptions,
  Middleware,
  OffsetOptions,
  ShiftOptions,
  Strategy,
  UseFloatingOptions,
} from '@floating-ui/vue';
// see: https://vue-3-slider-component.netlify.app/?path=/docs/vue-3-slider-component--docs
import type {
  DotOption,
  Marks,
  MarksFunction,
  ProcessFunc,
  Styles,
  TooltipFormatter,
  Value,
} from 'vue-3-slider-component';
import { arrow, autoUpdate, offset, shift, useFloating } from '@floating-ui/vue';
import { useForwardPropsEmits } from '@rui/add-ons/lib/useFowardPropsEmits';
import { isNil, isNumber, isObject, merge, omit } from 'lodash-es';
import { computed, onMounted, ref, Teleport, toRefs, unref, watch } from 'vue';

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
export function useFloatingTooltip(options: MaybeRef<FloatingTooltipOptions>) {
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
      for (const key in unref(opts)) {
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
    if (/top|bottom/.test(placement)) {
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
    } else if (/left|right/.test(placement)) {
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
    return {
      x: middlewareData.value.arrow?.x ?? 0,
      y: middlewareData.value.arrow?.y ?? 0,
      ...omit(middlewareData.value.arrow, 'x', 'y'),
    };
  });

  const floatingTooltipArrowStyles = computed(() => {
    const placement = unref(innerOptions.placement) as string;
    const styles = {
      left: isNumber(floatingTooltipArrowPosition.value?.x)
        ? `${floatingTooltipArrowPosition.value?.x}px`
        : floatingTooltipArrowPosition.value?.x,
      top: isNumber(floatingTooltipArrowPosition.value?.y)
        ? `${floatingTooltipArrowPosition.value?.y}px`
        : floatingTooltipArrowPosition.value?.y,
      transform: '',
    };
    if (/bottom/.test(placement as string)) {
      styles.transform = 'translateY(-100%)';
    }
    if (/right/.test(placement as string)) {
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
}
</script>

<script setup lang="ts">
import type { ComponentPublicInstance, ComputedRef, HTMLAttributes, MaybeRef, Ref } from 'vue';
import { cn, getNodeCssVar, rem2px } from '@rui/core/lib/utils';
import Slider from 'vue-3-slider-component';
import type { SliderVariants } from '.';
import { tvSlider } from '.';

const {
  class: propsClass,
  direction = 'ltr',
  railStyle,
  tooltipPlacement = 'top',
  dotSize,
  width,
  height,
  size = 'base',
  duration = 0.15,
  floatingTooltip,
  unstyled,
  ui,
  ...props
} = defineProps<
  SliderProps & {
    class?: HTMLAttributes['class'];
    size?: SliderVariants['size'];
    floatingTooltip?: FloatingTooltipOptions | boolean | undefined;
    unstyled?: boolean;
    ui?: {
      root?: {
        class?: HTMLAttributes['class'];
      };
      process?: {
        class?: HTMLAttributes['class'];
        style?: HTMLAttributes['style'];
      };
      dot?: {
        class?: HTMLAttributes['class'];
        style?: HTMLAttributes['style'];
      };
      tooltip?: {
        class?: HTMLAttributes['class'];
      };
      label?: {
        class?: HTMLAttributes['class'];
      };
      mark?: {
        class?: HTMLAttributes['class'];
      };
      step?: {
        class?: HTMLAttributes['class'];
      };
      rail?: {
        class?: HTMLAttributes['class'];
        style?: HTMLAttributes['style'];
      };
    };
  }
>();
// emits
const emits = defineEmits<{
  change: [value: number | string | number[] | string[], index: number];
  dragEnd: [index: number];
  dragStart: [index: number];
  dragging: [value: number | string | number[] | string[], index: number];
  error: [type: SLIDER_ERROR_TYPE, message: string];
}>();
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
// default model
const model = defineModel<number | string | number[] | string[]>();
const forwarded = useForwardPropsEmits(props, emits);

const sliderRef = ref<{ $el: HTMLElement }>();

// styles
const mergedRailStyle = computed(() => {
  return merge(
    {
      backgroundColor: unstyled
        ? undefined
        : getNodeCssVar(sliderRef.value?.$el, '--rui-slider-rail', '#000'),
    },
    ui?.rail?.style,
    railStyle
  );
});
const mergedProcessStyle = computed(() => {
  return merge(
    {
      backgroundColor: unstyled
        ? undefined
        : getNodeCssVar(sliderRef.value?.$el, '--rui-slider-progress', '#fff'),
    },
    ui?.process?.style,
    props.processStyle
  );
});
const mergedDotStyle = computed(() => {
  console.log('test',merge({}, ui?.dot?.style, props.dotStyle))
  return merge({}, ui?.dot?.style, props.dotStyle);
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
  }
  return width;
});
const computedHeight = computed(() => {
  if (direction === 'ltr' || direction === 'rtl') {
    switch (size) {
      case 'base':
        return '.125rem';
      case 'sm':
        return '.0625rem';
      case 'lg':
        return '.25rem';
    }
  }
  return height;
});
const computedDotSize = computed(() => {
  switch (size) {
    case 'sm':
      return [rem2px(0.5), rem2px(0.5)];
    case 'lg':
      return [rem2px(0.75), rem2px(0.75)];
    case 'base':
    default:
      return [rem2px(0.625), rem2px(0.625)];
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

function getFloatingTooltipContent(value: number | string) {
  return isObject(floatingTooltip) && floatingTooltip.content ? floatingTooltip.content : value;
}

const { root, dot, tooltip, label, mark, step, process } = tvSlider();
</script>

<template>
  <Slider
    v-bind="forwarded"
    :ref="(r: any) => {
      floatingBoundaryRef = r;
      sliderRef = r;
    }"
    v-model="model"
    :class="root({ unstyled, class: [ui?.root?.class, propsClass] })"
    :direction="direction"
    :width="computedWidth"
    :height="computedHeight"
    :duration="duration"
    :rail-style="mergedRailStyle"
    :process-style="mergedProcessStyle"
    :dot-size="dotSize ? dotSize : computedDotSize"
    :dot-style="mergedDotStyle"
    :tooltip-placement="tooltipPlacement"
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
      <div
        ref="floatingReferenceRef"
        class="w-full h-full"
      >
        <slot
          name="dot"
          v-bind="{
            index,
            class: dot({
              size,
              unstyled,
              scale: index === dotDragIndex && dotDragStart,
              class: [ui?.dot?.class],
            }),
            ...rest,
          }"
        >
          <div
            :class="
              cn(
                dot({
                  size,
                  unstyled,
                  scale: index === dotDragIndex && dotDragStart,
                  class: [ui?.dot?.class],
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
        v-bind="{
          ...labelProps,
          class: label({
            unstyled,
            class: [ui?.label?.class],
          }),
        }"
      />
    </template>
    <template #mark="markProps">
      <slot
        name="mark"
        v-bind="{
          ...markProps,
          class: mark({
            unstyled,
            class: [ui?.mark?.class],
          }),
        }"
      />
    </template>
    <template #process="processProps">
      <slot
        name="process"
        v-bind="{
          ...processProps,
          class: process({
            unstyled,
            class: [ui?.process?.class],
          }),
        }"
      />
    </template>
    <template #step="stepProps">
      <slot
        name="step"
        v-bind="{
          ...stepProps,
          class: step({
            unstyled,
            class: [ui?.step?.class],
          }),
        }"
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
          class: tooltip({
            variant: 'floating',
            unstyled,
            class: [floatingTooltipOptions.class, ui?.tooltip?.class],
          }),
          variant: 'floating',
        }"
      >
        <Component
          :is="floatingTooltipOptions.teleport ? Teleport : 'div'"
          to="body"
        >
          <div
            ref="floatingTooltipRef"
            :class="
              tooltip({
                variant: 'floating',
                unstyled,
                class: [floatingTooltipOptions.class, ui?.tooltip?.class],
              })
            "
            :style="floatingTooltipStyles"
            data-variant="floating"
          >
            <Component
              :is="getFloatingTooltipContent(tooltipProps.value)"
              v-if="isObject(getFloatingTooltipContent(tooltipProps.value))"
            />
            <div v-else>
              {{ getFloatingTooltipContent(tooltipProps.value) }}
            </div>
            <svg
              v-if="/(top|bottom)/.test(floatingTooltipOptions.placement as string)"
              ref="floatingArrowRef"
              :class="cn([
                'absolute w-1.5 h-0.75',
                /(top)/.test(floatingTooltipOptions.placement as string) && 'rotate-180',
              ], floatingTooltipOptions.arrowClass)"
              viewBox="0 0 10 5"
              :style="floatingTooltipArrowStyles"
            >
              <path d="M5,0 L0,5 L10,5 Z" />
            </svg>
            <svg
              v-else-if="/(left|right)/.test(floatingTooltipOptions.placement as string)"
              ref="floatingArrowRef"
              :class="cn([
                'absolute w-0.75 h-1.5',
                /(left)/.test(floatingTooltipOptions.placement as string) && 'rotate-180',
              ], floatingTooltipOptions.arrowClass)"
              viewBox="0 0 5 10"
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
          class: tooltip({
            variant: 'default',
            placement: tooltipPlacement,
            unstyled,
            class: [ui?.tooltip?.class],
          }),
          variant: 'default',
          ...tooltipProps,
        }"
      >
        <div
          :class="
            tooltip({
              variant: 'default',
              placement: tooltipPlacement,
              unstyled,
              class: [ui?.tooltip?.class],
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
