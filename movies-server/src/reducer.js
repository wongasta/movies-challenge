import {setMovies, populateIds, addMovie, removeMovie, updateMovie, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_MOVIES':
      return setMovies(state, action.movies);
    case 'POPULATE_IDS':
      return populateIds(state);
    case 'ADD_MOVIE':
      return addMovie(state, action.movie);
    case 'REMOVE_MOVIE':
      return removeMovie(state, action.movie);
    case 'UPDATE_MOVIE':
      return updateMovie(state, action.movie);
  }
  return state;
}