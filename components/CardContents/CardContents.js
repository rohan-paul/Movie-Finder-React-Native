import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import {
  convert_width as cw,
  convert_height as ch,
  cf,
} from '../../UtilsFunctions/UtilFunctions'
import constants from '../constants'

const CardContents = ({
  name,
  imageUrl,
  casts,
  genre,
  formattedRuntime,
  vote_average,
}) => {
  return (
    <>
      <TouchableOpacity style={styles.itemContainer}>
        <Image style={styles.movieImage} source={{ uri: imageUrl }} />
        <View style={styles.titleContainer}>
          <Text style={styles.movieTitle}>{name}</Text>
          <Text style={styles.formattedRuntime}>{formattedRuntime}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.casts}>
            {casts.toString()}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.movieTitle}>{genre[0]}</Text>
          <Text style={styles.vote_average}>{vote_average}</Text>
        </View>
      </TouchableOpacity>
    </>
  )
}

export default CardContents

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: cw(10),
    height: ch(270),
    width: cw(170),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(38, 50, 70, 0.4)',
  },

  movieImage: {
    width: '100%',
    height: ch(195),
    top: 0,
    marginTop: 0,
    paddingTop: 0,
    borderTopRightRadius: cw(10),
    borderTopLeftRadius: cw(10),
    resizeMode: 'stretch',
  },
  titleContainer: {
    flexDirection: 'row',
  },

  movieTitle: {
    width: cw(130),
    fontSize: cf(14),
    fontWeight: '800',
    lineHeight: ch(18),
    marginTop: ch(5),
    paddingLeft: cw(2),
    justifyContent: 'flex-start',
    fontFamily: 'NunitoSans-Regular',
    color: constants().GLOBAL_BLUE,
  },
  formattedRuntime: {
    fontSize: cf(14),
    fontWeight: '800',
    marginTop: ch(5),
    justifyContent: 'flex-end',
    fontFamily: 'NunitoSans-Regular',
    color: constants().COLORS.WARNING,
  },
  casts: {
    fontSize: cf(10),
    maxWidth: cw(80),
    maxHeight: ch(18),
    fontWeight: '800',
    marginTop: ch(5),
    paddingLeft: cw(2),
    justifyContent: 'flex-start',
    fontFamily: 'NunitoSans-Regular',
    color: constants().BLACK,
  },
  runtime: {
    width: cw(100),
    fontSize: cf(15),
    fontWeight: '800',
    lineHeight: ch(18),
    marginTop: ch(5),
    paddingLeft: cw(2),
    justifyContent: 'flex-start',
    fontFamily: 'NunitoSans-Regular',
    color: constants().BLACK,
  },
  genre: {
    width: cw(130),
    fontSize: cf(14),
    fontWeight: '800',
    lineHeight: ch(18),
    marginTop: ch(5),
    paddingLeft: cw(2),
    justifyContent: 'flex-start',
    fontFamily: 'NunitoSans-Regular',
    color: constants().BLACK,
  },
  vote_average: {
    width: cw(100),
    fontSize: cf(15),
    fontWeight: '800',
    lineHeight: ch(18),
    marginTop: ch(5),
    paddingLeft: cw(2),
    justifyContent: 'flex-start',
    fontFamily: 'NunitoSans-Regular',
    color: constants().BLACK,
  },
})
