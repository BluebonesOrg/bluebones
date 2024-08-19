import {
  createHandler,
  DocumentComponentProps,
  StartServer,
} from '@solidjs/start/server';

function Document(props: DocumentComponentProps) {
  return (
    <html lang='zh-CN'>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/icon/favicon.ico' />
        {props.assets}
        <title>Bluebones - 脑科学的下一代工作流</title>
      </head>
      <body>
        <div id='app'>{props.children}</div>
        {props.scripts}
      </body>
    </html>
  );
}
export default createHandler(() => <StartServer document={Document} />);
