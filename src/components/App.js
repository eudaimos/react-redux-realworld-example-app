import agent from '../agent';
import Header from './Header';
import HeaderAlt from './HeaderAlt';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Article from '../components/Article';
import Editor from '../components/Editor';
import Home from '../components/Home';
import HomeAlt from '../components/Home/alt';
import Login from '../components/Login';
import LoginAlt from '../components/LoginAlt';
import Profile from '../components/Profile';
import ProfileFavorites from '../components/ProfileFavorites';
import Register from '../components/Register';
import RegisterAlt from '../components/RegisterAlt';
import Settings from '../components/Settings';
import SettingsAlt from '../components/SettingsAlt';

import { store } from '../store';
import { push } from 'react-router-redux';
import { components } from '../features.json';

const HeaderFeature = { Header, HeaderAlt };
const HomeFeature = { Home, HomeAlt };
const LoginFeature = { Login, LoginAlt };
const RegisterFeature = { Register, RegisterAlt };
const SettingsFeature = { Settings, SettingsAlt };

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

const HeaderComponent = props => {
  const Header = HeaderFeature[components.Header];
  return (
    <Header appName={props.appName} currentUser={props.currentUser} />
  );
}

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          {HeaderComponent(this.props)}
          <Switch>
            <Route exact path="/" component={HomeFeature[components.Home]}/>
            <Route path="/login" component={LoginFeature[components.Login]} />
            <Route path="/register" component={RegisterFeature[components.Register]} />
            <Route path="/editor/:slug" component={Editor} />
            <Route path="/editor" component={Editor} />
            <Route path="/article/:id" component={Article} />
            <Route path="/settings" component={SettingsFeature[components.Settings]} />
            <Route path="/@:username/favorites" component={ProfileFavorites} />
            <Route path="/@:username" component={Profile} />
          </Switch>
        </div>
      );
    }
    return (
      <div>
        {HeaderComponent(this.props)}
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
