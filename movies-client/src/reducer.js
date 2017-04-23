import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function addMovie(state, movie) {
  // Allows transform of client state if needed in the future, otherwise all good
  return state;
}

function updateMovie(state, movie) {
  // Allows transform of client state if needed in the future, otherwise all good
  return state;
}

function removeMovie(state, movie) {
  // Allows transform of client state if needed in the future, otherwise all good
  return state;
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'ADD_MOVIE':
      return addMovie(state, action.movie);
    case 'UPDATE_MOVIE':
      return updateMovie(state, action.movie);
    case 'REMOVE_MOVIE':
      return removeMovie(state, action.movie);
    default:
  }
  return state;
}