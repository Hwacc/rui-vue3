import { cva as originCva } from 'class-variance-authority';
import type { ClassProp, ClassValue, StringToBoolean } from 'class-variance-authority/types';
import { compact, concat, merge, mergeWith } from 'lodash-es';

type ConfigSchema = Record<string, Record<string, ClassValue>>;
type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T | 'unstyled']?:
    | StringToBoolean<keyof T[Variant]>
    | boolean
    | null
    | undefined;
};
type ConfigVariantsMulti<T extends ConfigSchema> = {
  [Variant in keyof T | 'unstyled']?:
    | StringToBoolean<keyof T[Variant]>
    | StringToBoolean<keyof T[Variant]>[]
    | boolean
    | undefined;
};
type Config<T> = T extends ConfigSchema
  ? {
      variants?: T & { unstyled?: Partial<Record<'true' | 'false', ClassValue>> };
      defaultVariants?: ConfigVariants<T & { unstyled?: boolean }>;
      compoundVariants?: (T extends ConfigSchema
        ? (
            | ConfigVariants<T & { unstyled?: boolean }>
            | ConfigVariantsMulti<T & { unstyled?: boolean }>
          ) &
            ClassProp
        : ClassProp & { unstyled?: boolean })[];
    }
  : never;
type Props<T> = T extends ConfigSchema
  ? ConfigVariants<T> & ClassProp
  : ClassProp & { unstyled?: boolean };

export { type VariantProps } from 'class-variance-authority';
export const cva = <T>(
  base?: ClassValue,
  config?: Config<T>,
  ruiConfig?: {
    className?: string | string[];
    compound?: Config<T>['compoundVariants'];
  }
): ((props?: Props<T>) => string) => {
  const mergedCvaOption = mergeWith(
    {
      variants: {
        unstyled: {
          true: '',
          false: ruiConfig?.className ?? '' ,
        },
      },
      defaultVariants: {
        unstyled: false,
      },
      compoundVariants: ruiConfig?.compound ?? [],
    },
    config,
    (object, source, key) => {
      if (key === 'compoundVariants') {
        return compact(concat([], object, source));
      } else {
        return merge(object, source);
      }
    }
  ) as any;
  return originCva<
    T & {
      variants: { unstyled: { true: null; false: string } };
      defaultVariants: { unstyled: boolean };
    }
  >(base, mergedCvaOption);
};
