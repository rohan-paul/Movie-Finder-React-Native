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
  toTitleCase: str => {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  },

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

  validateIndianMobilenumber: inputStr => {
    const re = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/
    return re.test(inputStr)
  },

  // This function removes all numbers after dot (i.e. all decimal numbers) and then adds comma as thousand separator to the number
  formatAmount: amount => {
    const numberWithCommas = x => {
      var parts = x.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
    }

    amount = amount.split('.')[0].replace(/,/g, '')
    let isnum = /^\d+$/.test(amount)

    if (isnum && amount.length > 3) {
      let result = parseInt(amount)
        .toLocaleString('en-IN')
        .toString()
      if (result.indexOf(',') > 0) {
        return result
      } else {
        return numberWithCommas(result)
      }
    } else {
      return amount
    }
  },

  validateEmail: email => {
    const re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
    return re.test(email)
  },

  addCommas: nStr => {
    nStr += ''
    var x = nStr.split('.')
    var x1 = x[0]
    var x2 = x.length > 1 ? '.' + x[1] : ''
    var rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2')
    }
    return x1 + x2
  },
}
