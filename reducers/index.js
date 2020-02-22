import { combineReducers } from 'redux'
import userSignupReducer from './userSignupReducer'

export default combineReducers({
  user: userSignupReducer,
})
