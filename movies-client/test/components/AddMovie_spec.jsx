import React from 'react';
import _ from 'lodash';
import {expect} from 'chai';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import AddMovie from '../../src/components/AddMovie';

describe('AddMovie', () => {

  it('renders into a button upon init', () => {
    const component = renderIntoDocument(
      <AddMovie getValidationState={_.noop} />
    );
    const button = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(button.length).to.equal(1);
  });

  it('when clicked it expands into multiple inputs', () => {
    const component = renderIntoDocument(
      <AddMovie getValidationState={_.noop} />
    );
    const button = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(button[0]);
    const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
    expect(inputs.length).to.equal(6);
  });

});