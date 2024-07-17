import _ from 'lodash-es';
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { breakpoints } from './const';

export function mergeStyleProps(...ps: StyleProps[]): NormalizedStyleProps {
    function normalize(p: StyleProps) {
        const _p: NormalizedStyleProps = {};
        if (p.class) {
            _p.class = p.class;
        }
        if (p.classList) {
            _p.class =
                (_p.class ??= '') +
                _.map(p.classList, (v, k) => (v ? k : '')).join(' ');
            delete p.classList;
        }
        if (typeof p.style === 'object') {
            _p.style = _.map(p.style, (v, k) => `${k}:${v}`).join(';');
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
export function useEventListener(
    el: EventTarget,
    type: string,
    callback: (e: Event) => void
) {
    import.meta.env.DEV && console.log('事件监听', type);
    el.addEventListener(type, callback, true);
    onCleanup(() => {
        import.meta.env.DEV && console.log('事件取消', type);
        el.removeEventListener(type, callback);
    });
}
export function useBreakpoint() {
    const getters = _.mapValues(breakpoints, (v, k) => ({
        get() {
            const [breakpoint, setBreakpoint] = createSignal(false);
            import.meta.env.DEV &&
                createEffect(() => console.log('breakpoint', k, breakpoint()), {
                    lazy: true,
                });
            onMount(() => {
                const query = window.matchMedia(`(min-width: ${v}px)`);
                setBreakpoint(query.matches);
                useEventListener(
                    query,
                    'change',
                    //@ts-ignore
                    (e: MediaQueryListEvent) => setBreakpoint(e.matches)
                );
            });
            return breakpoint;
        },
    }));
    return Object.defineProperties({}, getters) as {
        readonly [K in keyof typeof breakpoints]: () => boolean;
    };
}
export function useLocation() {
    const [location, setLocation] = createSignal(window.location);
    useEventListener(window, 'popstate', () => setLocation(window.location));
    return location;
}
