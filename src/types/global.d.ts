import { JSX } from 'solid-js';

declare global {
  type StyleProps = Pick<
    JSX.HTMLAttributes<HTMLElement>,
    'class' | 'classList' | 'style'
  >;
  type NormalizedStyleProps = { class?: string; style?: string };

  // util
  type NonReadonly<T extends {}> = {
    -readonly [P in keyof T]: T[P];
  };
  type DeepNonReadonly<T extends {}> = {
    -readonly [P in keyof T]: T[P] extends {} ? DeepNonReadonly<T[P]> : T[P];
  };
  type LooseObject = { [key: string]: any };
  type ObjectIterator<T, R> = (v: T[keyof T], k: string, o: T) => R;
}

declare module 'solid-js' {
  namespace JSX {
    interface CustomEvents extends HTMLElementEventMap {}
  }
}
