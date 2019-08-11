import TAO, { AppCtx } from '@tao.js/core';
import agent from '../agent';

TAO.addInterceptHandler({ t: 'profile' }, (tao, data) => {
  if (!data.profile || !data.profile.username) {
    return new AppCtx('profile', 'fail', tao.o, data.profile, { error: 'no profile username' }, data[tao.o]);
  }
});

TAO.addInlineHandler({ t: 'profile', a: 'find', o: 'portal' }, (tao, { profile: { username }, portal }) => {
  return agent.Profile.get(username)
    .then(({ profile }) => new AppCtx('profile', 'enter', 'portal', { profile, portal }))
    .catch(error => new AppCtx('profile', 'fail', 'portal', { username }, { error }, portal));
});

TAO.addAsyncHandler({ t: 'profile', a: 'enter', o: 'portal' }, (tao, { profile }) => {
  return new AppCtx('article_user', 'find', 'portal', { user: profile.username }, null, data.portal);
});

TAO.addAsyncHandler({ t: 'profile', a: 'enter', o: 'anon' }, (tao, { profile }) => {
  return new AppCtx('article_user', 'find', 'anon', { user: profile.username });
});

// won't send a follow request when o: anon
TAO.addAsyncHandler({ t: 'profile', a: 'follow', o: 'portal' }, (tao, { profile: forProfile, portal }) => {
  return agent.Profile.follow(forProfile.username)
    .then(({ profile }) => new AppCtx('profile', 'stored', 'portal', { profile, portal }))
    .catch(error => new AppCtx('profile', 'fail', 'portal', forProfile, { error, [tao.a]: true }, portal));
});

// won't send a unfollow request when o: anon
TAO.addAsyncHandler({ t: 'profile', a: 'unfollow', o: 'portal' }, (tao, { profile: forProfile, portal }) => {
  return agent.Profile.follow(forProfile.username)
    .then(({ profile }) => new AppCtx('profile', 'stored', 'portal', { profile, portal }))
    .catch(error => new AppCtx('profile', 'fail', 'portal', forProfile, { error, [tao.a]: true }, portal));
});
