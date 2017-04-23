import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import defaultMovies from '../default.json';
import makeStore from '../src/store';

describe('store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());

    store.dispatch({
      type: 'SET_MOVIES',
      movies: fromJS([defaultMovies[0], defaultMovies[1]])
    });
    expect(store.getState()).to.equal(fromJS({
      movies: [defaultMovies[0], defaultMovies[1]]
    }));
  });

});