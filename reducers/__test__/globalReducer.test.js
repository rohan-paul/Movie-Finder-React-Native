import reducer from '../globalReducer'
import expect from 'expect'
import * as actions from '../../actions/userGeneralActions'
import {
  LOADING,
  ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
  LOAD_ALL_UPCOMING_MOVIES,
  LOADING_MORE,
  FILTERING,
  START_USER_SEARCHING,
  USER_SEARCH_TEXT,
  CLEAR_USER_SEARCH_TEXT,
  LOAD_ALL_USER_SEARCHED_MOVIES,
  LOAD_MORE_USER_SEARCHED_MOVIES,
  CLEAR_ERROR,
} from '../../actions/types'

const initialState = {
  loading: true,
  allUpcomingMovies: [],
  loadingMore: false,
  filtering: false,
  refreshing: false,
  userSearchedMovieText: '',
  moviesFromUserSearchText: [],
  error_while_fetching_movie_data: false,
}

describe('Reducers should work as expected', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle ERROR_WHILE_FETCHING_UPCOMING_MOVIES', () => {
    const errorAction = {
      type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
      payload: '',
    }
    expect(reducer({}, errorAction)).toEqual({
      error_while_fetching_movie_data: true,
    })
  })

  it('should handle CLEAR_ERROR', () => {
    const clearErrorAction = {
      type: CLEAR_ERROR,
      payload: false,
    }
    expect(reducer({}, clearErrorAction)).toEqual({
      error_while_fetching_movie_data: false,
    })
  })

  it('should handle LOAD_ALL_USER_SEARCHED_MOVIES', () => {
    const movieAPIResponse = [
      {
        imdb_id: 'tt2076298',
        id: 449924,
        poster_path:
          'https://image.tmdb.org/t/p/w500/yJdeWaVXa2se9agI6B4mQunVYkB.jpg',
        title: 'Ip Man 4: The Finale',
        overview:
          'Following the death of his wife, Ip Man travels to San Francisco to ease tensions between the local kung fu masters and his star student, Bruce Lee, while searching for a better future for his son.',
        vote_average: 5.9,
        genreArr: ['Action', 'Drama', 'History'],
        castsArr: ['Donnie Yen', 'Wu Yue'],
        formattedRuntime: '01:45',
      },
      {
        imdb_id: 'tt2076298',
        id: 449924,
        poster_path:
          'https://image.tmdb.org/t/p/w500/yJdeWaVXa2se9agI6B4mQunVYkB.jpg',
        title: 'Ip Man 4: The Finale',
        overview:
          'Following the death of his wife, Ip Man travels to San Francisco to ease tensions between the local kung fu masters and his star student, Bruce Lee, while searching for a better future for his son.',
        vote_average: 5.9,
        genreArr: ['Action', 'Drama', 'History'],
        castsArr: ['Donnie Yen', 'Wu Yue'],
        formattedRuntime: '01:45',
      },
    ]
    const loadMoviesFromUserSearchTextAction = {
      type: LOAD_ALL_USER_SEARCHED_MOVIES,
      payload: movieAPIResponse,
    }
    expect(reducer({}, loadMoviesFromUserSearchTextAction)).toEqual({
      moviesFromUserSearchText: movieAPIResponse,
      loading: false,
      loadingMore: false,
      refreshing: false,
      error_while_fetching_movie_data: false,
    })
  })

  it('should handle START_USER_SEARCHING', () => {
    const startUserSearchingAction = {
      type: START_USER_SEARCHING,
      payload: true,
    }
    expect(reducer({}, startUserSearchingAction)).toEqual({
      allUpcomingMovies: [],
    })
  })

  it('should handle USER_SEARCH_TEXT', () => {
    const handleUserSearchTextAction = {
      type: USER_SEARCH_TEXT,
      payload: 'Terminator',
    }
    expect(reducer({}, handleUserSearchTextAction)).toEqual({
      userSearchedMovieText: 'Terminator',
    })
  })

  it('should handle CLEAR_USER_SEARCH_TEXT', () => {
    const clearUserSearchTextAction = {
      type: CLEAR_USER_SEARCH_TEXT,
      payload: '',
    }
    expect(reducer({}, clearUserSearchTextAction)).toEqual({
      loading: false,
      loadingMore: false,
      refreshing: false,
      userSearchedMovieText: '',
      moviesFromUserSearchText: [],
      error_while_fetching_movie_data: false,
    })
  })
})
