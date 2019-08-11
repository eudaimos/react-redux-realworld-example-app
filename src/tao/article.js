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

function findAndEnterArticle(slug, o, orientation, find) {
  return agent.Articles.get(slug)
    .then(({ article }) => new AppCtx('article', 'enter', o, article, find, orientation ));
}

TAO.addInlineHandler({ t: 'article', a: 'find' }, (tao, data) => {
// TAO.addInlineHandler({ t: 'article', a: 'find', o: 'portal' }, (tao, data) => {
  const { article = {}, find = {}, [tao.o]: orientation } = data;
  if (article.slug) {
    return findAndEnterArticle(article.slug, tao.o, orientation, find);
    // return agent.Articles.get(article.slug)
    //   .then(article => new AppCtx('article', 'enter', tao.o, article, null, orientation ));
  }
  const thenDo = articleFetchPromiseHandler(find, tao.o, orientation);
  return (find.feed ? agent.Articles.feed(find.page) : agent.Articles.all(find.page))
    .then(thenDo);
});

//! Added to intercept on app load must get the article from the slug obtained from URL
//! in order to edit it
// ONLY change was to pass the forEdit through the find -> enter via findAndEnterArticle
TAO.addInterceptHandler({ t: 'article', a: 'edit', o: 'portal' }, (tao, data) => {
  const { article, portal } = data;
  if (!article.title) {
    return new AppCtx('article', 'find', 'portal', article, { forEdit: true }, portal);
  }
});

//! Added to intercept on app load must get the article from the slug obtained from URL
//! in order to edit it
// ONLY change was to pass the forEdit through the find -> enter via findAndEnterArticle
TAO.addInterceptHandler({ t: 'article', a: 'enter', o: 'portal' }, (tao, data) => {
  const { article, enter, portal } = data;
  if (enter && enter.forEdit) {
    return new AppCtx('article', 'edit', 'portal', article, null, portal);
  }
});

TAO.addInlineHandler({ t: 'article', a: 'add', o: 'portal' }, (tao, data) => {
  const { add, portal } = data;
  return agent.Articles.create(add)
    .then(({ article }) => new AppCtx('article', 'enter', 'portal', article, null, portal))
    .catch(err => {
      const { errors } = err.response ? err.response.body : {};
      return new AppCtx('article', 'fail', 'portal', { fail: { errors, add }, portal });
    });
});

TAO.addInlineHandler({ t: 'article', a: 'update', o: 'portal' }, (tao, data) => {
  const { article, update, portal } = data;
  // for the way agent.Articles.update is implemented
  update.slug = article.slug;
  return agent.Articles.update(update)
    .then(({ article }) => new AppCtx('article', 'enter', 'portal', article, null, portal))
    .catch(err => {
      const { errors } = err.response ? err.response.body : {};
      return new AppCtx('article', 'fail', 'portal', article, { errors, update }, portal);
    });
});


