import { mdiGithub, mdiHeart, mdiXml } from '@mdi/js';
import { t } from './util';

const unique = Symbol();
type ItemData = Partial<ItemMeta<typeof unique, typeof unique>> &
  Record<string, unknown>;
type ItemKD<K extends string = string, D extends ItemData = ItemData> = [K, D];
type ItemMeta<K = string, V = number> = {
  /**成员名 */ name: K;
  /**成员值 */ value: V;
};
export type EnumMeta<
  V extends number[] = number[],
  D extends Merge<ItemData, ItemMeta>[] = Merge<ItemData, ItemMeta>[],
> = {
  /**所有成员枚举 */ enums: V;
  /**所有成员 */ items: D;
};
/**推断枚举值 */
export type Enum<T extends EnumMeta> = T['enums'][number];
/**构建枚举对象 */
export function toEnum<const T extends ItemKD[]>(...config: T) {
  type EnumValue = IntToTuple<T['length']>;
  //@ts-ignore
  type EnumIndex = EnumValue[number];
  type EnumObject<I = EnumIndex> = UnionToIntersection<
    I extends number
      ? T[I] extends ItemKD<infer K, infer V>
        ? { readonly [P in I | K]: V & ItemMeta<K, I> }
        : never
      : never
  >;
  return config.reduce<EnumMeta>(
    (acc, [k, v], i) => {
      Object.assign(v, { name: k, value: i } satisfies ItemMeta);
      Object.assign(acc, { [k]: v, [i]: v });
      acc.enums.push(i);
      acc.items.push(v);
      return acc;
    },
    { enums: [], items: [] },
  ) as EnumObject &
    //@ts-ignore
    EnumMeta<EnumValue, UnionToTuple<EnumObject[EnumIndex]>>;
}

export const Links = toEnum(
  [
    'contribute',
    {
      get text() {
        return t('btn:contribute');
      },
      desc: '',
      path: 'contribute',
      icon: mdiXml,
    },
  ],
  [
    'donate',
    {
      get text() {
        return t('btn:donate');
      },
      desc: '',
      path: 'donate',
      icon: mdiHeart,
    },
  ],
  [
    'GitHub',
    {
      text: 'GitHub',
      desc: '',
      path: 'https://github.com/bluebonesx',
      icon: mdiGithub,
    },
  ],
  [
    'xiaohongshu',
    {
      get text() {
        return t('logo:xiaohongshu');
      },
      desc: '',
      path: 'https://www.xiaohongshu.com/user/profile/6498e283000000001c02a845',
      icon: 'https://www.xiaohongshu.com/favicon.ico',
    },
  ],
);
