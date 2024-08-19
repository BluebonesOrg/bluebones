import { map, mapValues } from 'lodash-es';
import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  Signal,
} from 'solid-js';
import { breakpoints } from './const';

export function mergeStyleProps(...ps: StyleProps[]): NormalizedStyleProps {
  function normalize(p: StyleProps) {
    const _p: NormalizedStyleProps = {};
    if (p.class) {
      _p.class = p.class;
    }
    if (p.classList) {
      _p.class =
        (_p.class ??= '') + map(p.classList, (v, k) => (v ? k : '')).join(' ');
      delete p.classList;
    }
    if (typeof p.style === 'object') {
      _p.style = map(p.style, (v, k) => `${k}:${v}`).join(';');
    }
    return _p;
  }
  const mergeStyle = ps.reduce((acc, p) => {
    const { class: c, style: s } = normalize(p);
    if (c) {
      acc.class = (acc.class ?? '') + c + ' ';
    }
    if (s) {
      acc.style = (acc.style ??= '') + s + ';';
    }
    return acc;
  }, {} as NormalizedStyleProps);
  return Object.assign({}, ...ps.concat(mergeStyle));
}

//hooks
export function useEventListener<K extends keyof WindowEventMap>(
  el: Window,
  name: K,
  listener: (e: WindowEventMap[K]) => void,
): void;
export function useEventListener(
  el: EventTarget,
  name: string,
  listener: <T extends Event>(e: T) => void,
) {
  import.meta.env.DEV && console.log('事件监听', name);
  el.addEventListener(name, listener, true);
  onCleanup(() => {
    import.meta.env.DEV && console.log('事件取消', name);
    el.removeEventListener(name, listener);
  });
}
export function useMatchMedia(query: string) {
  const [matches, setMatches] = createSignal(false);
  onMount(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    //@ts-ignore
    useEventListener(mql, 'change', (e: MediaQueryListEvent) =>
      setMatches(e.matches),
    );
  });
  return matches;
}
export function useBreakpoint() {
  const getters = mapValues(breakpoints, (v, k) => ({
    get() {
      const matches = useMatchMedia(`(min-width: ${v}px)`);
      import.meta.env.DEV &&
        createEffect(() => console.log('breakpoint', k, matches()));
      return matches;
    },
  }));
  return Object.defineProperties({}, getters) as {
    readonly [K in keyof typeof breakpoints]: () => boolean;
  };
}
export function useLocalStorage<T>(key: string, defaultValue: T): Signal<T> {
  const v = localStorage.getItem(key);
  const [value, setValue] = createSignal<T>(v ? JSON.parse(v) : defaultValue);
  createEffect(() => {
    localStorage.setItem(key, JSON.stringify(value()));
  });
  return [value, setValue];
}
