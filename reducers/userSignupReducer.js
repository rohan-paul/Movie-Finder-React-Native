import {
  LOADING,
  ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
  LOAD_ALL_UPCOMING_MOVIES,
  LOADING_MORE,
  FILTERING,
} from '../actions/types'
import mockActionPayload from '../components/utils/lib/mockActionPayload'

// DONT FORGET TO CHANGE BELOW TWO COMMENTED-OUT STATES BEFORE SUBMISSION
const initialState = {
  loading: false,
  // loading: true,
  // allUpcomingMovies: [],
  allUpcomingMovies: mockActionPayload,
  loadingMore: false,
  filtering: false,
  refreshing: false,
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

    default:
      return state
  }
}
