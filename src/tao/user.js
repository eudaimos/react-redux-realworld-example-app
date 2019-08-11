import TAO, { AppCtx } from '@tao.js/core';
import agent from '../agent';

TAO.addInterceptHandler({ t: 'user', a: 'find', o: 'portal' }, (tao, { portal }) => {
  if (!portal || !portal.token) {
    return new AppCtx('user', 'fail', 'anon', { fail: { auth: true, errors: { token: ['missing token'] } } });
    // return new AppCtx('home', 'view', 'anon');
  }
});

TAO.addInlineHandler({ t: 'user', a: 'find', o: 'portal' }, (tao, data) => {
  return agent.Auth.current()
    .then(({ user }) => {
      return new AppCtx('user', 'enter', 'portal', user, null, { token: user.token });
    })
    .catch(err => {
      const { errors } = err.response ? err.response.body : {};
      return new AppCtx('user', 'fail', 'anon', { fail: { auth: true, errors } });
    });
});

TAO.addInlineHandler({ t: 'user', a: 'find', o: 'anon' }, (tao, data) => {
  const { email, password } = data.user;
  return agent.Auth.login(email, password)
    .then(({ user }) => {
      return new AppCtx('user', 'enter', 'portal', user, null, { token: user.token });
    })
    .catch(err => {
      const { errors } = err.response ? err.response.body : {};
      return new AppCtx('user', 'fail', 'anon', { fail: { auth: true, errors } });
    });
});

function validateLogin(tao, data) {
  const { email, password } = data.user;
  const errors = {};
  if (!isValidInput(email)) {
    errors.email = ['email is required to login'];
  }
  if (!isValidInput(password)) {
    errors.password = ['password is required to login'];
  }
  return new AppCtx('user', 'fail', 'anon', { fail: { auth: true, errors }});
}

TAO.addInterceptHandler({ t: 'user', a: 'find', o: 'anon' }, validateLogin);

TAO.removeInterceptHandler({ t: 'user', a: 'find', o: 'anon' }, validateLogin);

TAO.addInlineHandler({ t: 'user', a: 'enter', o: 'portal' }, (tao, { portal }) => {
  return new AppCtx('home', 'enter', 'portal', { portal })
});

// don't provide a way to add a user when orient: portal
TAO.addInlineHandler({ t: 'user', a: 'add', o: 'anon' }, (tao, data) => {
  const { username, email, password } = data.add;
  return agent.Auth.register(username, email, password)
    .then(({ user }) => {
      // window.localStorage.setItem('jwt', user.token);

      new AppCtx('user', 'enter', 'portal', user, null, { token: user.token });
    })
    .catch(err => {
      const { errors } = err.response ? err.response.body : {};
      return new AppCtx('user', 'fail', 'anon', { username, email, password }, { errors });
    });
});

TAO.addAsyncHandler({ t: 'user', a: 'enter', o: 'portal' }, (tao, { user }) => {
  window.localStorage.setItem('jwt', user.token);
});

// don't provide a way to update a user when orient: anon
TAO.addInlineHandler({ t: 'user', a: 'update', o: 'portal' }, (tao, data) => {
  const { user, portal } = data;
  return agent.Auth.save(user)
    .then(({ user }) => new AppCtx('user', 'stored', 'portal', user, null, portal))
    .catch(err => {
      const { errors } = err.response ? err.response.body : {};
      return new AppCtx('user', 'fail', 'portal', user, { errors }, portal);
    });
});

function isValidInput(value) {
  return value && typeof value === 'string' && value.trim().length;
}

function validateNewUser(tao, data) {
  const { username, email, password } = data.add || {};
  const errors = [];
  if (!isValidInput(username)) {
    errors.push('username must not be empty');
  }
  if (!isValidInput(email)) {
    errors.push('email must not be empty');
  }
  if (!isValidInput(password)) {
    errors.push('password must not be empty');
  }
  if (errors.length) {
    return new AppCtx('user', 'fail', 'anon', data.user, { errors });
  }
}

TAO.addInterceptHandler({ t: 'user', a: 'add', o: 'anon' }, validateNewUser);

TAO.removeInterceptHandler({ t: 'user', a: 'add', o: 'anon' }, validateNewUser);

function validateSaveUser(tao, data) {
  const { username, email, password } = data.update;
  const errors = [];
  if (!isValidInput(username)) {
    errors.push('username must not be empty');
  }
  if (!isValidInput(email)) {
    errors.push('email must not be empty');
  }
  if (!isValidInput(password)) {
    errors.push('new password must not be empty');
  }
}

TAO.addInterceptHandler({ t: 'user', a: 'update', o: 'portal' }, validateSaveUser);

TAO.removeInterceptHandler({ t: 'user', a: 'update', o: 'portal' }, validateSaveUser);

TAO.addAsyncHandler({ t: 'user', a: 'exit' }, (tao, data) => {
  window.localStorage.removeItem('jwt');
});

TAO.addInlineHandler({ t: 'user', a: 'exit', o: 'portal' }, (tao, data) => {
  return new AppCtx('home', 'enter', 'anon');
});
