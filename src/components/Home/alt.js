import React from 'react';
import { RenderHandler } from '@tao.js/react';
import Home from './Home';

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
