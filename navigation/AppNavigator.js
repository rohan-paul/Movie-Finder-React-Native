import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { Transition } from 'react-native-reanimated'
import MovieListScreen from '../screens/app/MovieListScreen/MovieListScreen'
import DrawerNavigator from './DrawerNavigator'

const AppNavigator = createAnimatedSwitchNavigator(
  {
    Main: DrawerNavigator,
    MovieListScreen: MovieListScreen,
  },
  {
    initialRouteName: 'MovieListScreen',
    backBehavior: 'history',
    transition: (
      <Transition.Together>
        <Transition.Out type="fade" durationMs={200} interpolation="easeIn" />
        <Transition.In type="fade" durationMs={200} />
      </Transition.Together>
    ),
  },
)

export default createAppContainer(AppNavigator)
