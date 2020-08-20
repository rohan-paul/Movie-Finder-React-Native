import React, { useState, Component } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import rootReducers from './reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
// import NavigationService from './actions/NavigationService'

const store = createStore(rootReducers, {}, applyMiddleware(reduxThunk))

import AppNavigator from './navigation/AppNavigator'

export default class App extends Component {
  state = {
    isReady: false,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        {/* Passing the NavigationService so to be able to navigate to different route in actions and reducers (i.e. any .js module outside of React component) */}
        <AppNavigator
        // ref={navigatorRef => {
        //   NavigationService.setTopLevelNavigator(navigatorRef)
        // }}
        />
      </Provider>
    )
  }
}

async function loadResourcesAsync() {
  await Promise.all([Asset.loadAsync([require('./assets/images/back.png')])])
}
