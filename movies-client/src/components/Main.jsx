import React from 'react';
import createReactClass from 'create-react-class';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {DisplayContainer} from './Display';
import SearchContainer from './Search';
import * as actionCreators from '../action_creators';

export const Main = createReactClass({
  mixins: [PureRenderMixin],
  getInitialState() {
    return {
      searchArea: 'title',
      searchTerm: ''
    }
  },
  handleSearchChange(key) {
    return function (e) {
      let state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  },
  render: function() {
    return <div className="main-container col-md-12">
      <h2 className="text-center">Movies List</h2>
      <div className="row search-filler" style={{marginTop: 15, marginBottom: 15}}>
        <div className="col-md-9">&nbsp;</div>
        <div className="col-md-3 text-right">
          <SearchContainer searchArea={this.state.searchArea} searchTerm={this.state.searchTerm} handleSearchChange={this.handleSearchChange} />
        </div>
      </div>
      <DisplayContainer searchArea={this.state.searchArea} searchTerm={this.state.searchTerm} {...this.props} />
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    movies: state.get('movies')
  }
}

export const MainContainer = connect(
  mapStateToProps,
  actionCreators
)(Main);