import { minsToHHMM, filterArr } from "../UtilFunctions"

const dataFromAPI = [
  {
    imdb_id: "",
    id: 417573,
    poster_path:
      "https://image.tmdb.org/t/p/w500/4wQ0DrrR4rkSNPOx2wG28OFRxbv.jpg",
    title: "Para ter onde ir",
    overview: "fasff",
    vote_average: 7,
    genreArr: [],
    runtime: 20,
    castsArr: [
      "Ane Oliveira",
      "Keila Gentil",
      "Lorena Lobato",
      "Leoci Medeiros",
    ],
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
    poster_path: ".jpg",
    production_companies: [],
    production_countries: [],
    release_date: "2016-10-17",
    revenue: 0,
    runtime: null,
    spoken_languages: [
      {
        iso_639_1: "pt",
        name: "Português",
      },
    ],
    status: "Released",
    tagline: "",
    title: "Breathing Deep",
    video: false,
    vote_average: 0.0,
    vote_count: 0,
    release_date: "02-20-25",
  },
  {
    imdb_id: "",
    id: 417578,
    poster_path:
      "https://image.tmdb.org/t/p/w500/4wQ0DrrR4rkSNPOx2wG28OFRxbv.jpg",
    title: "Para ter onde ir",
    overview: "",
    vote_average: 7,
    genreArr: [],
    castsArr: [
      "Ane Oliveira",
      "Keila Gentil",
      "Lorena Lobato",
      "Leoci Medeiros",
    ],
    formattedRuntime: "NaN:NaN",
    release_date: "02-20-25",
  },
]

const expectedResultAfterFiltering = [
  {
    imdb_id: "",
    id: 417573,
    poster_path:
      "https://image.tmdb.org/t/p/w500/4wQ0DrrR4rkSNPOx2wG28OFRxbv.jpg",
    title: "Para ter onde ir",
    overview: "fasff",
    vote_average: 7,
    genreArr: [],
    runtime: 20,
    castsArr: [
      "Ane Oliveira",
      "Keila Gentil",
      "Lorena Lobato",
      "Leoci Medeiros",
    ],
    release_date: "2016-10-17",
    formattedRuntime: "NaN:NaN",
  },
]

const noisyApiData = [
  {
    imdb_id: "",
    id: 417573,
    poster_path:
      "https://image.tmdb.org/t/p/w500/4wQ0DrrR4rkSNPOx2wG28OFRxbv.jpg",
    title: "Para ter onde ir",
    overview: "fasff",
    vote_average: 7,
    genreArr: [],
    runtime: 20,
    castsArr: [
      "Ane Oliveira",
      "Keila Gentil",
      "Lorena Lobato",
      "Leoci Medeiros",
    ],
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
    poster_path: ".jpg",
    production_companies: [],
    production_countries: [],
    release_date: "2016-10-17",
    revenue: 0,
    runtime: null,
    spoken_languages: [
      {
        iso_639_1: "pt",
        name: "Português",
      },
    ],
    status: "Released",
    tagline: "",
    title: "Breathing Deep",
    video: false,
    vote_average: 0.0,
    vote_count: 0,
    release_date: "02-20-25",
  },
  {
    imdb_id: "",
    id: 417578,
    poster_path:
      "https://image.tmdb.org/t/p/w500/4wQ0DrrR4rkSNPOx2wG28OFRxbv.jpg",
    title: "Para ter onde ir",
    overview: "",
    vote_average: 7,
    genreArr: [],
    castsArr: [
      "Ane Oliveira",
      "Keila Gentil",
      "Lorena Lobato",
      "Leoci Medeiros",
    ],
    formattedRuntime: "NaN:NaN",
    release_date: "02-20-25",
  },
]

test("minsToHHMM function should work as expected-1", () => {
  expect(minsToHHMM("107")).toBe("01:47")
})

test("minsToHHMM function should work as expected-2", () => {
  expect(minsToHHMM("130")).toBe("02:10")
})

test("minsToHHMM function should work as expected-3", () => {
  expect(minsToHHMM("59")).toBe("00:59")
})

test("filterArr function should filter as expected", () => {
  expect(filterArr(dataFromAPI)).toEqual(expectedResultAfterFiltering)
})

test("filterArr function should filter as expected", () => {
  expect(filterArr(noisyApiData)).toEqual([])
})
