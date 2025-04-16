import { DirectiveBinding } from 'vue'

interface ElementExband extends Element {
  __aria_keydown__?: (event: KeyboardEvent) => void
}

const directive = {
  inserted(el: ElementExband, binding: DirectiveBinding) {
    if (!binding.value || !el) return
    const { index = 0, action, role, pt, ...rest } = binding.value

    let targetEl = el
    if (pt && typeof pt === 'string') {
      targetEl = el.querySelector(pt) || el
    } else if (pt) {
      targetEl = el.querySelector('& [tabindex]') || el
    }
    targetEl.setAttribute('tabindex', binding.arg ?? index)
    if (role) targetEl.setAttribute('role', role)

    if (action) {
      targetEl.__aria_keydown__ = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          // Enter
          event.preventDefault()
          binding.modifiers.stop && event.stopPropagation()
          action(event)
        }
      }
      targetEl.addEventListener('keydown', el.__aria_keydown__ as any)
    }

    for (const key in rest) {
      if (key.startsWith('aria-')) {
        targetEl.setAttribute(key, rest[key])
      } else {
        targetEl.setAttribute(`aria-${key}`, rest[key])
      }
    }
  },

  update(el: ElementExband, binding: DirectiveBinding) {
    directive.unbind(el)
    directive.inserted(el, binding)
  },

  unbind(el: ElementExband) {
    if (el && el.__aria_keydown__) {
      el.removeEventListener('keydown', el.__aria_keydown__ as any)
      delete el.__aria_keydown__
    }
  }
}

export default directive
