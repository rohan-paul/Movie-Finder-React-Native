import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
// withNavigation allows components to dispatch navigation actions
import { withNavigation } from 'react-navigation'
import { DrawerActions } from 'react-navigation-drawer'
import constants from '../components/constants'

class DrawerTrigger extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => {
          this.props.navigation.dispatch(DrawerActions.toggleDrawer())
        }}
      >
        <Icon name={'bars'} color={constants().GLOBAL_BLUE} size={20} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  trigger: {
    marginLeft: 27.5,
    borderRadius: 30,
    width: 60,
    height: 15,
  },
})

export default withNavigation(DrawerTrigger)
