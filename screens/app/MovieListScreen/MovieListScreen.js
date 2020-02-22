import React, { Component } from 'react'
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
import { loadAllUpcomingMovies } from '../../../actions/userGeneralActions'

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
    // this.fetchUpcomingMovies()
    const page = this.state.page
    this.props.loadAllUpcomingMovies(page)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      // this.fetchUpcomingMovies()
      const page = this.state.page
      this.props.loadAllUpcomingMovies(page)
    }
  }

  fetchUpcomingMovies = () => {
    const { page } = this.state
    const URL = `${API_REF.API.INITIAL_UPCOMING_MOVIES}${page}&per_page=10`
    // console.log('URL IS ', URL)

    axiosService
      .request({
        url: URL,
        method: 'GET',
      })
      .then(response => {
        // console.log('RES ', response.data)
        this.setState((prevState, nextProps) => ({
          data:
            page === 1
              ? Array.from(response.data)
              : [...this.state.data, ...response.data],
          loading: false,
          loadingMore: false,
          refreshing: false,
        }))
      })
      .catch(error => {
        this.setState({ error, loading: false })
      })
  }

  _handleRefresh = () => {
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

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
        loadingMore: true,
      }),
      () => {
        // this.fetchUpcomingMovies()
        const page = this.state.page
        this.props.loadAllUpcomingMovies(page)
      },
    )
  }

  _renderFooter = () => {
    if (!this.state.loadingMore) return null

    return (
      <View
        style={{
          position: 'relative',
          width: width,
          height: height,
          paddingVertical: 20,
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
          borderColor: colors.veryLightPink,
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  render() {
    // return !this.state.loading ? (
    return !this.props.user.loading ? (
      <React.Fragment>
        {console.log('FETCHED DATA ', this.props.user)}
        <FlatList
          contentContainerStyle={{}}
          numColumns={2}
          data={this.props.user.allUpcomingMovies}
          renderItem={({ item }) => (
            <View
              style={{
                marginTop: 25,
                width: '50%',
              }}
            >
              <MovieCard name={item.title} imageUrl={item.image_url} />
            </View>
          )}
          keyExtractor={item => item.image_url}
          // ListHeaderComponent={this._renderHeader}
          ListFooterComponent={this._renderFooter}
          onRefresh={this._handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this._handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
        />
      </React.Fragment>
    ) : (
      <View>
        <Text style={{ alignSelf: 'center' }}>Loading Movies</Text>
        <ActivityIndicator />
      </View>
    )
  }
}

MovieListScreen.propTypes = {
  user: PropTypes.object,
  loadAllUpcomingMovies: PropTypes.func,
}
const mapStateToProps = state => {
  return { user: state.user }
}

const mapDispatchToProps = {
  loadAllUpcomingMovies,
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieListScreen)
