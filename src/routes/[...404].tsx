import { For } from 'solid-js';
import { Btn, BtnGroup } from '~/components/button';
import { Links } from '~/ts/enum';
import { t } from '~/ts/util';

export default () => {
  return (
    <div class="flex flex-col items-center justify-center h-full">
      <div>
        <h1 class="text-5xl font-bold">Σ(っ °Д °;)っ: 404</h1>
        <p class="py-6">{t('404.text')}</p>
        <BtnGroup
          items={[
            {
              text: t('btn:previous'),
              onClick: () => window.history.back(),
            },
            {
              type: 'link',
              text: t('btn:home'),
              class: 'btn-outline',
              path: '/',
            },
          ]}
        />
      </div>
      <div class="my-8"></div>
      <ol>
        <For
          each={[
            {
              text: t('btn:projects'),
              path: Links.GitHub.path,
              children: t('404.link:projects.text'),
            },
            {
              text: t('btn:about'),
              path: Links.contribute.path,
              children: t('404.link:about.text'),
            },
            {
              text: t('btn:donate'),
              path: Links.donate.path,
              children: t('404.link:donate.text'),
            },
          ]}
        >
          {(e) => (
            <li>
              <Btn type="link" class="btn-lg h-8" text={e.text} path={e.path} />
              <span>{e.children}</span>
            </li>
          )}
        </For>
      </ol>
    </div>
  );
};
