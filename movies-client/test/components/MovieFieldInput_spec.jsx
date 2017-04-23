import React from 'react';
import _ from 'lodash';
import {expect} from 'chai';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import MovieFieldInput from '../../src/components/MovieFieldInput';

describe('MovieFieldInput', () => {

  it('renders into input field for property of movie', () => {
    const component = renderIntoDocument(
      <MovieFieldInput state={{}} handleChange={_.noop} getValidationState={_.noop} type="title" label="Title" />
    );
    const label = scryRenderedDOMComponentsWithTag(component, 'label');
    const input = scryRenderedDOMComponentsWithTag(component, 'input');
    expect(label[0].textContent).to.equal('Title');
    expect(input.length).to.equal(1);
  });

});