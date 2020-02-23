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
  START_USER_SEARCHING,
  USER_SEARCH_TEXT,
  CLEAR_USER_SEARCH_TEXT,
  LOAD_ALL_USER_SEARCHED_MOVIES,
} from './types'
import NavigationService from './NavigationService'
import axiosService from '../apiConfig/axiosService'
import { minsToHHMM, filterArr } from '../UtilsFunctions/UtilFunctions'
const API_REF = require('../apiConfig/apiConfig')
const IMAGE_HOST = `https://image.tmdb.org/t/p/w500`

// The below function is for merging two array-of-objects that are received from two different APIs but that share some common 'ids' of the individual elements of the array. And in this function I shall merge them based on that common id's
const mergeArraysConditionally = (listOfUpComingMovies, eachMovieDetails) => {
  let merged = []

  // First return the first array with only elements whose id matches with an element's id from the second array
  listOfUpComingMovies.every(i =>
    eachMovieDetails.map(j => j.id).includes(i.id) ? merged.push(i) : null,
  )

  // Now that I have got two separate arrays of matched and the original array, simply merge the matched array (on the basis of ID) with the original array containing the data.
  merged = merged.map(i =>
    Object.assign(
      i,
      eachMovieDetails.find(j => j.id === i.id),
    ),
  )
  // Get some of the nested value
  let modArr = merged.map(i => {
    return {
      ...i,
      castsArr: i.casts.cast.map(j => j.name),
      genreArr: i.genres.map(j => j.name),
      formattedRuntime: minsToHHMM(i.runtime),
      poster_path: `${IMAGE_HOST}${i.poster_path}`,
    }
  })
  let arrToReturn = map(
    modArr,
    partialRight(pick, [
      'imdb_id',
      'id',
      'poster_path',
      'title',
      'title',
      'overview',
      'vote_average',
      'genreArr',
      'castsArr',
      'formattedRuntime',
    ]),
  )

  return arrToReturn
}

// Promise function to to get individual Movie's Casts + genere + runtime
const getEachMovieDetailsGivenId = (id, index) => {
  return new Promise((resolve, reject) => {
    const URL = `${API_REF.HOST}${id}?api_key=${API_REF.API_KEY}&append_to_response=casts`

    axios.get(URL).then(res => {
      let movieDetails = res.data
      let result = pick(movieDetails, [
        'id',
        'imdb_id',
        'genres',
        'runtime',
        'casts',
      ])
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

    axiosService
      .request({
        url: URL,
        method: 'GET',
      })
      .then(async response => {
        let upcomingMovies = map(
          filterArr(response.data.results),
          partialRight(pick, [
            'id',
            'poster_path',
            'title',
            'overview',
            'vote_average',
            'release_date',
          ]),
        )

        const movieIds = upcomingMovies.map(i => i.id)

        let topUpComingIndividualMovies = await movieIds.map(
          getEachMovieDetailsGivenId,
        )

        let allTopUpComingIndividualMovies = Promise.all(
          topUpComingIndividualMovies,
        )

        allTopUpComingIndividualMovies
          .then(res => {
            // console.log('SUCCESS')
            dispatch({
              type: LOAD_ALL_UPCOMING_MOVIES,
              payload: mergeArraysConditionally(upcomingMovies, res),
            })
          })
          .catch(err => {
            console.log('ERROR IN FETCHING ALL allTopUpComingIndividualMovies ')
            dispatch({
              type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
              payload: error,
            })
          })
      })
      .catch(error => {
        dispatch({
          type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
          payload: error,
        })
      })
  } catch (err) {
    console.log('ERROR IS ', err)
    dispatch({
      type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
      payload: error,
    })
  }
}

export const handleUserSearchText = text => {
  return {
    type: USER_SEARCH_TEXT,
    payload: text,
  }
}

export const clearUserSearchText = () => {
  return {
    type: CLEAR_USER_SEARCH_TEXT,
    payload: '',
  }
}

export const loadMoviesFromUserSearchText = (
  searchTerm,
  page,
) => async dispatch => {
  try {
    dispatch({
      type: START_USER_SEARCHING,
      payload: true,
    })

    // const URL = `${API_REF.API.INITIAL_UPCOMING_MOVIES}${page}`

    // const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=659b6f94639ae8af21d0d09abc0b2cbc&language=en-US&page=1&query=${searchTerm}`

    const searchURL = `${API_REF.API.DETAILS_MOVIE_TEXT_SEARCH}${API_REF.API_KEY}&language=en-US&page=${page}&query=${searchTerm}`

    // console.log('SEARCH URL IS ', searchURL)

    axiosService
      .request({
        url: searchURL,
        method: 'GET',
      })
      .then(async response => {
        let searchResultMovies = map(
          filterArr(response.data.results),
          partialRight(pick, [
            'id',
            'poster_path',
            'title',
            'overview',
            'vote_average',
            'release_date',
          ]),
        )

        const movieIds = searchResultMovies.map(i => i.id)

        let searchResultIndividualMovies = await movieIds.map(
          getEachMovieDetailsGivenId,
        )

        let allSearchResultIndividualMovies = Promise.all(
          searchResultIndividualMovies,
        )

        allSearchResultIndividualMovies
          .then(res => {
            // console.log('SEARCH RESULT RESPONSE ', res)
            dispatch({
              type: LOAD_ALL_USER_SEARCHED_MOVIES,
              payload: mergeArraysConditionally(searchResultMovies, res),
            })
          })
          .catch(err => {
            console.log('ERROR IN FETCHING ALL allTopUpComingIndividualMovies ')
            dispatch({
              type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
              payload: error,
            })
          })
      })
      .catch(error => {
        dispatch({
          type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
          payload: error,
        })
      })
  } catch (err) {
    console.log('ERROR IS ', err)
    dispatch({
      type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
      payload: error,
    })
  }
}
