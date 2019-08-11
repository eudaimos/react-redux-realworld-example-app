import TAO, { AppCtx } from "@tao.js/core";
import agent from '../agent';
import history from '../history';
import { locationToAC } from './nav';

const init = new AppCtx('app', 'init', 'anon', { name: 'Conduit' });
export default init;

TAO.addInterceptHandler({ t: 'app', a: 'init', o: 'anon' }, (tao, data) => {
  // is not authenticated?
  const token = window.localStorage.getItem('jwt');
  if (token) {
    // !-> switch to authenticated portal
    return new AppCtx('app', 'init', 'portal', { portal: { token } });
  }
});

TAO.addInterceptHandler({ o: 'anon' }, () => agent.setToken());
TAO.addInterceptHandler({ o: 'portal' }, (tao, { portal }) => agent.setToken(portal.token));

TAO.addInlineHandler({ t: 'app', a: 'init' }, (tao, data) => {
  return new AppCtx('app', 'load', tao.o, { app: data.app, orient: data[tao.o] });
});

TAO.addAsyncHandler({ t: 'app', a: 'init', o: 'portal' }, (tao, { portal }) => {
  return new AppCtx('user', 'find', 'portal', { portal: portal });
});

// ☯{ 'app', 'init', 'anon' } => (tao, data) => {

// }
TAO.addInlineHandler({ t: 'app', a: 'load' },
  (tao, data) => {
    return locationToAC(history.location, tao.o === 'portal' ? data.portal.token : undefined);
  });

TAO.addAsyncHandler({ t: 'home', a: 'enter', o: 'anon' },
  (tao, data) => new AppCtx('article', 'find', 'anon'));

TAO.addAsyncHandler({ t: 'home', a: 'enter', o: 'portal' },
  (tao, { portal }) => new AppCtx('article', 'find', 'portal', { find: { feed: true }, portal }));

TAO.addAsyncHandler({ t: 'home', a: 'enter' },
  (tao, data) => new AppCtx('tag', 'find', tao.o, { orient: data[tao.o] }));

TAO.addInlineHandler({ t: 'home', a: 'enter' }, () => {
  history.push('/');
});
