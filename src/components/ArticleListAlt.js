import React from 'react';
import { RenderHandler } from '@tao.js/react';
import ArticleList from './ArticleList';

const ArticleListWrapper = props => (
  <RenderHandler
    term="article"
    action="list"
  >
    {(tao, data) => (
      <ArticleList
        articles={data.article}
        articlesCount={data.list.count}
        pager={() => {}}
        currentPage={data.list.page}
      />
    )}
  </RenderHandler>
);

export default ArticleListWrapper;
