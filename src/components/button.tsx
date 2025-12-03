import { A } from '@solidjs/router';
import { ComponentProps, createMemo, For, JSX } from 'solid-js';
import { cn } from '~/ts/util';
import { Icon } from './icon';

export const Link = (p: {
  path: string;
  class?: string;
  children?: JSX.Element;
}) => {
  return (
    <A
      class={cn('link', p.class)}
      href={p.path}
      target={p.path.startsWith('http') ? '_blank' : '_self'}
      children={p.children}
    />
  );
};
export const Btn = <
  T extends 'button' | 'link' | 'swap' | 'dropdown' = 'button',
>(
  p: Partial<
    {
      type: T;
      path: T extends 'link' ? string : never;
      dropdownClass: T extends 'dropdown' ? string : never;
    } & {
      class: string;
      text: string;
      icon: string;
      onClick: (e: MouseEvent) => void;
      children: JSX.Element;
    }
  >,
) => {
  const shared = createMemo(() => ({
    class: cn('btn no-underline', p.class),
    onClick: p.onClick,
  }));
  const children = () => [p.icon && <Icon children={p.icon} />, p.text];
  if (!p.type || p.type === 'button') {
    return <button {...{ ...shared(), children: p.children ?? children() }} />;
  }
  if (p.type === 'link') {
    return (
      <Link
        {...{
          ...shared(),
          children: p.children ?? children(),
          path: p.path ?? '404',
        }}
      />
    );
  }
  if (p.type === 'swap') {
    return (
      <label
        {...{
          ...shared(),
          class: cn('swap', shared().class),
          children: p.children,
        }}
      />
    );
  }
  if (p.type === 'dropdown') {
    return (
      <div class={cn('dropdown', p.dropdownClass)}>
        <button
          tabindex="0"
          {...{
            ...shared(),
            children: children(),
          }}
        />
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-200 rounded-box shadow-sm w-max"
          children={p.children}
        />
      </div>
    );
  }
  return `unsupported button type: ${p.type}`;
};

export const BtnGroup = (p: { items: ComponentProps<typeof Btn>[] }) => {
  return (
    <div class="flex flex-wrap justify-center md:justify-start gap-3">
      <For each={p.items}>{(e) => <Btn {...e} />}</For>
    </div>
  );
};
