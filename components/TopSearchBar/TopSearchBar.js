import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import {
  convert_width as cw,
  convert_height as ch,
  cf,
} from '../../UtilsFunctions/UtilFunctions'
import constants from '../constants'
import { SearchBar } from 'react-native-elements'

const TopSearchBar = () => {
  // state = {
  //   search: '',
  // };
  const [search, setsearch] = useState('')

  const updateSearch = search => {
    setsearch({ search })
  }
  return (
    <SearchBar
      placeholder="Type Here..."
      onChangeText={updateSearch}
      value={search}
    />
  )
}

export default TopSearchBar

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: cw(10),
    height: ch(270),
    width: cw(170),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(38, 50, 70, 0.4)',
  },
})
