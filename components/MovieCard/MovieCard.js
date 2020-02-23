import React from 'react'
import CardContents from '../CardContents/CardContents'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import {
  convert_width as cw,
  convert_height as ch,
  cf,
} from '../../UtilsFunctions/UtilFunctions'
import constants from '../constants'

const MovieCard = ({
  name,
  imageUrl,
  casts,
  genre,
  formattedRuntime,
  vote_average,
  onItemPress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <CardContents
        name={name}
        imageUrl={imageUrl}
        casts={casts}
        genre={genre}
        formattedRuntime={formattedRuntime}
        vote_average={vote_average}
        onItemPress={onItemPress}
      />
    </View>
  )
}

export default MovieCard

const styles = StyleSheet.create({
  cardContainer: {
    height: ch(260),
    width: cw(170),
    left: '7.5%',
    justifyContent: 'space-around',
  },
})
