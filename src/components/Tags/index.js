import React from 'react';
import TAO from '@tao.js/core';
import { RenderHandler } from '@tao.js/react';
import Tags from './Tags';

function onClickTag(token) {
  return (tag, page = 0) =>
    TAO.setCtx(
      { t: 'article_tag', a: 'find', o: token ? 'portal' : 'anon' },
      { tag },
      { page },
      { token }
    );
}

const TagsWrapper = props => (
  <RenderHandler term="tag" action="list">
    {(tao, data) => (
      <Tags
        tags={data.tag}
        onClickTag={onClickTag(tao.o === 'portal' ? data.portal.token : null)}
      />
    )}
  </RenderHandler>
);

export default TagsWrapper;
