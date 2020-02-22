import React from 'react'
import { colors } from '../config/theme'
import ContainedImage from '../ContainedImage/ContainedImage'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import {
  convert_width as cw,
  convert_height as ch,
  cf,
} from '../../UtilsFunctions/UtilFunctions'
import constants from '../constants'

const MovieCard = ({ name, imageUrl }) => {
  return (
    <View style={styles.cardContainer}>
      <ContainedImage name={name} imageUrl={imageUrl} />
    </View>
  )
}

export default MovieCard

const styles = StyleSheet.create({
  cardContainer: {
    height: ch(260),
    width: cw(85),
    left: '7.5%',
    justifyContent: 'space-around',
  },
})
