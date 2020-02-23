import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native'
import {
  convert_width as cw,
  convert_height as ch,
  cf,
} from '../../UtilsFunctions/UtilFunctions'
import constants from '../constants'
import { SearchBar, Button } from 'react-native-elements'
import {
  handleUserSearchText,
  clearUserSearchText,
} from '../../actions/userGeneralActions'

const TopSearchBar = ({ clearInput }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const updateSearch = search => {
    dispatch(handleUserSearchText(search))
  }

  return (
    <>
      <SearchBar
        placeholder="Search..."
        onChangeText={updateSearch}
        // onClear={clearInput}
        onClear={() => clearInput()}
        value={user.userSearchedMovieText}
        clearIcon={{
          iconStyle: { margin: 10 },
          containerStyle: { margin: -10 },
        }}
        containerStyle={styles.searchbarContainer}
        inputContainerStyle={styles.inputContainer}
      />
    </>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    width: '100%',
  },
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

TopSearchBar.propTypes = {
  user: PropTypes.object,
  handleUserSearchText: PropTypes.func,
  // clearUserSearchText: PropTypes.func,
}

export default TopSearchBar
