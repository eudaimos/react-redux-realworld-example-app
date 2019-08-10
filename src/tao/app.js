import TAO, { AppCtx } from "@tao.js/core";
import agent from '../agent';

const init = new AppCtx('app', 'init', 'anon', { name: 'Conduit' });
export default init;

TAO.addInterceptHandler({ t: 'app', a: 'init', o: 'anon' }, (tao, data) => {
  // is not authenticated?
  const token = window.localStorage.getItem('jwt');
  if (token) {
    // !switch to authenticated portal
    return new AppCtx('app', 'init', 'portal', { portal: { token } });
    // agent.setToken(token);
  }

  // this.props.onLoad(token ? agent.Auth.current() : null, token);

});

TAO.addInterceptHandler({ o: 'anon' }, () => agent.setToken());
TAO.addInterceptHandler({ o: 'portal' }, (tao, { portal }) => agent.setToken(portal.token));

TAO.addInlineHandler({ t: 'app', a: 'init', o: 'anon' }, (tao, data) => {
  return new AppCtx('app', 'load', 'anon');
});

TAO.addAsyncHandler({ t: 'app', a: 'load', o: 'anon' }, (tao, data) => {
  return new AppCtx('article', 'find', tao.o, { find: { page: 0 } });
});

TAO.addAsyncHandler({ t: 'app', a: 'load', o: 'portal' }, (tao, { portal }) => {
  return new AppCtx('article', 'find', tao.o, { find: { feed: true }, portal });
});

// TAO.addInlineHandler({ t: 'app', a: 'load' }, (tao, data) => {

// })

TAO.addAsyncHandler({ t: 'app', a: 'init', o: 'portal' }, (tao, { portal }) => {
  // agent.setToken(data.portal.token);
  return agent.Auth.current()
    .then(user => {
      return new AppCtx('user', 'enter', 'portal', user, null, portal);
    })
    .catch(err => {
      return new AppCtx('user', 'fail', 'anon', { fail: { auth: true, error: err } });
    });
});

TAO.addAsyncHandler({ t: 'app', a: 'load' },
  (tao, data) => new AppCtx('tag', 'find', tao.o, { [tao.o]: data[tao.o] }));

// TAO.addInlineHandler({ t: 'user', a: 'enter', o: 'portal' }, (tao, { user, portal }) => new AppCtx())

// ☯{ 'app', 'init', 'anon' } => (tao, data) => {

// }
TAO.addInlineHandler({ t: 'app', a: 'load' },
  (tao, data) => new AppCtx('home', 'view', tao.o, { [tao.o]: data[tao.o] }));
