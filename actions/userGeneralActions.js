import axios from 'axios'
const pick = require('lodash.pick')
const map = require('lodash.map')
const partialRight = require('lodash.partialright')
import {
  LOADING,
  ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
  LOAD_ALL_UPCOMING_MOVIES,
  LOADING_MORE,
  FILTERING,
} from './types'
import NavigationService from './NavigationService'
import axiosService from '../apiConfig/axiosService'
const API_REF = require('../apiConfig/apiConfig')

// Promise function to to get individual Movie's Casts + genere + runtime
const getEachMovieDetailsGivenId = (id, index) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=659b6f94639ae8af21d0d09abc0b2cbc&append_to_response=casts`,
      )
      .then(res => {
        let movieDetails = res.data
        let result = pick(movieDetails, ['genres', 'runtime', 'casts'])
        if (
          result &&
          Object.entries(result).length !== 0 &&
          result.constructor === Object
        ) {
          resolve(result)
        } else {
          reject(new Error('No data received'))
        }
      })
  })
}

export const loadAllUpcomingMovies = page => async dispatch => {
  try {
    dispatch({
      type: LOADING,
      payload: true,
    })

    const URL = `${API_REF.API.INITIAL_UPCOMING_MOVIES}${page}`
    console.log('UREL IS ', URL)

    axiosService
      .request({
        url: URL,
        method: 'GET',
      })
      .then(response => {
        console.log('response is ', response.data)
        dispatch({
          type: LOAD_ALL_UPCOMING_MOVIES,
          payload: response.data.results,
        })
      })
      .catch(error => {
        dispatch({
          type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
          payload: error,
        })
      })
  } catch (err) {
    console.log('ERROR IS ')
  }
}
