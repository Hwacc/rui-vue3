import { useAnimationParams } from '@/core/hooks/useAnimationParams'
import { merge } from 'lodash-es'
import { motion, MotionHTMLAttributes, MotionProps } from 'motion-v'
import { computed, defineComponent } from 'vue'

export const CalendarPanelMotion = defineComponent<
  MotionProps<'div'> & MotionHTMLAttributes<'div'>
>({
  name: 'CalendarPanelMotion',
  setup(props, { slots }) {
    const { animationDuration, animationEase } = useAnimationParams()
    const mergedProps = computed(() => {
      return merge(
        {},
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.9 },
          transition: { duration: animationDuration, easings: animationEase }
        },
        props
      )
    })
    return () => {
      return <motion.div {...mergedProps.value}>{slots.default?.()}</motion.div>
    }
  }
})
