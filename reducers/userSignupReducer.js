import {
  LOADING,
  ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
  LOAD_ALL_UPCOMING_MOVIES,
  LOADING_MORE,
  FILTERING,
} from '../actions/types'

const initialState = {
  loading: true,
  allUpcomingMovies: [],
  loadingMore: false,
  filtering: false,
  refreshing: false,
}
export default function(state = initialState, actions) {
  switch (actions.type) {
    case LOAD_ALL_UPCOMING_MOVIES:
      return {
        ...state,
        allUpcomingMovies: [...state.allUpcomingMovies, ...actions.payload],
        loading: false,
        loadingMore: false,
        refreshing: false,
      }

    default:
      return state
  }
}
