import { defineComponent, ref, Ref, toRefs } from 'vue';
import { TagsInputVariants } from '.';
import { createContext } from 'reka-ui';

const [injectTagsInputContextEx, provideTagsInputContextEx] = createContext<{
  size?: Ref<TagsInputVariants['size']>;
  tagsInputElement: Ref<HTMLElement | undefined>;
}>('TagsInputProviderEx');

export { injectTagsInputContextEx };

export const TagsInputProviderEx = defineComponent({
  name: 'TagsInputProviderEx',
  props: {
    size: {
      type: String as () => TagsInputVariants['size'],
      default: 'base',
    },
  },
  setup(props, { slots }) {
    const { size } = toRefs(props);
    const tagsInputElement = ref<HTMLElement | undefined>(undefined);
    provideTagsInputContextEx({ size, tagsInputElement });
    return () => slots.default?.();
  },
});
