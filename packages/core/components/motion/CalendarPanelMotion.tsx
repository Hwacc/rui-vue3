import type { MotionHTMLAttributes, MotionProps } from 'motion-v'
import { useAnimationParams } from '@rui/core/composables/useAnimationParams'
import { merge } from 'lodash-es'
import { motion } from 'motion-v'
import { computed, defineComponent } from 'vue'

export const CalendarPanelMotion = defineComponent<
  MotionProps<'div'> & MotionHTMLAttributes<'div'>
>({
  name: 'CalendarPanelMotion',
  setup(props, { slots }) {
    const { duration, ease } = useAnimationParams();
    const mergedProps = computed(() => {
      return merge(
        {},
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.9 },
          transition: { duration, ease },
        },
        props
      );
    });
    return () => {
      return <motion.div {...mergedProps.value}>{slots.default?.()}</motion.div>;
    };
  },
});
