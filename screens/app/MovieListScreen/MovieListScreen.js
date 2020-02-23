import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Dimensions,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native'
import MovieCard from '../../../components/MovieCard/MovieCard'
import { colors } from '../../../components/config/theme'
import axiosService from '../../../apiConfig/axiosService'
const { width, height } = Dimensions.get('window')
const API_REF = require('../../../apiConfig/apiConfig')
import {
  loadAllUpcomingMovies,
  loadMoviesFromUserSearchText,
  clearUserSearchText,
  loadMoreMoviesFromUserSameSearchText,
} from '../../../actions/userGeneralActions'
import TopSearchBar from '../../../components/TopSearchBar/TopSearchBar'
import StandardLoader from '../../../components/StandardLoader'

export class MovieListScreen extends Component {
  state = {
    data: [],
    page: 1,
    loading: true,
    loadingMore: false,
    filtering: false,
    refreshing: false,
    error: null,
  }

  // DONT FORGET TO CHANGE BELOW TWO COMMENTED-OUT functions BEFORE SUBMISSION

  componentDidMount() {
    const page = this.state.page
    this.props.loadAllUpcomingMovies(page)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.user.userSearchedMovieText !==
        this.props.user.userSearchedMovieText ||
      prevProps.user.userSearchedMovieText.length !==
        this.props.user.userSearchedMovieText.length
    ) {
      // console.log('COMP DID UPDATE GOT EXECUTED')
      const page = this.state.page
      let searchTerm = this.props.user.userSearchedMovieText
      this.props.loadMoviesFromUserSearchText(searchTerm, page)
    }
  }

  clearInput = () => {
    this.props.clearUserSearchText()
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        const page = this.state.page
        this.props.loadAllUpcomingMovies(page)
      },
    )
  }

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        const page = this.state.page
        if (this.props.user.userSearchedMovieText.length === 0) {
          this.props.loadAllUpcomingMovies(page)
        } else {
          let searchTerm = this.props.user.userSearchedMovieText
          this.props.loadMoviesFromUserSearchText(searchTerm, page)
        }
      },
    )
  }

  handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
        loadingMore: true,
      }),
      () => {
        const page = this.state.page
        if (this.props.user.userSearchedMovieText.length === 0) {
          this.props.loadAllUpcomingMovies(page)
        } else {
          let searchTerm = this.props.user.userSearchedMovieText
          this.props.loadMoreMoviesFromUserSameSearchText(searchTerm, page)
        }
      },
    )
  }

  renderFooter = () => {
    if (!this.props.user.loadingMore) return null

    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  // onItemPress = () =>
  //   this.props.navigation.navigate('ShowSingleMovie', { item: item })

  render() {
    return !this.props.user.loading ? (
      <React.Fragment>
        {/* {console.log(
          'SEARCH FULL RESULT ',
          JSON.stringify(this.props.user.moviesFromUserSearchText),
        )} */}
        <TopSearchBar clearInput={this.clearInput}></TopSearchBar>
        <FlatList
          contentContainerStyle={{}}
          numColumns={2}
          data={
            this.props.user.moviesFromUserSearchText.length === 0
              ? this.props.user.allUpcomingMovies
              : this.props.user.moviesFromUserSearchText
          }
          renderItem={({ item }) => (
            <View
              style={{
                marginTop: 25,
                width: '50%',
              }}
            >
              <MovieCard
                item={item}
                name={item.title}
                imageUrl={item.poster_path}
                casts={item.castsArr}
                genre={item.genreArr}
                formattedRuntime={item.formattedRuntime}
                vote_average={item.vote_average}
                onItemPress={() =>
                  this.props.navigation.navigate('ShowSingleMovie', {
                    title: item.title,
                    poster_path: item.poster_path,
                    overview: item.overview,
                    castsArr: item.castsArr,
                    genreArr: item.genreArr,
                    formattedRuntime: item.formattedRuntime,
                    vote_average: item.vote_average,
                    release_date: item.release_date,
                  })
                }
              />
            </View>
          )}
          keyExtractor={item => item.imdb_id}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.props.user.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
        />
      </React.Fragment>
    ) : (
      <StandardLoader></StandardLoader>
    )
  }
}

MovieListScreen.propTypes = {
  user: PropTypes.object,
  loadAllUpcomingMovies: PropTypes.func,
  loadMoviesFromUserSearchText: PropTypes.func,
  clearUserSearchText: PropTypes.func,
  loadMoreMoviesFromUserSameSearchText: PropTypes.func,
}
const mapStateToProps = state => {
  return { user: state.user }
}

const mapDispatchToProps = {
  loadAllUpcomingMovies,
  loadMoviesFromUserSearchText,
  clearUserSearchText,
  loadMoreMoviesFromUserSameSearchText,
}

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'relative',
    width: width,
    height: height,
    paddingVertical: 20,
    borderTopWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderColor: colors.veryLightPink,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieListScreen)
