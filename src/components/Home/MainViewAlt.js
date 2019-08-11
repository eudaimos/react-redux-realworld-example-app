// import ArticleList from '../ArticleList';
import ArticleListAlt from '../ArticleListAlt';
import React from 'react';

const YourFeedTab = props => {
  const { onTabClick, isActive } = props;
  const clickHandler = ev => {
    ev.preventDefault();
    onTabClick();
  }

  return (
    <li className="nav-item">
      <a  href=""
          className={`nav-link ${isActive ? 'active' : ''}`}
          onClick={clickHandler}>
        Your Feed
      </a>
    </li>
  );
};

const GlobalFeedTab = props => {
  const { onTabClick, isActive } = props;
  const clickHandler = ev => {
    ev.preventDefault();
    onTabClick();
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className={`nav-link ${isActive ? 'active' : ''}`}
        onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};

const TagFilterTab = ({ tag }) => (
  <li className="nav-item">
    <a href="" className="nav-link active">
      <i className="ion-pound"></i> {tag}
    </a>
  </li>
);

const MainView = props => {
  const { token, tab, tag, onAll, onFeed } = props;
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          {token ?
            <YourFeedTab
              token={token}
              isActive={tab === 'feed'}
              tab={tab}
              onTabClick={onFeed} />
            : null}

          <GlobalFeedTab tab={props.tab} isActive={tab === 'all'} onTabClick={onAll} />

          {tag ? <TagFilterTab tag={props.tag} /> : null}

        </ul>
      </div>

      <ArticleListAlt />
    </div>
  );
};

export default MainView;
