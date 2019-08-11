import TAO, { AppCtx } from '@tao.js/core';

export function goHomeTo(portal) {
  return () => {
    TAO.setCtx({ t: 'home', a: 'enter', o: portal ? 'portal' : 'anon' }, { portal });
  };
}

export function goSignIn() {
  TAO.setCtx({ t: 'user', a: 'enter', o: 'anon' });
}

export function goRegister() {
  TAO.setCtx({ t: 'user', a: 'new', o: 'anon' });
}

export function goNewArticleTo(portal) {
  return () => {
    TAO.setCtx({ t: 'article', a: 'new', o: 'portal' }, { portal })
  };
}

export function goSettingsTo(portal) {
  return () => {
    TAO.setCtx({ t: 'user', a: 'edit', o: 'portal' }, { portal })
  };
}

export function goProfileTo(user, portal) {
  const nextAc = new AppCtx('profile', 'find', 'portal', user, null, portal);
  return () => {
    TAO.setAppCtx(nextAc)
  };
}

function locationToACFromRegExp(location, o, portal) {
  let match = location.pathname.match(/\/article\/(.*)/i);
  if (match) {
    return new AppCtx('article', 'find', o, { slug: match[1] }, null, portal);
  }
  match = location.pathname.match(/\/@([^/]+)(\/favorites)?/i);
  if (match) {
    return new AppCtx('profile', 'find', o, { username: match[1] }, { favorites: match[2] }, portal);
  }
  match = location.pathname.match(/\/editor\/(.*)/i);
  if (match) {
    return new AppCtx('article', 'edit', 'portal', { slug: match[1] }, null, portal);
  }
  // 404 :)
  return new AppCtx('home', 'enter', o, { portal });
}

export function locationToAC(location, token) {
  const o = token ? 'portal' : 'anon';
  const portal = token ? { token } : undefined;
  switch (location.pathname) {
    case '/':
      return new AppCtx('home', 'enter', o, { portal });
    case '/login':
      return new AppCtx('user', 'enter', 'anon');
    case '/register':
      return new AppCtx('user', 'new', 'anon');
    case '/editor':
      return new AppCtx('article', 'new', 'portal', { portal });
    case '/settings':
      return new AppCtx('user', 'edit', 'portal', { portal });
    default:
      return locationToACFromRegExp(location, o, portal);
  }
}
