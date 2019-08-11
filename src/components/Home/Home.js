import React from 'react';
import Banner from './Banner';
import MainViewAlt from './MainViewAlt';
import Tags from '../Tags';

const Home = props => {
  const { token, appName, tab, tag, onAll, onFeed } = props;
  return (
    <div className="home-page">

      <Banner token={token} appName={appName} />

      <div className="container page">
        <div className="row">
          <MainViewAlt token={token} tab={tab} tag={tag} onAll={onAll} onFeed={onFeed} />

          <div className="col-md-3">
            <div className="sidebar">

              <p>Popular Tags</p>

              <Tags />

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
