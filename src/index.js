import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history} from './store';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import TAO from '@tao.js/core';
import { Provider as TaoProvider, DataHandler } from '@tao.js/react';

import App from './components/App';

import initAC from './tao';

ReactDOM.render((
  <TaoProvider TAO={TAO}>
    <DataHandler
      name="appData"
      term="app" action="init"
      handler={(tao, data, set, current) => ({ ...current, ...data })}
      default={{ name: '' }}
    >
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </DataHandler>
  </TaoProvider>

), document.getElementById('root'));

TAO.setAppCtx(initAC);
