import React from 'react';
import TAO, { AppCtx } from '@tao.js/core';
import { DataHandler, RenderHandler } from '@tao.js/react';
import Home from './Home';

TAO.addInlineHandler({ t: 'home', a: 'enter' },
  (tao, data) => new AppCtx('home', 'view', tao.o, { orient: data[tao.o] }));

function clickAll(token) {
  return () => new AppCtx('article', 'find', token ? 'portal' : 'anon', { portal: { token }});
}

function clickFeed(token) {
  return () => new AppCtx('article', 'find', token ? 'portal' : 'anon', { find: { feed: true }, portal: { token }});
}

const NOOP = () => {};

const HomeAlt = props => (
  <DataHandler
    name="tabs" term={['article', 'article_tag']} action="find"
    default={{ active: 'all' }}
    handler={(tao, data, setCtxData, current) => {
      console.group('DataHandler[`tabs`]:');
      console.info('current:', current);
      let rv;
      if (tao.t === 'article_tag') {
        rv = { active: 'tag', ...data.article_tag };
        console.info('setting for tag:', rv);
        return rv;
      }
      if (data.find && data.find.feed) {
        rv = { active: 'feed' };
        console.info('setting for feed:', rv);
        // setCtxData(rv);
      } else {
        rv = { active: 'all' };
        console.info('setting for all:', rv);
        // setCtxData(rv);
      }
      console.groupEnd();
      return rv;
    }}
  >
    <RenderHandler term="home" action="view" context={['appData', 'tabs']}>
      {(tao, data, appData, tabs) => {
        console.group('RenderHandler[`home`]');
        console.log('tao:', tao);
        console.log('data:', data);
        console.log('appData:', appData);
        console.log('tabs:', tabs);
        const token = tao.o === 'portal' ? data.portal.token : null;
        console.log('token:', token);
        console.groupEnd();
        return (
          <Home
            token={token}
            appName={appData.name}
            tab={tabs.active}
            tag={tabs.tag}
            onAll={clickAll(token)}
            onFeed={token ? clickFeed(token) : NOOP}
          />
        );
      }}
    </RenderHandler>
  </DataHandler>
)

export default HomeAlt;
