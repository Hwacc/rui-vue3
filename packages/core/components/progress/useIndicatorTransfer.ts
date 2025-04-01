import { colorHex2RgbObject, detectCssColorType } from '@/core/lib/colors';
import { getNodeCssVar } from '@/core/lib/utils';
import { MaybeRef, reactive, ref, unref, watchEffect } from 'vue';
import { ProgressIndicatorVariants } from '.';

export const useIndicatorTransfer = (
  variant: MaybeRef<ProgressIndicatorVariants['variant']>,
  progress: MaybeRef<number | null | undefined>
) => {
  const indicatorRef = ref<any>(null);
  const transferStyle = reactive({
    transform: `translateX(-${100 - (unref(progress) ?? 0)}%)`,
    background: '',
  });
  watchEffect(
    () => {
      if (unref(variant) === 'transfer') {
        const indicatorEl = unref(indicatorRef).$el ? unref(indicatorRef).$el : unref(indicatorRef);
        transferStyle.transform = `translateX(-${100 - (unref(progress) ?? 0)}%)`;
        const { type: fromType, value: fromValue } = detectCssColorType(
          getNodeCssVar(indicatorEl, '--transfer-from', '#000') as string
        );
        const { type: toType, value: toValue } = detectCssColorType(
          getNodeCssVar(indicatorEl, '--transfer-to', '#fff') as string
        );
        
        if (fromType !== toType)
          throw new Error('transfer indicator from and to must be same color type');
        const step = (unref(progress) ?? 0) / 100;
        switch (fromType) {
          case 'lab': {
            transferStyle.background = `lab(${fromValue.l + (toValue.l - fromValue.l) * step} ${
              fromValue.a + (toValue.a - fromValue.a) * step
            } ${fromValue.b + (toValue.b - fromValue.b) * step})`;
            break;
          }
          case 'hex':
          case 'hexa': {
            const fromRGB = colorHex2RgbObject(fromValue);
            const toRGB = colorHex2RgbObject(toValue);
            transferStyle.background = `rgb(${fromRGB.r + (toRGB.r - fromRGB.r) * step} ${
              fromRGB.g + (toRGB.g - fromRGB.g) * step
            } ${fromRGB.b + (toRGB.b - fromRGB.b) * step})`;
            break;
          }
          case 'rgb':
          case 'rgba': {
            transferStyle.background = `rgb(${fromValue.r + (toValue.r - fromValue.r) * step} ${
              fromValue.g + (toValue.g - fromValue.g) * step
            } ${fromValue.b + (toValue.b - fromValue.b) * step})`;
            break;
          }
        }
      }
    },
    { flush: 'post' }
  );
  return {
    indicatorRef,
    transferStyle,
  };
};
