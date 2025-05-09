import type { DateValue } from 'reka-ui'
import type { Ref } from 'vue'
import { injectCalendarRootContext } from 'reka-ui'
import { nextTick } from 'vue'

export const SELECTOR
  = '[data-reka-calendar-cell-trigger]:not([data-outside-view]):not([data-outside-visible-view])'
export function getSelectableCells(calendar: HTMLElement): HTMLElement[] {
  return Array.from(calendar.querySelectorAll(SELECTOR)) ?? []
}

export function useCellTriggerKeyControl({
  currentElement,
  indexIncrementation = 3,
  onPrevPage,
  onNextPage,
  onSelect,
}: {
  currentElement: Ref<HTMLElement>
  indexIncrementation?: number
  onPrevPage?: (placeholder: DateValue) => DateValue
  onNextPage?: (placeholder: DateValue) => DateValue
  onSelect?: () => void
}) {
  const context = injectCalendarRootContext()
  const handleArrowKey = (e: KeyboardEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const parentElement = context.parentElement.value!
    const sign = context.dir.value === 'rtl' ? -1 : 1
    switch (e.code) {
      case 'ArrowRight':
        shiftFocus(currentElement.value, sign)
        break
      case 'ArrowLeft':
        shiftFocus(currentElement.value, -sign)
        break
      case 'ArrowUp':
        shiftFocus(currentElement.value, -indexIncrementation)
        break
      case 'ArrowDown':
        shiftFocus(currentElement.value, indexIncrementation)
        break
      case 'Enter':
      case 'Space':
        onSelect?.()
        break
    }

    function shiftFocus(node: HTMLElement, add: number) {
      const allCollectionItems: HTMLElement[]
        = getSelectableCells(parentElement)
      if (!allCollectionItems.length)
        return

      const index = allCollectionItems.indexOf(node)
      const newIndex = index + add

      if (newIndex >= 0 && newIndex < allCollectionItems.length) {
        if (allCollectionItems[newIndex].hasAttribute('data-disabled')) {
          shiftFocus(allCollectionItems[newIndex], add)
        }
        allCollectionItems[newIndex].focus()
        return
      }

      if (newIndex < 0) {
        if (context.isPrevButtonDisabled())
          return
        context.prevPage(onPrevPage)
        nextTick(() => {
          const newCollectionItems: HTMLElement[]
            = getSelectableCells(parentElement)
          if (!newCollectionItems.length)
            return
          const computedIndex = newCollectionItems.length - Math.abs(newIndex)
          if (newCollectionItems[computedIndex].hasAttribute('data-disabled')) {
            shiftFocus(newCollectionItems[computedIndex], add)
          }
          newCollectionItems[computedIndex].focus()
        })
        return
      }

      if (newIndex >= allCollectionItems.length) {
        if (context.isNextButtonDisabled())
          return
        context.nextPage(onNextPage)
        nextTick(() => {
          const newCollectionItems: HTMLElement[]
            = getSelectableCells(parentElement)
          if (!newCollectionItems.length)
            return
          const computedIndex = newIndex - allCollectionItems.length
          if (newCollectionItems[computedIndex].hasAttribute('data-disabled')) {
            shiftFocus(newCollectionItems[computedIndex], add)
          }
          newCollectionItems[computedIndex].focus()
        })
      }
    }
  }

  return { handleArrowKey }
}
