import React from 'react';
import TAO from '@tao.js/core';
import { RenderHandler } from '@tao.js/react';
import Settings from './Settings';
import * as nav from '../../tao/nav';

function onSubmit(user, update, token) {
  TAO.setCtx({ t: 'user', a: 'update', o: 'portal' }, { user, update, portal: { token } });
};

const RegisterWrapper = () => (
  <RenderHandler term="user" action={['edit', 'fail']} orient="portal" context="currentUser">
    {(tao, data, currentUser) => {
      if (tao.a === 'fail' && !data.fail.update) {
        return null;
      }
      return (
        <Settings
          onLogout={nav.goSignOut}
          onSubmit={onSubmit}
          action={tao.a}
          currentUser={currentUser}
          errors={tao.a === 'fail' ? data.fail.errors || data.fail.error : []}
        />
      )
    }}
  </RenderHandler>
);

export default RegisterWrapper;
