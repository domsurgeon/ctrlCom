import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker';

import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  //window.devToolsExtension && window.devToolsExtension()
)

const store = createStore(reducers, allStoreEnhancers)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)


serviceWorker.register()
