import type { MotionHTMLAttributes, MotionProps } from 'motion-v'
import { useAnimationParams } from '@rui/core/composables/useAnimationParams'
import { merge } from 'lodash-es'
import { motion } from 'motion-v'
import { computed, defineComponent } from 'vue'

export const TreeItemMotion = defineComponent<
  MotionProps<'div'> & MotionHTMLAttributes<'div'>
>({
  name: 'TreeItemMotion',
  setup(props, { slots }) {
    const { duration, ease } = useAnimationParams()
    const mergedProps = computed(() => {
      return merge(
        {},
        {
          initial: { height: 0, opacity: 0, rotateX: 90 },
          animate: { height: 'auto', opacity: 1, rotateX: 0 },
          exit: { height: 0, opacity: 0, rotateX: -90 },
          transition: { duration, ease },
        },
        props,
      )
    })
    return () => {
      return <motion.div {...mergedProps.value}>{slots.default?.()}</motion.div>
    }
  },
})
