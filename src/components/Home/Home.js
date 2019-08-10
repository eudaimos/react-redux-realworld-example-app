import React from 'react';
import Banner from './Banner';
// import MainView from './MainView';
import MainViewAlt from './MainViewAlt';
import Tags from '../Tags';

const Home = ({ token, appName }) => {
  return (
    <div className="home-page">

      <Banner token={token} appName={appName} />

      <div className="container page">
        <div className="row">
          <MainViewAlt token={token} />

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
