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
  ['fixed', 'z-50', 'motion-duration-200'],
  {
    variants: {
      side: {
        top: [
          'inset-x-0',
          'top-0',
          'data-[state=closed]:motion-translate-y-out-[-100%]',
          'data-[state=open]:motion-translate-y-in-[-100%]'
        ],
        bottom: [
          'inset-x-0',
          'bottom-0',
          'data-[state=closed]:motion-translate-y-out-100',
          'data-[state=open]:motion-translate-y-in-100'
        ],
        left: [
          'inset-y-0',
          'left-0',
          'h-full',
          'w-3/4',
          'data-[state=closed]:motion-translate-x-out-[-100%]',
          'data-[state=open]:motion-translate-x-in-[-100%]',
          'sm:max-w-sm'
        ],
        right: [
          'inset-y-0',
          'right-0',
          'h-full',
          'w-3/4',
          'data-[state=closed]:motion-translate-x-out-100',
          'data-[state=open]:motion-translate-x-in-100',
          'sm:max-w-sm'
        ]
      }
    },
    defaultVariants: {
      side: 'right'
    }
  },
  {
    className: [`${prefix}`, `${prefix}-content`]
  }
)
export type SheetVariants = VariantProps<typeof sheetVariants>

export const sheetOverlayVariants = cva(
  [
    'fixed',
    'inset-0',
    'z-50',
    'bg-black/80',
    'motion-duration-200',
    'data-[state=open]:motion-opacity-in',
    'data-[state=closed]:motion-opacity-out'
  ],
  undefined,
  {
    className: `${prefix}-overlay`
  }
)

export const sheetContentCloseVariants = cva(
  ['group', 'rounded', 'disabled:pointer-events-none'],
  undefined,
  {
    className: `${prefix}-content-close`
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

export const sheetDescriptionVariants = cva('text-sm', undefined, {
  className: `${prefix}-description`
})
