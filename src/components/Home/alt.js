import React from 'react';
import TAO, { AppCtx } from '@tao.js/core';
import { RenderHandler } from '@tao.js/react';
import Home from './Home';

TAO.addInlineHandler({ t: 'home', a: 'enter' },
  (tao, data) => new AppCtx('home', 'view', tao.o, { orient: data[tao.o] }));

const HomeAlt = props => (
  <RenderHandler term="home" action="view" context={['appData']}>
    {(tao, data, appData) => (
      <Home
        token={tao.o === 'portal' ? data.portal.token : null }
        appName={appData.name}
      />
    )}
  </RenderHandler>
)

export default HomeAlt;
