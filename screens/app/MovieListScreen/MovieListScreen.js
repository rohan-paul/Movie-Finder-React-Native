import React, { Component } from "react"
import { StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  Dimensions,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native"
import MovieCard from "../../../components/MovieCard/MovieCard"
import axiosService from "../../../apiConfig/axiosService"
const { width, height } = Dimensions.get("window")
const API_REF = require("../../../apiConfig/apiConfig")
import {
  loadAllUpcomingMovies,
  loadMoviesFromUserSearchText,
  clearUserSearchText,
  loadMoreMoviesFromUserSameSearchText,
  clearError,
} from "../../../actions/userGeneralActions"
import TopSearchBar from "../../../components/TopSearchBar/TopSearchBar"
import StandardLoader from "../../../components/StandardLoader"
import SnackBar from "react-native-snackbar-component"
import constants from "../../../components/constants"

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

  componentDidMount() {
    const page = this.state.page
    if (this.props.user.userSearchedMovieText.length === 0) {
      this.props.loadAllUpcomingMovies(page)
    } else {
      let searchTerm = this.props.user.userSearchedMovieText
      this.props.loadMoviesFromUserSearchText(searchTerm, page)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.user.userSearchedMovieText !==
        this.props.user.userSearchedMovieText ||
      prevProps.user.userSearchedMovieText.length !==
        this.props.user.userSearchedMovieText.length
    ) {
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

  renderItem = ({ item }) => (
    <View
      style={{
        marginTop: 25,
        width: "50%",
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
          this.props.navigation.navigate("ShowSingleMovie", {
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
  )

  render() {
    return !this.props.user.loading ? (
      <React.Fragment>
        <TopSearchBar clearInput={this.clearInput}></TopSearchBar>
        <FlatList
          contentContainerStyle={{}}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          removeClippedSubviews={true}
          numColumns={2}
          data={
            this.props.user.moviesFromUserSearchText.length === 0
              ? this.props.user.allUpcomingMovies
              : this.props.user.moviesFromUserSearchText
          }
          renderItem={this.renderItem}
          keyExtractor={item => item.imdb_id}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.props.user.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
        />
        {this.props.user.error_while_fetching_movie_data ? (
          <SnackBar
            visible={this.props.user.error_while_fetching_movie_data}
            textMessage="Error getting the data"
            actionHandler={() => clearError()}
            actionText="Close"
            autoHidingTime={1000}
            backgroundColor={constants().CLOUD_TEXT}
          />
        ) : null}
      </React.Fragment>
    ) : (
      <>
        <StandardLoader></StandardLoader>
        {this.props.user.error_while_fetching_movie_data ? (
          <SnackBar
            visible={this.props.user.error_while_fetching_movie_data}
            textMessage="Error getting the data"
            actionHandler={() => this.props.clearError()}
            actionText="Close"
            autoHidingTime={1000}
            backgroundColor={constants().CLOUD_TEXT}
          />
        ) : null}
      </>
    )
  }
}

MovieListScreen.propTypes = {
  user: PropTypes.object,
  loadAllUpcomingMovies: PropTypes.func,
  loadMoviesFromUserSearchText: PropTypes.func,
  clearUserSearchText: PropTypes.func,
  loadMoreMoviesFromUserSameSearchText: PropTypes.func,
  clearError: PropTypes.func,
}
const mapStateToProps = state => {
  return { user: state.user }
}

const mapDispatchToProps = {
  loadAllUpcomingMovies,
  loadMoviesFromUserSearchText,
  clearUserSearchText,
  loadMoreMoviesFromUserSameSearchText,
  clearError,
}

const styles = StyleSheet.create({
  activityIndicator: {
    position: "relative",
    width: width,
    height: height,
    paddingVertical: 20,
    borderTopWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderColor: constants().COLORS.ERROR,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieListScreen)
