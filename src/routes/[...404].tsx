import { A } from '@solidjs/router';
import { For } from 'solid-js';

function Guide(p: { text: string; path: string; desc: string }) {
  return (
    <li class='my-2'>
      <A class='btn btn-lg px-4 mr-2 h-auto min-h-10' href={p.path}>
        {p.text}
      </A>
      {p.desc}
    </li>
  );
}
export default function NotFound() {
  return (
    <div class='hero h-full'>
      <div class='hero-content flex-col items-start'>
        <div class='max-w-md'>
          <h1 class='text-5xl font-bold'>Σ(っ °Д °;)っ: 404</h1>
          <p class='py-6'>
            这个页面还没写好...
            <br />
            不过，您可以通过{' '}
            <a href='https://qm.qq.com/q/214gmxUVKw' class='link'>
              加入 Bluebones 社区群
            </a>{' '}
            在线督工
          </p>
          <a
            class='btn btn-sm btn-outline'
            onClick={() => window.history.back()}
          >
            上一页
          </a>
        </div>
        <div class='divider divider-neutral'></div>
        <ol>
          <For
            each={[
              {
                text: '了解',
                path: '/about',
                desc: '一个学生主导的非营利性团体',
              },
              {
                text: '产品',
                path: '/product',
                desc: '让您更高效地工作',
              },
              {
                text: '捐助',
                path: '/donate',
                desc: '以推动脑科学科研工作流的改革',
              },
            ]}
          >
            {Guide}
          </For>
        </ol>
      </div>
    </div>
  );
}
