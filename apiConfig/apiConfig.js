const API_KEY = `659b6f94639ae8af21d0d09abc0b2cbc`
const API_REF = {
  API_KEY: `659b6f94639ae8af21d0d09abc0b2cbc`,
  HOST: `https://api.themoviedb.org/3/movie/`,
  API: {
    INITIAL_UPCOMING_MOVIES: `upcoming?api_key=${API_KEY}&language=en-US&page=`,
    IMAGE_HOST: `https://image.tmdb.org/t/p/w500`,
    MOVIE_RATINGS: `https://api.themoviedb.org/4/movie/`,
    DETAILS_MOVIE_TEXT_SEARCH: `https://api.themoviedb.org/3/search/movie?api_key=`,
  },
}

module.exports = API_REF

/*

MOVIE_DETAILS - https://api.themoviedb.org/3/movie/157336?api_key=659b6f94639ae8af21d0d09abc0b2cbc&append_to_response=casts

MOVIE_RATINGS -

https://api.themoviedb.org/4/movie/157336?api_key=659b6f94639ae8af21d0d09abc0b2cbc&append_to_response=casts

DETAILS_MOVIE_TEXT_SEARCH - This does not accept append_to_response=casts


https://api.themoviedb.org/3/search/movie?api_key=659b6f94639ae8af21d0d09abc0b2cbc&language=en-US&page=1&query=the+avengers&append_to_response=casts

*/
