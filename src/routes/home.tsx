import { ComponentProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Link } from '~/components/button';
import { Icon } from '~/components/icon';
import { Slide } from '~/components/silde';
import { Links } from '~/ts/enum';
import { cn, t, useEventListener } from '~/ts/util';

const HomeSlide = (props: ComponentProps<typeof Slide>) => (
  <Slide
    {...props}
    class={cn('hero-content max-w-none h-screen', props.class)}
  />
);
export default () => {
  const defaultOffset = { x: 0, y: 0 };
  const [offset, setOffset] = createStore(defaultOffset);
  useEventListener(window, 'pointermove', (e) => {
    setOffset('x', Math.floor(e.clientX / 50));
    setOffset('y', Math.floor(e.clientY / 50));
  });
  useEventListener(window, 'resize', (e) => {
    setOffset(defaultOffset);
  });
  return (
    <div>
      <div
        class="hero bg-[url('/icon/favicon.ico')] bg-no-repeat bg-contain"
        style={{
          'background-position-x': `calc(100% + ${offset.x}px)`,
          'background-position-y': `calc(50% + ${offset.y}px)`,
        }}
      >
        <div class='hero-overlay bg-transparent backdrop-blur-3xl'></div>
        <HomeSlide
          class='w-full'
          title={
            <>
              {t('index.block-1.title-1')}
              <span class='bg-clip-text text-transparent bg-linear-to-br from-primary to-secondary text-5xl font-extrabold'>
                {t('index.block-1.title-2')}
              </span>
            </>
          }
          text={
            <>
              {t('index.block-1.text-1')}
              <b> {t('index.block-1.text-2')} </b>
              {t('index.block-1.text-3')}
            </>
          }
        ></HomeSlide>
      </div>
      <HomeSlide
        class='bg-primary text-primary-content'
        title={t('index.block-2.title')}
        text={t('index.block-2.text')}
      ></HomeSlide>
      <HomeSlide
        title={t('index.block-3.title')}
        text={t('index.block-3.text')}
      ></HomeSlide>
      <HomeSlide
        class='bg-secondary text-secondary-content'
        title={t('index.block-4.title')}
        text={<>{t('index.block-4.text')}</>}
      ></HomeSlide>
      <HomeSlide
        title={t('index.block-5.title')}
        text={
          <>
            {t('index.block-5.text-1')}
            <b>{t('index.block-5.text-2')}</b>
          </>
        }
        actions={[
          {
            ...Links.contribute,
            class: 'btn-outline',
          },
          {
            path: Links.donate.path,
            children: (
              <>
                <Icon class='fill-red-500' children={Links.donate.icon} />
                {Links.donate.text}
              </>
            ),
          },
        ]}
      ></HomeSlide>
    </div>
  );
};
