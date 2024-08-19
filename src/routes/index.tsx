import { mdiHeart, mdiQqchat } from '@mdi/js';
import { A } from '@solidjs/router';
import { For } from 'solid-js';
import { Block, Actions, T, P } from '~/components/block';
import { nav } from '~/ts/const';

export default function Home() {
  return (
    <>
      <div>
        <Block>
          <T>
            脑科学的 <br />
            <span
              class='bg-clip-text [-webkit-text-fill-color:transparent]'
              style={{
                'background-image':
                  'linear-gradient(160deg,oklch(var(--p)),currentColor,oklch(var(--a)))',
              }}
            >
              下一代 <br />
              科研工作流
            </span>
          </T>
          <P>
            提高科研工作效率：一站式科研工具与平台，集成文献管理、数据收集、数据分析与文字撰写，打造高效、协作、开放的科研产品生态。
            <br />
            已经厌恶了繁琐的科研工作？看看蓝骨头还能做些什么……
          </P>
          <Actions
            items={[
              { children: '相关产品', path: '/product' },
              {
                children: '加入社区群',
                icon: mdiQqchat,
                path: 'https://qm.qq.com/q/214gmxUVKw',
              },
            ]}
          ></Actions>
          <br class='h-8'></br>
        </Block>
        <Block class='bg-primary text-primary-content'>
          <T>从 idea 到 paper 有多长</T>
          <P>
            收集文献、实验设计、数据收集、数据分析、制作图表、文字撰写、内容排版...
            <br />
            我们将用一套工作流解决一切重复劳动，让您专注于创造性事业中。
          </P>
        </Block>
        <Block>
          <T>趋近于 0 的学习成本</T>
          <P>
            为了让各领域的用户都能快速上手蓝骨头产品，我们从设计上就考虑零经验的初学者。
            <br />
            比起那些硬核且专业的软件，我们的优势是简单且高效。
          </P>
        </Block>
        <Block class='bg-secondary text-secondary-content'>
          <T>开放的产品生态</T>
          <P>
            蓝骨头是非营利性组织，我们所作的一切是为了学科发展，而不是利润。
            <br />
            我们将把全部产品开源，让更多人参与到产品的开发中。 我们还将提供 API
            文档，让您可以自由地开发插件。
          </P>
        </Block>
        <Block>
          <T>加入，为了共同理念</T>
          <P>
            蓝骨头团队成员来自不同的领域，我们希望能够找到更多志同道合的伙伴。
            <br />
            作为一个年轻的组织，还需要得到各方的支持，
            <b>你愿意支持我们吗？</b>
          </P>
          <Actions
            items={[
              { text: '关于蓝骨头', path: '/about' },
              {
                text: '向蓝骨头捐助',
                path: '/donate',
                icon: mdiHeart,
              },
            ]}
          ></Actions>
        </Block>
      </div>
      <footer class='flex-1 footer footer bg-neutral text-neutral-content p-10'>
        <aside>
          这里放个svg
          <p>
            ©{new Date().getFullYear()}
            <A href='/about'> Bluebones Team</A>
          </p>
          <a href='http://beian.miit.gov.cn/' target='_blank'>
            赣ICP备2024021771号
          </a>
        </aside>
        <For each={nav}>
          {(e) => (
            <nav>
              <h6 class='footer-title'>{e.text}</h6>
              <For each={e.items}>
                {(e) => (
                  <A class='link link-hover' href={e.path}>
                    {e.text}
                  </A>
                )}
              </For>
            </nav>
          )}
        </For>
      </footer>
    </>
  );
}
