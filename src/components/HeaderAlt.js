import React from 'react';
import { Link } from 'react-router-dom';
import { RenderHandler } from '@tao.js/react';
import * as nav from '../tao/nav';

const LoggedOutView = () => (
  <ul className="nav navbar-nav pull-xs-right">

    <li className="nav-item">
      <Link to="/" onClick={nav.goHomeTo()} className="nav-link">
        Home
      </Link>
    </li>

    <li className="nav-item">
      <Link to="/login" onClick={nav.goSignIn} className="nav-link">
        Sign in
      </Link>
    </li>

    <li className="nav-item">
      <Link to="/register" onClick={nav.goRegister} className="nav-link">
        Sign up
      </Link>
    </li>

  </ul>
);

const LoggedInView = ({ user, portal }) => {
  if (!user || !portal) {
    return null;
  }
  return (
    <ul className="nav navbar-nav pull-xs-right">

      <li className="nav-item">
        <Link to="/" onClick={nav.goHomeTo(portal)} className="nav-link">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/editor" onClick={nav.goNewArticleTo(portal)} className="nav-link">
          <i className="ion-compose"></i>&nbsp;New Post
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/settings" onClick={nav.goSettingsTo(portal)} className="nav-link">
          <i className="ion-gear-a"></i>&nbsp;Settings
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to={`/@${user.username}`} onClick={nav.goProfileTo(user, portal)}
          className="nav-link">
          <img src={user.image} className="user-pic" alt={user.username} />
          {user.username}
        </Link>
      </li>

    </ul>
  );
};

class HeaderAlt extends React.Component {
  render() {
    const { user, portal, appName } = this.props;
    return (
      <nav className="navbar navbar-light">
        <div className="container">

          <Link to="" onClick={nav.goHomeTo(portal)} className="navbar-brand">
            {appName.toLowerCase()}
          </Link>

          {portal ? null : <LoggedOutView />}

          <LoggedInView user={user} portal={portal} />
        </div>
      </nav>
    );
  }
}

const HeaderWrapper = props => (
  <RenderHandler term="user" action={['enter', 'exit']} context="appData" shouldRender={true}>
    {(tao, data = {}, appData) => (
      <HeaderAlt appName={appData.name} user={data.user} portal={data.portal} />
    )}
  </RenderHandler>
)

export default HeaderWrapper;
