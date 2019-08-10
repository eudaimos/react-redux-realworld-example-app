import TAO, { AppCtx } from '@tao.js/core';
import agent from '../agent';

TAO.addInlineHandler({ t: 'tag', a: 'find' }, (tao, data) => {
  return agent.Tags.getAll()
    .then(({ tags }) => new AppCtx('tag', 'list', tao.o, tags, undefined, data[tao.o]));
});
