import React from 'react';
import TAO from '@tao.js/core';
import { RenderHandler } from '@tao.js/react';
import Editor from './Editor';

function onSubmit(article, action, token) {
  return changes => {
    TAO.setCtx({ t: 'article', a: action, o: 'portal' }, { article, action: changes, portal: { token } });
  }
};

const EditorWrapper = () => (
  <RenderHandler term="article" action={['new', 'edit', 'fail']} orient="portal" context="currentUser">
    {(tao, data, currentUser) => {
      if (tao.a === 'fail' && (!data.fail.add || !data.fail.update)) {
        return null;
      }
      const isNew = tao.a === 'new';
      const slug = isNew ? 'new' : data.article.slug;
      const submitHandler = onSubmit(data.article, isNew ? 'add' : 'update', data.portal.token);
      return (
        <Editor
          key={slug}
          article={data.article}
          onSubmit={submitHandler}
          isNew={isNew}
          currentUser={currentUser}
          errors={tao.a === 'fail' ? data.fail.errors || data.fail.error : []}
        />
      )
    }}
  </RenderHandler>
);

export default EditorWrapper;
