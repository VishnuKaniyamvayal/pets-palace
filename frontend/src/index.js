import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme appearance="light" accentColor="amber">
        <App />
      </Theme>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


