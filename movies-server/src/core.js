import {fromJS, Map} from 'immutable';
import _ from 'lodash'

export const INITIAL_STATE = Map();

export function setMovies(state, movies) {
  return state.set('movies', fromJS(movies));
}

export function populateIds(state) {
  let moviesWithId = state.get('movies').map((m, i) => m.merge({id:i}));
  return state.set('movies', moviesWithId);
}

export function addMovie(state, movie) {
  let nextId = _.max(_.map(state.get('movies').toJS(), (m)=>{ return m['id']; }))+1;
  return state.update('movies', m => m.push(fromJS(_.merge(movie, {id:nextId}))));
}

export function removeMovie(state, movie) {
  let movieRemoved = state.get('movies').filter((m) => m.get('id')!==movie.id);
  return state.update('movies', m => movieRemoved);
}

export function updateMovie(state, movie) {
  let moviesUpdated = state.get('movies').map((m, i) => {
    if(m.get('id')===movie.id){
      return fromJS(movie);
    }
    return m;
  });
  return state.update('movies', m => moviesUpdated);
}