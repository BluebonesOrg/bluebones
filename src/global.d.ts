/// <reference types="@solidjs/start/env" />
import { Component, JSX } from 'solid-js';

declare global {
  type StyleProps = Pick<
    JSX.HTMLAttributes<HTMLElement>,
    'class' | 'classList' | 'style'
  >;
  type NormalizedStyleProps = { class?: string; style?: string };

  // util
  type Props<T extends Component<any>> = Parameters<T>[0];
  type NonReadonly<T extends {}> = {
    -readonly [P in keyof T]: T[P];
  };
  type DeepNonReadonly<T extends {}> = {
    -readonly [P in keyof T]: T[P] extends {} ? DeepNonReadonly<T[P]> : T[P];
  };
}
