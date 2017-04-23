import {expect} from 'chai';
import {fromJS} from 'immutable';
import defaultMovies from '../default.json';

describe('immutability', () => {

  describe('A number', () => {
    function increment(currentState) {
      return currentState + 1;
    }
    it('is immutable', () => {
      let state = 1;
      let nextState = increment(state);

      expect(nextState).to.equal(2);
      expect(state).to.equal(1);
    });
  });

  describe('A Collection', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }
    it('is immutable', () => {
      let state = fromJS([defaultMovies[0],defaultMovies[1]]);
      let nextState = addMovie(state, fromJS(defaultMovies[2]));

      expect(nextState).to.equal(fromJS([defaultMovies[0],defaultMovies[1],defaultMovies[2]]));
      expect(state).to.equal(fromJS([defaultMovies[0],defaultMovies[1]]));
    });
  });

});
