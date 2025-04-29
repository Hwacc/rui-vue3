/*
 *  NOTICE:
 *  在Select的Content组件中,其实现为reka-ui Presence(bug), Dropdown Content实现为对的
 *  但却在卸载中使用v-if来卸载组件，导致退出动画无法生效，故使用motion-v来实现动画
 *  see: line#48 https://github.com/unovue/reka-ui/blob/v2/packages/core/src/Select/SelectContent.vue
 */
import { computed, defineComponent, toRefs } from 'vue'
import { motion } from 'motion-v'
import { spaceTimes } from '@/core/lib/utils'
import { useAnimationParams } from '@/core/hooks/useAnimationParams'

export const PopoverContentMotion = defineComponent({
  name: 'PopoverContentMotion',
  props: {
    side: {
      type: String as () => 'bottom' | 'top' | 'left' | 'right',
      default: 'bottom'
    }
  },
  setup(props, { slots }) {
    const { side } = toRefs(props)
    const { animationDuration, animationEase } = useAnimationParams()
    const animation = computed(() => {
      const _anime: Array<Record<string, number>> = [
        {
          // initial
          opacity: 0,
          scale: 0.95
        },
        {
          // animate
          opacity: 1,
          scale: 1
        },
        {
          // exit
          opacity: 0,
          scale: 0.9
        }
      ]
      switch (side.value) {
        case 'bottom':
          _anime[0]['y'] = spaceTimes(2)
          _anime[1]['y'] = 0
          _anime[2]['y'] = spaceTimes(2)
          break
        case 'top':
          _anime[0]['y'] = -spaceTimes(2)
          _anime[1]['y'] = 0
          _anime[2]['y'] = -spaceTimes(2)
          break
        case 'left':
          _anime[0]['x'] = -spaceTimes(2)
          _anime[1]['x'] = 0
          _anime[2]['x'] = -spaceTimes(2)
          break
        case 'right':
          _anime[0]['x'] = spaceTimes(2)
          _anime[1]['x'] = 0
          _anime[2]['x'] = spaceTimes(2)
          break
      }
      return _anime
    })
    return () => (
      <motion.div
        initial={animation.value[0]}
        animate={animation.value[1]}
        exit={animation.value[2]}
        transition={{
          duration: animationDuration,
          easings: animationEase
        }}>
        {{
          default: slots.default
        }}
      </motion.div>
    )
  }
})
