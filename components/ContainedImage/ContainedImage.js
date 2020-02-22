import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import {
  convert_width as cw,
  convert_height as ch,
  cf,
} from '../../UtilsFunctions/UtilFunctions'
import constants from '../constants'

const ContainedImage = ({ name, imageUrl }) => {
  return (
    <>
      {/* {console.log('Image ', imageUrl)} */}

      <TouchableOpacity style={styles.itemContainer}>
        <Image style={styles.movieImage} source={{ uri: imageUrl }} />
        <Text style={styles.movieTitle}>{name}</Text>
      </TouchableOpacity>
    </>
  )
}

export default ContainedImage

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: cw(10),
    height: ch(260),
    width: cw(180),
    backgroundColor: 'green',
    // marginBottom: ch(5),
    // paddingBottom: ch(10),
    borderWidth: 1,
    borderColor: 'rgba(38, 50, 70, 0.4)',
  },

  movieImage: {
    width: '100%',
    height: ch(65),
    top: 0,
    marginTop: 0,
    paddingTop: 0,
    resizeMode: 'contain',
  },

  movieTitle: {
    width: cw(100),
    fontSize: cf(15),
    fontWeight: '800',
    lineHeight: ch(18),
    marginTop: ch(5),
    paddingLeft: cw(2),
    justifyContent: 'flex-start',
    // alignItems: 'center',
    // textAlign: 'center',
    fontFamily: 'NunitoSans-Regular',
    color: '#26323899',
  },
})
