import {
  mdiHeart,
  mdiMenu,
  mdiWeatherNight,
  mdiWhiteBalanceSunny,
} from '@mdi/js';
import { A, Router, RouteSectionProps } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { For, JSX, onMount, Suspense } from 'solid-js';
import './app.css';
import { Link } from './components/article';
import Btn from './components/btn';
import Icon from './components/icon';
import { nav } from './ts/const';
import { useMatchMedia } from './ts/util';

function Menu(p: {
  items?: {
    text: string | JSX.Element;
    path?: string;
    onClick?: (e: MouseEvent) => void;
  }[];
}) {
  return (
    <ul class='dropdown-content menu bg-base-200 rounded-box shadow w-max'>
      <For each={p.items}>
        {(e) => (
          <li>
            <Link path={e.path}>{e.text}</Link>
          </li>
        )}
      </For>
    </ul>
  );
}
function Panel(p: { text: string; desc: string }) {
  return (
    <section>
      <h2 class='font-bold'>{p.text}</h2>
      <p>{p.desc}</p>
    </section>
  );
}
function LeftBtn(p: {
  text: string;
  items: { text: string; desc?: string; path: string }[];
}) {
  return (
    <div class='dropdown'>
      <Btn {...p}></Btn>
      <Menu
        items={p.items.map(({ text, desc, path }) => ({
          text: <Panel {...{ text, desc: desc ?? '' }}></Panel>,
          path,
        }))}
      ></Menu>
    </div>
  );
}
function Topbar() {
  const MiniNav = () => (
    <div class='dropdown md:hidden'>
      <Btn class='btn-square no-space'>
        <Icon>{mdiMenu}</Icon>
      </Btn>
      <ul class='dropdown-content menu bg-base-200 rounded-box shadow w-max'>
        <For each={nav as DeepNonReadonly<typeof nav>}>
          {(e) => (
            <li>
              <strong>{e.text}</strong>
              <ul>
                <For each={e.items}>
                  {(e) => (
                    <li>
                      <Link path={e.path}>{e.text}</Link>
                    </li>
                  )}
                </For>
              </ul>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
  function ThemeBtn() {
    const isDark = useMatchMedia('(prefers-color-scheme: dark)');
    return (
      <Btn class='btn-square no-space'>
        <label class='swap swap-rotate'>
          <input
            type='checkbox'
            class='theme-controller'
            value='sunset'
            checked={isDark()}
          />
          <Icon class='swap-off'>{mdiWhiteBalanceSunny}</Icon>
          <Icon class='swap-on'>{mdiWeatherNight}</Icon>
        </label>
      </Btn>
    );
  }
  return (
    <>
      <div class='navbar-start'>
        <MiniNav />
        <A
          href='/'
          class='btn btn-ghost font-title text-base-content text-lg md:text-2xl'
        >
          蓝骨头
        </A>
        <div class='hidden md:flex'>
          <For each={nav as DeepNonReadonly<typeof nav>}>{LeftBtn}</For>
        </div>
      </div>
      <div class='navbar-end'>
        <Btn path='/donate'>
          <Icon class='fill-red-500'>{mdiHeart}</Icon>捐助
        </Btn>
        <ThemeBtn />
        {/* <div class='dropdown dropdown-end'>
                    <Btn class='btn-square' icon={mdiTranslate}></Btn>
                    <Menu items={[{ text: '简体中文' }]}></Menu>
                </div> */}
        <div class='dropdown dropdown-hover dropdown-end mr-2'>
          <Btn
            class='btn-circle avatar'
            path='/user'
            img='https://picsum.photos/1'
          ></Btn>
          {import.meta.env.DEV && (
            <Menu
              items={[
                { text: '个人资料' },
                { text: '设置' },
                { text: '退出登录' },
              ]}
            ></Menu>
          )}
        </div>
      </div>
    </>
  );
}
function Loading() {
  return <p>Loading...</p>;
}
function App(p: RouteSectionProps) {
  return (
    <div class='flex flex-col h-screen'>
      <nav class='flex-none navbar bg-base-100 shadow-md p-0 md:px-8 z-[1]'>
        <Topbar />
      </nav>
      <main class='flex-1'>
        <Suspense fallback={<Loading />}>{p.children}</Suspense>
      </main>
    </div>
  );
}
export default function () {
  onMount(() => {
    import.meta.env.DEV
      ? console.log('routes', FileRoutes())
      : console.log(
          `%c
           *=+++==#
         %+=+++=+%
        #==++==*
      #+=+++=+%
  %*++==+++=+
 #====+++==+
 %+++*++=+++     %##++%
      +==*#+    %+%++=+ %%
      %+***%    #++=++++===*
               %+==++++====+
              %+=+++===+++#
             #==++==*#
            +=+++=+%
          #+=++==*
         *=+++++%
`,
          'color:#03a9f4;margin-left:10rem;',
          `\n都来这了，不考虑加入我们吗？ ${window.location.origin}/join`,
        );
  });
  return (
    <Router root={App}>
      <FileRoutes />
    </Router>
  );
}
