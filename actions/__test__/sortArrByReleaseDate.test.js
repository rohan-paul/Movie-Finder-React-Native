const sortBy = require("lodash.sortby")

const dataFromAPI = [
  {
    imdb_id: "",
    id: 417573,
    poster_path:
      "https://image.tmdb.org/t/p/w500/4wQ0DrrR4rkSNPOx2wG28OFRxbv.jpg",
    release_date: "2016-10-17",
    formattedRuntime: "NaN:NaN",
  },

  {
    adult: false,
    backdrop_path: null,
    belongs_to_collection: null,
    budget: 0,
    genres: [
      {
        id: 18,
        name: "Drama",
      },
    ],
    homepage: null,
    id: 466196,
    imdb_id: null,
    original_language: "pt",
    original_title: "Pare Ter Onde Ir",
    overview:
      "Three women with very different views on life and love go on a trip together, .",
    popularity: 0.6,

    release_date: "2018-10-17",
  },
  {
    imdb_id: "",
    id: 417578,
    poster_path:
      "https://image.tmdb.org/t/p/w500/4wQ0DrrR4rkSNPOx2wG28OFRxbv.jpg",
    title: "Para ter onde ir",
    formattedRuntime: "NaN:NaN",
    release_date: "2018-01-17",
  },
]

const expectedSortedResult = [
  {
    adult: false,
    backdrop_path: null,
    belongs_to_collection: null,
    budget: 0,
    genres: [
      {
        id: 18,
        name: "Drama",
      },
    ],
    homepage: null,
    id: 466196,
    imdb_id: null,
    original_language: "pt",
    original_title: "Pare Ter Onde Ir",
    overview:
      "Three women with very different views on life and love go on a trip together, .",
    popularity: 0.6,
    release_date: "2018-10-17",
  },
  {
    imdb_id: "",
    id: 417578,
    poster_path:
      "https://image.tmdb.org/t/p/w500/4wQ0DrrR4rkSNPOx2wG28OFRxbv.jpg",
    title: "Para ter onde ir",
    formattedRuntime: "NaN:NaN",
    release_date: "2018-01-17",
  },
  {
    imdb_id: "",
    id: 417573,
    poster_path:
      "https://image.tmdb.org/t/p/w500/4wQ0DrrR4rkSNPOx2wG28OFRxbv.jpg",
    release_date: "2016-10-17",
    formattedRuntime: "NaN:NaN",
  },
]

const sortArrByReleaseDate = myArray => {
  const sortedArr = sortBy(myArray, Obj => {
    return new Date(Obj.release_date)
  })
  return sortedArr.reverse()
}

test("filterArr function should filter as expected", () => {
  expect(sortArrByReleaseDate(dataFromAPI)).toEqual(expectedSortedResult)
})
