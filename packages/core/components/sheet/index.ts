import { PREFIX } from '@/core/lib/constants'
import { cva, type VariantProps } from '@/core/lib/cva'

export { default as Sheet } from './Sheet.vue'
export { default as SheetClose } from './SheetClose.vue'
export { default as SheetContent } from './SheetContent.vue'
export { default as SheetDescription } from './SheetDescription.vue'
export { default as SheetFooter } from './SheetFooter.vue'
export { default as SheetHeader } from './SheetHeader.vue'
export { default as SheetTitle } from './SheetTitle.vue'
export { default as SheetTrigger } from './SheetTrigger.vue'

const prefix = `${PREFIX}-sheet`
export const sheetVariants = cva(
  [
    'fixed',
    'z-50',
    'transition',
    'ease-in-out',
    'data-[state=open]:animate-in',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:duration-300',
    'data-[state=open]:duration-500'
  ],
  {
    variants: {
      side: {
        top: [
          'inset-x-0',
          'top-0',
          'data-[state=closed]:slide-out-to-top',
          'data-[state=open]:slide-in-from-top'
        ],
        bottom: [
          'inset-x-0',
          'bottom-0',
          'data-[state=closed]:slide-out-to-bottom',
          'data-[state=open]:slide-in-from-bottom'
        ],
        left: [
          'inset-y-0',
          'left-0',
          'h-full',
          'w-3/4',
          'data-[state=closed]:slide-out-to-left',
          'data-[state=open]:slide-in-from-left',
          'sm:max-w-sm'
        ],
        right: [
          'inset-y-0',
          'right-0',
          'h-full',
          'w-3/4',
          'data-[state=closed]:slide-out-to-right',
          'data-[state=open]:slide-in-from-right',
          'sm:max-w-sm'
        ]
      }
    },
    defaultVariants: {
      side: 'right'
    }
  },
  {
    className: `${prefix}`
  }
)
export type SheetVariants = VariantProps<typeof sheetVariants>

export const sheetOverlayVariants = cva(
  [
    'fixed',
    'inset-0',
    'z-50',
    'bg-black/80',
    'data-[state=open]:animate-in',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0',
    'data-[state=open]:fade-in-0'
  ],
  undefined,
  {
    className: `${prefix}-overlay`
  }
)

export const sheetCloseVariants = cva(
  ['group', 'rounded', 'disabled:pointer-events-none'],
  undefined,
  {
    className: `${prefix}-close`
  }
)

export const sheetHeaderVariants = cva(
  'flex flex-col gap-y-2 text-center sm:text-left',
  undefined,
  {
    className: `${prefix}-header`
  }
)

export const sheetFooterVariants = cva(
  'flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2',
  undefined,
  {
    className: `${prefix}-footer`
  }
)

export const sheetTitleVariants = cva('text-lg', undefined, {
  className: `${prefix}-title`
})

export const sheetDescriptionVariants = cva(
  'text-sm',
  undefined,
  {
    className: `${prefix}-description`
  }
)
