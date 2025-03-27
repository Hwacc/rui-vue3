import { cva as originCva } from 'class-variance-authority';
import type { ClassProp, ClassValue, StringToBoolean } from 'class-variance-authority/types';
import { merge } from 'lodash-es';

type ConfigSchema = Record<string, Record<string, ClassValue>>;
type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T | 'ruiPrefix']?:
    | StringToBoolean<keyof T[Variant]>
    | boolean
    | null
    | undefined;
};
type ConfigVariantsMulti<T extends ConfigSchema> = {
  [Variant in keyof T | 'ruiPrefix']?:
    | StringToBoolean<keyof T[Variant]>
    | StringToBoolean<keyof T[Variant]>[]
    | boolean
    | undefined;
};
type Config<T> = T extends ConfigSchema
  ? {
      variants?: T & { ruiPrefix?: Record<'true' | 'false', ClassValue> };
      defaultVariants?: ConfigVariants<T & { ruiPrefix?: boolean }>;
      compoundVariants?: (T extends ConfigSchema
        ? (
            | ConfigVariants<T & { ruiPrefix?: boolean }>
            | ConfigVariantsMulti<T & { ruiPrefix?: boolean }>
          ) &
            ClassProp
        : ClassProp & { ruiPrefix?: boolean })[];
    }
  : never;
type Props<T> = T extends ConfigSchema ? ConfigVariants<T> & ClassProp : ClassProp;

export { type VariantProps } from 'class-variance-authority';
export const cva = <T>(base?: ClassValue, config?: Config<T>): ((props?: Props<T>) => string) => {
  return originCva<
    T & {
      variants: { ruiPrefix: { true: string; false: null } };
      defaultVariants: { ruiPrefix: boolean };
    }
  >(
    base,
    merge({}, config, {
      variants: {
        ruiPrefix: {
          true: '',
          false: null,
        },
      },
      defaultVariants: {
        ruiPrefix: true,
      },
    }) as any
  );
};
