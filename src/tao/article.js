import TAO, { AppCtx } from '@tao.js/core';
import agent from '../agent';

const articleFetchPromiseHandler = (find, o, oriented) => results => {
  return new AppCtx('article', 'list', o, results.articles, { ...find, count: results.articlesCount }, oriented);
}

TAO.addInlineHandler({ t: 'article_user', a: 'find' }, (tao, data) => {
  const { article_user, find = {}, [tao.o]: orientation } = data;
  const thenDo = articleFetchPromiseHandler(find, tao.o, orientation);
  return agent.Articles.byAuthor(article_user.user, find.page)
    .then(thenDo);
});

TAO.addInlineHandler({ t: 'article_tag', a: 'find' }, (tao, data) => {
  const { article_tag = {}, find = {}, [tao.o]: orientation } = data;
  const thenDo = articleFetchPromiseHandler(find, tao.o, orientation);
  return agent.Articles.byTag(article_tag.tag, find.page)
    .then(thenDo);
});

TAO.addInlineHandler({ t: 'article_favorite', a: 'find' }, (tao, data) => {
  const { article_favorite, find = {}, [tao.o]: orientation } = data;
  const thenDo = articleFetchPromiseHandler(find, tao.o, orientation);
  return agent.Articles.favoritedBy(article_favorite.user, find.page)
    .then(thenDo);
});

function findAndEnterArticle(slug, o, orientation) {
  return agent.Articles.get(slug)
    .then(article => new AppCtx('article', 'enter', o, article, null, orientation ));
}

TAO.addInlineHandler({ t: 'article', a: 'find' }, (tao, data) => {
// TAO.addInlineHandler({ t: 'article', a: 'find', o: 'portal' }, (tao, data) => {
  const { article = {}, find = {}, [tao.o]: orientation } = data;
  if (article.slug) {
    return findAndEnterArticle(article.slug, tao.o, orientation);
    // return agent.Articles.get(article.slug)
    //   .then(article => new AppCtx('article', 'enter', tao.o, article, null, orientation ));
  }
  const thenDo = articleFetchPromiseHandler(find, tao.o, orientation);
  return (find.feed ? agent.Articles.feed(find.page) : agent.Articles.all(find.page))
    .then(thenDo);
});
