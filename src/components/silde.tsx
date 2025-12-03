import { ComponentProps, JSX } from 'solid-js';
import { cn } from '~/ts/util';
import { BtnGroup } from './button';

export const Slide = (props: {
  class?: string;
  title: JSX.Element;
  text?: JSX.Element;
  actions?: ComponentProps<typeof BtnGroup>['items'];
  children?: JSX.Element;
}) => (
  <div
    class={cn(
      'flex flex-col items-center lg:items-start',
      'py-12 px-5 sm:px-20 2xl:px-60',
      'whitespace-pre-wrap',
      props.class,
    )}
  >
    <h1 class="text-5xl text-center md:text-left font-bold leading-tight pb-6">
      {props.title}
    </h1>
    <p class="pb-6 text-center md:text-left">{props.text}</p>
    {props.actions && (
      <BtnGroup items={props.actions.map((e) => ({ ...e, type: 'link' }))} />
    )}
    {props.children}
  </div>
);
