import React from 'react'
import renderer from 'react-test-renderer'
import PropTypes from 'prop-types'
import { mount, shallow } from 'enzyme'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import MovieListScreen from '../MovieListScreen'
import TopSearchBar from '../../../../components/TopSearchBar/TopSearchBar'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// const store = mockStore({
//   user: {
//     loading: true,
//     allUpcomingMovies: [],
//     loadingMore: false,
//     filtering: false,
//     refreshing: false,
//     userSearchedMovieText: '',
//     moviesFromUserSearchText: [],
//     error_while_fetching_movie_data: false,
//   },
// })

const store = configureStore()({})

/* describe('MovieListScreen Component', () => {
  // it('should render a startup component if startup is not complete', () => {
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <MovieListScreen />
  //     </Provider>,
  //   )
  //   expect(wrapper.find('TopSearchBar').length).toEqual(1)
  // })
  it('should match snapshot', () => {
    const result = render(<MovieListScreen />).toJSON()
    expect(result).toMatchSnapshot()
  })
}) */

test('renders correctly', () => {
  const tree = renderer.create(<TopSearchBar />).toJSON()
  expect(tree).toMatchSnapshot()
})
