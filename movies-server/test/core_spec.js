import _ from 'lodash'
import {fromJS, Map} from 'immutable';
import {expect} from 'chai';
import defaultMovies from '../default.json';
import {setMovies, populateIds, addMovie, removeMovie, updateMovie} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {
    it('converts to immutable', () => {
      const state = Map();
      const entries = [defaultMovies[0], defaultMovies[1]];
      const nextState = setMovies(state, entries);
      expect(nextState).to.equal(Map({
        movies: fromJS([defaultMovies[0], defaultMovies[1]])
      }));
    });
  });

  describe('populateIds', () => {
    it('populate ids of movies', () => {
      const state = Map({
        movies: fromJS([defaultMovies[0], defaultMovies[1]])
      });
      const nextState = populateIds(state);
      expect(nextState).to.equal(Map({
        movies: fromJS([_.merge(defaultMovies[0], {id:0}), _.merge(defaultMovies[1], {id:1})])
      }));
    });
  });

  describe('addMovie', () => {
    it('adds a movie', () => {
      const state = Map({
        movies: fromJS([_.merge(defaultMovies[0], {id:0}), _.merge(defaultMovies[1], {id:1})])
      });
      const nextState = addMovie(state, defaultMovies[2]);
      expect(nextState).to.equal(Map({
        movies: fromJS([defaultMovies[0], defaultMovies[1], defaultMovies[2]])
      }));
    });
  });

  describe('removeMovie', () => {
    it('remove a movie', () => {
      const state = Map({
        movies: fromJS([_.merge(defaultMovies[0], {id:0}), _.merge(defaultMovies[1], {id:1})])
      });
      const nextState = removeMovie(state, _.merge(defaultMovies[0], {id:0}));
      expect(nextState).to.equal(Map({
        movies: fromJS([defaultMovies[1]])
      }));
    });
  });

  describe('updateMovie', () => {
    it('update a movie', () => {
      const state = Map({
        movies: fromJS([_.merge(defaultMovies[0], {id:0}), _.merge(defaultMovies[1], {id:1})])
      });
      const movieUpdated = {
        "title": "Test Movie",
        "actors": ["John Smith"],
        "genre": ["Comedy"],
        "year": "1999",
        "rating": 1.0,
        "id": 0
      };
      const nextState = updateMovie(state, movieUpdated);
      expect(nextState).to.equal(Map({
        movies: fromJS([movieUpdated, defaultMovies[1]])
      }));
    });
  });

});