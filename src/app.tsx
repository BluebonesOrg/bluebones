import { mdiMenu, mdiTranslate } from '@mdi/js';
import {
  HashRouter,
  RouteDefinition,
  RouteSectionProps,
  useLocation,
} from '@solidjs/router';
import { createEffect, createSignal, For, lazy, Suspense } from 'solid-js';
import { Btn, Link } from './components/button';
import { Icon } from './components/icon';
import { Slide } from './components/silde';
import { Links } from './ts/enum';
import { cn, hasOwn, locales, map, setStore, store, t } from './ts/util';

const [repos, setRepos] = createSignal<
  {
    text: string;
    desc: string;
    path: string;
    stars?: number;
  }[]
>([]);
if (import.meta.env.DEV) {
  setRepos(
    Array.from({ length: 3 }).map((_, i) => ({
      text: `Project ${i + 1}`,
      desc: `This is the description of project ${i + 1}`,
      path: `https://example.com/project-${i + 1}`,
      stars: 10,
    })),
  );
} else {
  const api_url = 'https://api.github.com/orgs/bluebonesx/repos';
  fetch(api_url)
    .then((r) => r.json())
    .then((repos) => {
      if (!Array.isArray(repos)) {
        setRepos([
          {
            text: 'GitHub API Error',
            desc: repos.message,
            path: repos.documentation_url,
          },
        ]);
        return;
      }
      setRepos(
        repos
          .filter((e) => !e.archived && e.description)
          .toSorted((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
          .map((e) => ({
            text: e.name,
            desc: e.description,
            path: e.html_url,
            stars: e.stargazers_count,
          })),
      );
    })
    .catch((err) => {
      setRepos([{ text: 'GitHub API Error', desc: '' + err, path: api_url }]);
      throw err;
    });
}

const navs = [
  {
    get text() {
      return t('btn:projects');
    },
    get items() {
      return repos();
    },
  },
  {
    get text() {
      return t('btn:about');
    },
    items: [Links.contribute, Links.donate],
  },
  {
    get text() {
      return t('btn:contact');
    },
    items: [Links.xiaohongshu, Links.GitHub],
  },
] as const;

const MiniNav = () => {
  return (
    <Btn
      type='dropdown'
      dropdownClass='md:hidden'
      class='btn-square'
      icon={mdiMenu}
    >
      <For each={navs}>
        {(e) => (
          <li>
            <strong>{e.text}</strong>
            <ul>
              <For each={e.items}>
                {(e) => (
                  <li>
                    <Link
                      class='no-underline'
                      path={e.path}
                      children={e.text}
                    />
                  </li>
                )}
              </For>
            </ul>
          </li>
        )}
      </For>
    </Btn>
  );
};
const TopNav = () => {
  return (
    <div class='hidden md:flex'>
      <For each={navs}>
        {(e) => (
          <Btn type='dropdown' text={e.text}>
            <For each={e.items}>
              {(e) => (
                <li>
                  <Link class='no-underline justify-between' path={e.path}>
                    <section>
                      <h2 class='font-bold'>{e.text}</h2>
                      <p>{e.desc}</p>
                    </section>
                    {!e.desc && hasOwn(e, 'icon') && (
                      <Icon class='mr-2' children={e.icon} />
                    )}
                  </Link>
                </li>
              )}
            </For>
          </Btn>
        )}
      </For>
    </div>
  );
};
const FooterNav = () => {
  return (
    <For each={navs}>
      {(e) => (
        <nav class=''>
          <h6 class='footer-title'>{e.text}</h6>
          <For each={e.items}>
            {(e) => <Link class='link-hover' path={e.path} children={e.text} />}
          </For>
        </nav>
      )}
    </For>
  );
};

const App = (p: RouteSectionProps) => {
  const location = useLocation();
  createEffect(() => {
    location.pathname;
    window.scroll(0, 0);
  });
  return (
    <div class='flex flex-col h-screen'>
      <nav class={cn('navbar', location.pathname === '/' && 'absolute z-1')}>
        <div class='navbar-start'>
          <MiniNav />
          <Btn
            type='link'
            path='/'
            class='font-title text-lg md:text-2xl'
            text={t('logo:bluebones')}
          />
          <TopNav />
        </div>
        <div class='navbar-end'>
          <Btn
            type='link'
            class='hover:scale-120 border-none bg-transparent transition-all'
            path={Links.donate.path}
          >
            <Icon class='fill-red-500' children={Links.donate.icon} />
            {Links.donate.text}
          </Btn>
          {/* Social links */}
          {navs[2].items.map((e) => (
            <Btn
              type='link'
              path={e.path}
              class='btn-square max-sm:hidden'
              icon={e.icon}
            />
          ))}
          {/* Setting */}
          <Btn
            type='dropdown'
            dropdownClass='dropdown-end'
            class='btn-square'
            icon={mdiTranslate}
          >
            <For each={locales}>
              {(meta) => (
                <li>
                  <a
                    class={meta.locale === store.locale ? 'menu-focus' : ''}
                    on:click={() => setStore('locale', meta.locale)}
                  >
                    {meta.name}
                  </a>
                </li>
              )}
            </For>
          </Btn>
        </div>
      </nav>
      <main class='flex-1'>
        <Suspense
          fallback={<Slide title='Loading...' text=''></Slide>}
          children={p.children}
        />
      </main>
      <footer class='footer footer-horizontal sm:footer-vertical footer-center bg-neutral text-neutral-content p-10'>
        <FooterNav />
        <aside>
          <Icon
            class='invert brightness-0'
            size={48}
            children='/icon/favicon.ico'
          />
          <p>© {new Date().getFullYear()} Bluebones Team</p>
        </aside>
      </footer>
    </div>
  );
};

const routes: RouteDefinition[] = map(
  import.meta.glob('./routes/*.tsx'),
  (mod, k) => ({
    path: k.replace(/^\.\/routes\/(.*)\.tsx$/, (_, name: string) => {
      const matches = name.match(/^\[\.\.\.(.*)\]$/);
      return matches ? '*' + matches[1] : name === 'home' ? '' : name;
    }),
    //@ts-ignore
    component: lazy(mod),
  }),
);
export default () => <HashRouter root={App} children={routes} />;

import.meta.env.DEV
  ? console.log('routes', routes)
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
      'color:#03a9f4;',
      `\nWelcome to contribute`,
    );
