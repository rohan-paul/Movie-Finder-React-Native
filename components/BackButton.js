import React from 'react'
import { TouchableOpacity, Text, Image } from 'react-native'
import constants from './constants'
import PropTypes from 'prop-types'

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={require('../assets/images/back.png')} />
    </TouchableOpacity>
  )
}

BackButton.propTypes = {
  user: PropTypes.object,
}

export default BackButton
