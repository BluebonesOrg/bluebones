import { createSignal, For } from 'solid-js';
import { Slide } from '~/components/silde';
import { t } from '~/ts/util';

const [contributors, setContributors] = createSignal<
  {
    login: string;
    avatar_url: string;
    html_url: string;
  }[]
>([]);
(async () =>
  import.meta.env.DEV
    ? Array.from({ length: 5 }).map((_, i) => ({
        login: `User ${i}`,
        avatar_url: `https://api.dicebear.com/9.x/lorelei/jpg?seed=${i}`,
        html_url: '#',
      }))
    : await (
        await fetch(
          'https://api.github.com/repos/bluebonesx/psytask/contributors',
        )
      ).json())().then(setContributors);

export default () => (
  <div>
    {/* <Slide title={t('about.title')} text={t('about.text')}></Slide> */}
    <Slide
      title={t('about.contributors.title')}
      text={t('about.contributors.text')}
    >
      <div class="flex flex-wrap gap-8 justify-center md:justify-start pt-8">
        <For each={contributors()}>
          {(item) => (
            <a
              href={item.html_url}
              target="_blank"
              class="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img
                src={item.avatar_url}
                alt={item.login}
                class="w-20 h-20 rounded-full border-2 border-base-content/10"
              />
              <span class="text-sm font-medium">{item.login}</span>
            </a>
          )}
        </For>
      </div>
    </Slide>
  </div>
);
