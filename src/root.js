import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { AsyncStorage } from 'react-native'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage'
import merger from 'redux-storage-merger-immutablejs'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import appReducer from './reducers'
import App from './containers/app'

const engine = createEngine('mastodon')
const store  = createStore(storage.reducer(appReducer, merger), applyMiddleware(thunk, storage.createMiddleware(engine)))

const load = storage.createLoader(engine);
load(store).then(newState => console.log('Loaded state:', newState));

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
