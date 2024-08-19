import { mergeProps } from 'solid-js';

export default function (p: {
  class?: string;
  size?: number;
  children: string;
}) {
  p = mergeProps({ class: '', size: 24 }, p);
  return (
    <svg
      class={p.class + ' fill-current'}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width={p.size}
      height={p.size}
    >
      <path d={p.children}></path>
    </svg>
  );
}
