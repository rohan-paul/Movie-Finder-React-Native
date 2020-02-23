import {
  LOADING,
  ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
  LOAD_ALL_UPCOMING_MOVIES,
  LOADING_MORE,
  FILTERING,
  USER_SEARCH_TEXT,
  CLEAR_USER_SEARCH_TEXT,
  LOAD_ALL_USER_SEARCHED_MOVIES,
} from '../actions/types'
import mockActionPayload from '../components/utils/lib/mockActionPayload'

// DONT FORGET TO CHANGE BELOW TWO COMMENTED-OUT STATES BEFORE SUBMISSION
const initialState = {
  loading: true,
  allUpcomingMovies: [],
  // loading: false,
  // allUpcomingMovies: mockActionPayload,
  loadingMore: false,
  filtering: false,
  refreshing: false,
  userSearchedMovieText: '',
  moviesFromUserSearchText: [],
}
export default function(state = initialState, actions) {
  switch (actions.type) {
    case LOAD_ALL_UPCOMING_MOVIES:
      // console.log('ACTIONS.PAYLOAD ', JSON.stringify(actions.payload))
      return {
        ...state,
        allUpcomingMovies: [...state.allUpcomingMovies, ...actions.payload],
        loading: false,
        loadingMore: false,
        refreshing: false,
      }

    case LOAD_ALL_USER_SEARCHED_MOVIES:
      // console.log('ACTIONS.PAYLOAD ', JSON.stringify(actions.payload))
      return {
        ...state,
        moviesFromUserSearchText: [
          ...state.moviesFromUserSearchText,
          ...actions.payload,
        ],
        loading: false,
        loadingMore: false,
        refreshing: false,
      }

    case USER_SEARCH_TEXT:
      return {
        ...state,
        userSearchedMovieText: actions.payload,
      }

    case CLEAR_USER_SEARCH_TEXT:
      return {
        ...state,
        userSearchedMovieText: actions.payload,
        moviesFromUserSearchText: [],
      }

    default:
      return state
  }
}
