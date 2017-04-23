import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  const movieStub = fromJS({"movies":[{
    "title": "Test Movie",
    "actors": ["John Smith", "Adam Smith"],
    "genre": ["Comedy", "Horror"],
    "year": "1999",
    "rating": 1.0,
    "id": 0
  }]});

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: movieStub
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(movieStub);
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: movieStub
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(movieStub);
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: movieStub
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(movieStub);
  });

});
