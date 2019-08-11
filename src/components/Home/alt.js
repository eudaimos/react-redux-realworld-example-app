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
    handler={(tao, data, setCtxData) => {
      if (tao.t === 'article_tag') {
        return { active: 'tag', ...data.article_tag };
      }
      if (data.find && data.find.feed) {
        setCtxData({ active: 'feed' });
      } else {
        setCtxData({ active: 'all' });
      }
    }}
  >
    <RenderHandler term="home" action="view" context={['appData', 'tabs']}>
      {(tao, data, appData, tabs) => {
        const token = tao.o === 'portal' ? data.portal.token : null;
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
