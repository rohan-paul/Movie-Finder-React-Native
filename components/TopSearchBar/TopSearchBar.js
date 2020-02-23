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
  const [search, setsearch] = useState('')

  const updateSearch = search => {
    setsearch({ search })
  }
  return (
    <SearchBar
      placeholder="Search..."
      onChangeText={updateSearch}
      value={search}
      containerStyle={styles.searchbarContainer}
      inputContainerStyle={styles.inputContainer}
    />
  )
}

export default TopSearchBar

const styles = StyleSheet.create({
  searchbarContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
  },
  inputContainer: {
    backgroundColor: constants().COLORS.MUTED,
    borderWidth: 1,
    borderRadius: 10,
  },
})
