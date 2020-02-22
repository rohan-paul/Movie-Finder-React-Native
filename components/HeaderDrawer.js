import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DrawerTrigger from './DrawerTrigger'
import constants from './constants'

class HeaderDrawer extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <DrawerTrigger />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: constants().SECONDARY,
  },
})

export default HeaderDrawer
