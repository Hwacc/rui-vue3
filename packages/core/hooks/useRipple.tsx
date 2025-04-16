import { computed, ComputedRef, MaybeRef, ref, unref, watchEffect } from 'vue'

type MaybeRefOrComputedRef<T> = MaybeRef<T> | ComputedRef<T>

type Options = {
  duration?: MaybeRefOrComputedRef<number | undefined>
  color?: MaybeRefOrComputedRef<string | undefined>
}

export const useRipple = ({
  duration = 600,
  color = '#44D62C'
}: Options = {}) => {
  const referenceRef = ref<any>(null)
  const ripples = ref<
    Array<{ x: number; y: number; size: number; key: number }>
  >([])

  const onRipple = (event: MouseEvent) => {
    if (!referenceRef.value) return
    const reference = referenceRef.value.$el ?? referenceRef.value
    if (getComputedStyle(reference).position === 'static') {
      reference.classList.add('relative')
      reference.classList.add('overflow-hidden')
    }

    const rect = reference.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const newRipple = { x, y, size, key: Date.now() }
    ripples.value.push(newRipple)
  }

  watchEffect(() => {
    if (ripples.value.length > 0) {
      const lastRipple = ripples.value[ripples.value.length - 1]
      setTimeout(() => {
        ripples.value = ripples.value.filter(
          (ripple) => ripple.key !== lastRipple.key
        )
      }, unref(duration))
    } else {
      if (!referenceRef.value) return
      const reference = referenceRef.value.$el ?? referenceRef.value
      reference.classList.remove('relative')
      reference.classList.remove('overflow-hidden')
    }
  })

  const Ripple = computed(() => (
    <span
      class={[
        'pointer-events-none absolute inset-0',
        !ripples.value.length && 'hidden'
      ]}>
      {ripples.value.map((ripple) => (
        <span
          key={ripple.key}
          class='animate-rippling absolute rounded-full bg-transparent opacity-30'
          style={{
            width: ripple.size + 'px',
            height: ripple.size + 'px',
            top: ripple.y + 'px',
            left: ripple.x + 'px',
            backgroundColor: unref(color),
            transform: 'scale(0)',
            animationDuration: unref(duration) + 'ms'
          }}
        />
      ))}
    </span>
  ))

  return {
    Ripple,
    onRipple,
    referenceRef
  }
}
