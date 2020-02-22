import React from 'react'
import { useDispatch } from 'react-redux'
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Alert,
  AsyncStorage,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native'
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer'

import MovieListScreen from '../screens/app/MovieListScreen/MovieListScreen'
import constants from '../components/constants'

const DrawerNavigator = createDrawerNavigator(
  {
    PaymentDashboard: {
      screen: MovieListScreen,
      navigationOptions: {
        drawerIcon: () => (
          <Image
            source={require('../assets/images/dollar-blue.jpeg')}
            style={{ height: 25, width: 25 }}
            resizeMode={'contain'}
          />
        ),
      },
    },
  },
  {
    contentComponent: props => {
      const dispatch = useDispatch()
      return (
        <View style={{ flex: 1 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerNavigatorItems
              activeBackgroundColor={'black'}
              activeTintColor={'white'}
              iconContainerStyle={styles.icons}
              {...props}
            />
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Log out',
                  'Do you really want to logout?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {
                        return null
                      },
                    },
                    {
                      text: 'Confirm',
                      onPress: () => {
                        AsyncStorage.clear()
                        // dispatch(resetFullState())
                        props.navigation.navigate('LoginFormScreen')
                      },
                    },
                  ],
                  { cancelable: false },
                )
              }
            >
              <Text
                style={{
                  margin: 16,
                  fontWeight: 'bold',
                  color: constants().GLOBAL_BLUE,
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      )
    },
  },
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icons: {
    width: 30,
  },
})

export default DrawerNavigator
