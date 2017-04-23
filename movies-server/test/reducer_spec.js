import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import defaultMovies from '../default.json';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_MOVIES', () => {
    const initialState = Map();
    const action = {type: 'SET_MOVIES', movies: [defaultMovies[0]]};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      movies: [defaultMovies[0]]
    }));
  });

  it('has an initial state', () => {
    const action = {type: 'SET_MOVIES', movies: [defaultMovies[0]]};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      movies: [defaultMovies[0]]
    }));
  });

  it('can be used with reduce', () => {
    let movieToBeUpdate = {
      "title": "Test Movie",
      "actors": ["John Smith"],
      "genre": ["Comedy"],
      "year": "1999",
      "rating": 1.0,
      "id": 0
    };
    const actions = [
      {type: 'SET_MOVIES', movies: [defaultMovies[0], defaultMovies[1]]},
      {type: 'POPULATE_IDS'},
      {type: 'ADD_MOVIE', movie: defaultMovies[2]},
      {type: 'REMOVE_MOVIE', movie: defaultMovies[1]},
      {type: 'UPDATE_MOVIE', movie: movieToBeUpdate}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      movies: [movieToBeUpdate,defaultMovies[2]]
    }));
  });

});