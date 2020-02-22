import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from './responsive'
import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions'

module.exports = {
  convert_width: value => {
    let screenWidth = Dimensions.get('window').width
    let scaledWidth = 411.42857142857144
    if (Platform.OS != 'ios') {
      value = (100 * value) / scaledWidth
    } else {
      value = (100 * value) / screenWidth
    }

    value = value.toString() + '%'
    value = wp(value)

    return value
  },

  convert_height: value => {
    let statusbar_height = getStatusBarHeight()
    let adder = 0
    let screenHeight =
      Platform.OS == 'ios'
        ? Dimensions.get('window').height
        : Dimensions.get('window').height - statusbar_height

    let scaledHeight = 699.7142862592425
    if (Platform.OS != 'ios') {
      if (screenHeight > scaledHeight && statusbar_height <= 24) {
        value = (100 * value) / (screenHeight + statusbar_height)
      } else if (screenHeight > scaledHeight) {
        value = (100 * value) / screenHeight
      } else {
        value = (100 * value) / (scaledHeight + statusbar_height)
      }
    } else {
      value = (100 * value) / screenHeight
    }

    value = value.toString() + '%'
    value = hp(value)
    return value
  },

  cf: value => {
    let statusbar_height = getStatusBarHeight()
    let adder = 0
    let screenHeight =
      Platform.OS == 'ios'
        ? Dimensions.get('window').height
        : Dimensions.get('window').height - statusbar_height

    let scaledHeight = 699.7142862592425
    if (Platform.OS != 'ios') {
      if (screenHeight > scaledHeight && statusbar_height <= 24) {
        value = (100 * value) / (screenHeight + statusbar_height)
      } else if (screenHeight > scaledHeight) {
        value = (100 * value) / screenHeight
      } else {
        value = (100 * value) / (scaledHeight + statusbar_height)
      }
    } else {
      value = (100 * value) / screenHeight
    }
    let multiplier = PixelRatio.get() > 2 ? 2 : PixelRatio.get()
    value = value * (0.4 * multiplier)

    return responsiveFontSize(value)
  },

  minsToHHMM: str => {
    let mins_num = parseFloat(str, 10)
    let hours = Math.floor(mins_num / 60)
    let minutes = Math.floor(mins_num - (hours * 3600) / 60)
    let seconds = Math.floor(mins_num * 60 - hours * 3600 - minutes * 60)

    // Appends 0 when unit is less than 10
    if (hours < 10) {
      hours = '0' + hours
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    return hours + ':' + minutes
  },
}
