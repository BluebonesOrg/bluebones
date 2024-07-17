import { Navigate } from '@solidjs/router';
import { nav } from '~/ts/const';

export default () => (
    <Navigate
        href={nav.find((e) => e.text === '产品')?.items[0].path ?? '/404'}
    ></Navigate>
);
