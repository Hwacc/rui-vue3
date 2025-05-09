export { default as Slider } from './Slider.vue'

export const sliderClass = [
  'relative',
  'flex',
  'w-full',
  'touch-none',
  'select-none',
  'items-center',
  'data-[orientation=vertical]:flex-col',
  'data-[orientation=vertical]:w-2',
  'data-[orientation=vertical]:h-full',
]

export const sliderTrackClass = [
  'relative',
  'h-2',
  'w-full',
  'data-[orientation=vertical]:w-2',
  'grow',
  'overflow-hidden',
  'rounded-full',
  'bg-h33',
]

export const sliderRangeClass = [
  'absolute',
  'h-full',
  'data-[orientation=vertical]:w-full',
  'bg-rz-green',
]

export const sliderThumbClass = [
  'block',
  'h-5',
  'w-5',
  'rounded-full',
  'border-2',
  'border-rz-green',
  'bg-h00',
  'transition-colors',
  'focus-visible:outline-none',
  'disabled:pointer-events-none',
  'disabled:opacity-(--disabled-opacity)',
]
