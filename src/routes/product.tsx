import Redirect from '~/components/redirect';
import { nav } from '~/ts/const';

export default () => (
  <Redirect
    href={nav.find((e) => e.text === '产品')?.items[0].path ?? '/404'}
  ></Redirect>
);
