import { JSX, createMemo } from 'solid-js';
import Icon from './icon';
import { Link } from './article';

export default function (
  p: Partial<{
    text: string;
    class: string;
    path: string;
    icon: string;
    img: string;
    onClick: (e: MouseEvent) => void;
    children: JSX.Element;
  }>,
) {
  const children = () => (
    <>
      {p.icon && <Icon>{p.icon}</Icon>}
      {p.img && (
        <div class='w-10 rounded-full'>
          <img
            referrerpolicy='no-referrer'
            loading='lazy'
            width={24}
            height={24}
            class='pointer-events-none no-space'
            src={p.img}
          />
        </div>
      )}
      {p.children ?? p.text}
    </>
  );
  const sharedProps = createMemo(() => ({
    class: 'btn btn-ghost ml-2 first:ml-0 ' + (p.class ?? ''),
    onClick: p.onClick,
    children: children(),
  }));
  return p.path ? (
    <Link path={p.path} {...sharedProps()}></Link>
  ) : (
    <button {...sharedProps()}></button>
  );
}
