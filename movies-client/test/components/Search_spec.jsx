import React from 'react';
import _ from 'lodash';
import {expect} from 'chai';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import SearchContainer from '../../src/components/Search';

describe('Search', () => {

  it('renders into search fields', () => {
    const component = renderIntoDocument(
      <SearchContainer searchArea="title" searchTerm="Hello World" handleSearchChange={_.noop} />
    );
    const select = scryRenderedDOMComponentsWithTag(component, 'select');
    const options = scryRenderedDOMComponentsWithTag(component, 'option');
    const input = scryRenderedDOMComponentsWithTag(component, 'input');
    expect(select[0].value).to.equal('title');
    expect(options.length).to.equal(3);
    expect(input[0].value).to.equal('Hello World');
  });

});