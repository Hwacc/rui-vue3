import { computed, defineComponent, getCurrentInstance, watch } from 'vue';
// HACK
import { i as injectPopperContentContext } from 'node_modules/reka-ui/dist/Popper/PopperContent.js';
import { motion } from 'motion-v';
import { injectSelectRootContext, useForwardExpose } from 'reka-ui';
import { getCssVar } from '@/lib/utils';
import { i as injectSelectContentContext } from 'node_modules/reka-ui/dist/Select/SelectContentImpl.js';

export const PopperContentMotion = defineComponent({
  name: 'PopperContentMotion',
  setup(props, { slots }) {
    // console.log('PopperContentMotion', getCurrentInstance()?.parent);
    // const { placedSide }: { placedSide: 'bottom' | 'top' | 'left' | 'right' } =
    //   injectPopperContentContext();
    // const { open } = injectSelectRootContext();

    const { content } = injectSelectContentContext();
    console.log('PopperContentMotion', content);
    watch(() => content, (v) => {
      console.log('PopperContentMotion', v);
    })
    const animation = computed(() => {
      const _anime: Array<Record<string, number>> = [
        {
          opacity: 0,
          scale: 0.95,
        },
        {
          opacity: 1,
          scale: 1,
        },
        {
          opacity: 0,
          scale: 0.9,
        },
      ];
      switch (null) {
        case 'top':
          _anime[0].y = -160;
          _anime[1].y = 0;
          break;
        case 'bottom':
          _anime[0].y = -16;
          _anime[1].y = 0;
          break;
        case 'left':
          _anime[0].x = 16;
          _anime[1].x = 0;
          break;
        case 'right':
          _anime[0].x = -16;
          _anime[1].x = 0;
          break;
      }
      return _anime;
    });

    return () => (
      <motion.div
        {...props}
        initial={animation.value[0]}
        animate={animation.value[1]}
        exit={animation.value[2]}
        transition={{
          duration: 0.15,
        }}>
        {{
          default: slots.default,
        }}
      </motion.div>
    );
  },
});
