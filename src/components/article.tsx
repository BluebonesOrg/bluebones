import { For, JSX, ParentProps, mergeProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export function H(p: ParentProps<{ level: 1 | 2 | 3 }>) {
  return (
    <Dynamic component={'h' + p.level} id={'' + p.children}>
      <a
        href={'#' + p.children}
        class='mr-2 opacity-20 hover:opacity-60 font-bold no-underline'
      >
        #
      </a>
      {p.children}
    </Dynamic>
  );
}
type ListItem = { text?: string; desc?: string; content?: JSX.Element };
export function List(p: {
  class?: string;
  type: 'ul' | 'ol';
  items: ListItem[];
}) {
  return (
    <Dynamic component={p.type} class={p.class}>
      <For each={p.items}>
        {(e) => (
          <li>
            <strong>{e.text}</strong>
            <p>{e.desc}</p>
            {e.content}
          </li>
        )}
      </For>
    </Dynamic>
  );
}
export function Link(_p: {
  class?: string;
  path?: string;
  children?: JSX.Element;
}) {
  const p = mergeProps({ path: '/404' }, _p);
  return (
    <a
      class={p.class}
      href={p.path}
      target={/^.?\//.test(p.path) ? '_self' : '_blank'}
    >
      {p.children}
    </a>
  );
}
export function Article(p: ParentProps) {
  return (
    <article class='prose prose-sm md:prose-base max-w-none my-12 mx-5 md:mx-20'>
      {p.children}
    </article>
  );
}
