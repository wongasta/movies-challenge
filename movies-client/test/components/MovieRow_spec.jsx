import React from 'react';
import _ from 'lodash';
import {expect} from 'chai';
import {fromJS} from 'immutable';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import MovieRow from '../../src/components/MovieRow';

describe('AddMovie', () => {

  it('renders into movie rows', () => {
    const movieStub = fromJS({
      "title": "Test Movie",
      "actors": ["John Smith", "Adam Smith"],
      "genre": ["Comedy", "Horror"],
      "year": "1999",
      "rating": 1.0,
      "id": 0
    });
    const component = renderIntoDocument(
      <MovieRow key={movieStub['id']} movie={movieStub} getValidationState={_.noop} searchTerm={null} />
    );
    const tds = scryRenderedDOMComponentsWithTag(component, 'td');
    expect(tds.length).to.equal(7);
    expect(tds[1].textContent).to.equal("Test Movie");
    expect(tds[2].textContent).to.equal("Comedy, Horror");
    expect(tds[3].textContent).to.equal("John Smith, Adam Smith");
  });

  it('renders input fields when edit is clicked', () => {
    const movieStub = fromJS({
      "title": "Test Movie",
      "actors": ["John Smith"],
      "genre": ["Comedy"],
      "year": "1999",
      "rating": 1.0,
      "id": 0
    });
    const component = renderIntoDocument(
      <MovieRow key={movieStub['id']} movie={movieStub} getValidationState={_.noop} searchTerm={null} />
    );
    const buttons = scryRenderedDOMComponentsWithClass(component, 'edit-button');
    Simulate.click(buttons[0]);
    const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
    expect(inputs.length).to.equal(6);
    const afterEditButtons = scryRenderedDOMComponentsWithClass(component, 'cancel-button');
    Simulate.click(afterEditButtons[0]);
    const inputsAfterCancel = scryRenderedDOMComponentsWithTag(component, 'input');
    expect(inputsAfterCancel.length).to.equal(0);
  });

  it('correctly highlights rendered row', () => {
    const movieStub = fromJS({
      "title": "Test Movie",
      "actors": ["John Smith"],
      "genre": ["Comedy"],
      "year": "1999",
      "rating": 1.0,
      "id": 0
    });
    const component = renderIntoDocument(
      <MovieRow key={movieStub['id']} movie={movieStub} getValidationState={_.noop} searchTerm="movie" />
    );
    const highlights = scryRenderedDOMComponentsWithClass(component, 'highlight');
    expect(highlights[0].textContent).to.equal('Movie');
  });

});