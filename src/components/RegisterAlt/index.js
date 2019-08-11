import React from 'react';
import TAO from '@tao.js/core';
import { RenderHandler } from '@tao.js/react';
import Register from './Register';
import * as nav from '../../tao/nav';

function onSubmit(user) {
  TAO.setCtx({ t: 'user', a: 'add', o: 'anon' }, { add: user });
};

const RegisterWrapper = () => (
  <RenderHandler term="user" action={['new', 'fail']} orient="anon">
    {(tao, data) => {
      if (tao.a === 'fail' && !data.fail.add) {
        return null;
      }
      return (
        <Register
          onLogin={nav.goSignIn}
          onSubmit={onSubmit}
          action={tao.a}
          errors={tao.a === 'fail' ? data.fail.errors || data.fail.error : []}
        />
      )
    }}
  </RenderHandler>
);

export default RegisterWrapper;
