import { mdiHeart, mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';
import { A, RouteSectionProps, Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { For, JSX, Suspense } from 'solid-js';
import './app.css';
import Btn from './components/Btn';
import Icon from './components/Icon';
import { nav } from './ts/const';

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
                        <a href={e.path}>{e.text}</a>
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
    path: string;
    items: { text: string; desc?: string; path: string }[];
}) {
    return (
        <div class='dropdown dropdown-hover'>
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
    return (
        <>
            <div class='flex-1'>
                <A
                    href='/'
                    class='btn btn-ghost font-title text-base-content text-lg md:text-2xl'
                >
                    蓝骨头
                </A>
                <For each={nav as DeepNonReadonly<typeof nav>}>{LeftBtn}</For>
            </div>
            <div class='flex-none'>
                <Btn path='/donate'>
                    <Icon class='fill-red-500'>{mdiHeart}</Icon>捐助
                </Btn>
                <Btn class='btn-square ml-0'>
                    <label class='swap swap-rotate'>
                        <input
                            type='checkbox'
                            class='theme-controller'
                            value='black'
                        />
                        <Icon class='swap-off'>{mdiWhiteBalanceSunny}</Icon>
                        <Icon class='swap-on'>{mdiWeatherNight}</Icon>
                    </label>
                </Btn>
                {/* <div class='dropdown dropdown-hover dropdown-end'>
                    <Btn class='btn-square' icon={mdiTranslate}></Btn>
                    <Menu items={[{ text: '简体中文' }]}></Menu>
                </div> */}
                <div class='dropdown dropdown-hover dropdown-end'>
                    <Btn
                        path='/user'
                        img='https://picsum.photos/1'
                        class='btn-circle avatar'
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
              `\n都来这了，不考虑加入我们吗？ ${
                  new URL(import.meta.url).origin
              }/join`,
          );
    return (
        <Router root={App}>
            <FileRoutes />
        </Router>
    );
}
