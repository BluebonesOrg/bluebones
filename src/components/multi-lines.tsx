import { For } from 'solid-js';

export default function (p: { text?: string; lines?: string[] }) {
  return (
    <For each={p.lines ?? p.text?.split('\n')}>
      {(line, i) => (
        <>
          {!!i() && <br />}
          {line}
        </>
      )}
    </For>
  );
}
