const singleMovie = [
  {
    id: 454626,
    imdb_id: 'tt3794354',
    genres: [
      {
        id: 28,
        name: 'Action',
      },
      {
        id: 878,
        name: 'Science Fiction',
      },
      {
        id: 35,
        name: 'Comedy',
      },
      {
        id: 10751,
        name: 'Family',
      },
    ],
    runtime: 99,
    casts: {
      cast: [
        {
          cast_id: 16,
          character: 'Sonic the Hedgehog (voice)',
          credit_id: '5b6bfd830e0a267ef8130eba',
          gender: 2,
          id: 222121,
          name: 'Ben Schwartz',
          order: 0,
          profile_path: '/ty2N3LuUiXO1uKyRg74DUN82xQe.jpg',
        },
        {
          cast_id: 6,
          character: 'Tom Wachowski',
          credit_id: '5b0f7123c3a36862150030ab',
          gender: 2,
          id: 11006,
          name: 'James Marsden',
          order: 1,
          profile_path: '/tJK1PbhcJj5cBNqnuFKHtAFPQKz.jpg',
        },
      ],
      crew: [
        {
          credit_id: '5c45688f9251410e0c4df8b6',
          department: 'Production',
          gender: 2,
          id: 11874,
          job: 'Producer',
          name: 'Neal H. Moritz',
          profile_path: '/cNcsEYmoS4niCz3UkVAA09dUIob.jpg',
        },
        {
          credit_id: '5b3a97e992514131ba0077cb',
          department: 'Art',
          gender: 0,
          id: 17831,
          job: 'Art Direction',
          name: 'Grant Van Der Slagt',
          profile_path: null,
        },
      ],
    },
  },
  {
    id: 449924,
    imdb_id: 'tt2076298',
    genres: [
      {
        id: 28,
        name: 'Action',
      },
      {
        id: 18,
        name: 'Drama',
      },
      {
        id: 36,
        name: 'History',
      },
    ],
    runtime: 105,
    casts: {
      cast: [
        {
          cast_id: 0,
          character: '叶问',
          credit_id: '58de54489251411ba600baa5',
          gender: 2,
          id: 1341,
          name: 'Donnie Yen',
          order: 0,
          profile_path: '/eSuunsATXBaYTnr7IC4LGBrJ5yY.jpg',
        },
        {
          cast_id: 8,
          character: '万宗华',
          credit_id: '5d4bd971c68b694baf0e9f56',
          gender: 2,
          id: 1800792,
          name: 'Wu Yue',
          order: 1,
          profile_path: '/hRePA3mh9mfAqX7SJ4rGxrNrxT7.jpg',
        },
        {
          cast_id: 3,
          character: '',
          credit_id: '5b4da4f09251417d0f0489d8',
          gender: 2,
          id: 83633,
          name: 'Vanness Wu',
          order: 2,
          profile_path: '/pFlm7iHEhXpzJ2QKbtk9EApqtnN.jpg',
        },
      ],
      crew: [
        {
          credit_id: '5d4bd950c68b694baf0e9eed',
          department: 'Directing',
          gender: 2,
          id: 18899,
          job: 'Action Director',
          name: 'Yuen Woo-ping',
          profile_path: '/7gr04tWDnsBHHmo18aYLWXZHAvC.jpg',
        },
        {
          credit_id: '5dfdb4b965686e001591bd91',
          department: 'Sound',
          gender: 2,
          id: 57304,
          job: 'Original Music Composer',
          name: 'Kenji Kawai',
          profile_path: '/jIhpBTVJ4JmPFUbTlXROgL6GMCT.jpg',
        },
        {
          credit_id: '58de548bc3a3687c6700bda9',
          department: 'Directing',
          gender: 2,
          id: 63571,
          job: 'Director',
          name: 'Wilson Yip',
          profile_path: '/wJHHLPt6oVvurN9Sk4ff1MFh7z6.jpg',
        },
      ],
    },
  },
]

const upComingAllMovie = [
  {
    popularity: 247.732,
    vote_count: 292,
    video: false,
    poster_path: '/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg',
    id: 454626,
    adult: false,
    backdrop_path: '/qonBhlm0UjuKX2sH7e73pnG0454.jpg',
    original_language: 'en',
    original_title: 'Sonic the Hedgehog',
    genre_ids: [28, 35, 878, 10751],
    title: 'Sonic the Hedgehog',
    vote_average: 7.1,
    overview:
      'Based on the global blockbuster videogame franchise from Sega, Sonic the Hedgehog tells the story of the world’s speediest hedgehog as he embraces his new home on Earth. In this live-action adventure comedy, Sonic and his new best friend team up to defend the planet from the evil genius Dr. Robotnik and his plans for world domination.',
    release_date: '2020-02-12',
  },
  {
    popularity: 150.027,
    vote_count: 296,
    video: false,
    poster_path: '/yJdeWaVXa2se9agI6B4mQunVYkB.jpg',
    id: 449924,
    adult: false,
    backdrop_path: '/ekP6EVxL81lZ4ivcqPsoZ72rY0h.jpg',
    original_language: 'cn',
    original_title: '葉問4',
    genre_ids: [28, 18, 36],
    title: 'Ip Man 4: The Finale',
    vote_average: 5.9,
    overview:
      'Following the death of his wife, Ip Man travels to San Francisco to ease tensions between the local kung fu masters and his star student, Bruce Lee, while searching for a better future for his son.',
    release_date: '2019-12-20',
  },
]
//   page: 1,
//   total_results: 267,
//   dates: { maximum: '2020-03-16', minimum: '2020-02-28' },
//   total_pages: 14,
// }

const mergeArraysConditionally = (topUsers, userProfiles) => {
  let merged = []

  // First return the first array with only elements whose id matches with an element's id from the second array
  topUsers.every(i =>
    userProfiles.map(j => j.id).includes(i.id) ? merged.push(i) : null,
  )

  // Now that I have got two separate arrays of matched and the original array, simply merge the matched array (on the basis of ID) with the original array containing the data.
  merged = merged.map(i =>
    Object.assign(
      i,
      userProfiles.find(j => j.id === i.id),
    ),
  )
  return merged
}
