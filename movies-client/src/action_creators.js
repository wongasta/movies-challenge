export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function addMovie(movie) {
  return {
    meta: {remote: true},
    type: 'ADD_MOVIE',
    movie
  }
}

export function updateMovie(movie) {
  return {
    meta: {remote: true},
    type: 'UPDATE_MOVIE',
    movie
  }
}

export function removeMovie(movie) {
  return {
    meta: {remote: true},
    type: 'REMOVE_MOVIE',
    movie
  }
}