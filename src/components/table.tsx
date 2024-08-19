import { For } from 'solid-js';

export default function <T extends Record<string, unknown>>(p: {
  class?: string;
  items: T[];
}) {
  const keys = () => Object.keys(p.items[0]);
  return (
    <div>
      <table class={'table w-full ' + (p.class ?? '')}>
        <thead>
          <tr>
            {keys().map((k) => (
              <th>{k}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <For each={p.items}>
            {(item) => (
              <tr>
                {keys().map((k) => (
                  //@ts-ignore
                  <td>{item[k]}</td>
                ))}
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
