import React from 'react';
import TAO, { AppCtx } from '@tao.js/core';
import { RenderHandler } from '@tao.js/react';
import Login from './Login';
import * as nav from '../../tao/nav';

TAO.addInlineHandler({ t: 'user', a: 'enter', o: 'anon' }, () => new AppCtx('user', 'view', 'anon'));

function onSubmit(user) {
  TAO.setCtx({ t: 'user', a: 'find', o: 'anon' }, { user });
};

const LoginWrapper = () => (
  <RenderHandler term="user" action={['view', 'fail']} orient="anon">
    {(tao, data) => (
      <Login
        onRegister={nav.goRegister}
        onSubmit={onSubmit}
        errors={tao.a === 'fail' ? data.fail.errors || data.fail.error : []}
      />
    )}
  </RenderHandler>
);

export default LoginWrapper;
