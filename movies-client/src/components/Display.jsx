import React from 'react';
import createReactClass from 'create-react-class';
import Immutable from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import AddMovie from './AddMovie';
import MovieRow from './MovieRow';

export const Display = createReactClass({
  mixins: [PureRenderMixin],
  getMovies: function() {
    return this.props.movies || [];
  },
  getValidationState(state, key){
    let result;
    switch(key){
      case 'thumbnail':
        result = (state[key] && state[key].match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/));
        break;
      case 'year':
        result = (state[key] && state[key].match(/^\d{4}$/));
        break;
      case 'rating':
        result = state[key] && !isNaN(state[key]) && state[key]<10;
        break;
      default:
        result = state[key];
    }
    return (result)?'success':'error';
  },
  displayMovie(movie){
    if(!this.props.searchTerm || !this.props.searchArea){ return true; }
    let value = movie.get(this.props.searchArea);
    if(value instanceof Immutable.List){
      value = value.toJS().join(', ');
    }
    return ~value.toLowerCase().indexOf(this.props.searchTerm.toLowerCase());
  },
  render: function() {
    return <div className="display-container text-center col-md-12">
      <table className="table table-striped">
        <thead>
        <tr>
          <th className="text-center">Thumbnail</th>
          <th className="text-center">Title</th>
          <th className="text-center">Genres</th>
          <th className="text-center">Actors</th>
          <th className="text-center">Year</th>
          <th className="text-center">Rating</th>
          <th className="text-center">Controls</th>
        </tr>
        </thead>
        <tbody>
        {this.getMovies().map(movie =>
          (this.displayMovie(movie))?
          <MovieRow key={movie.get('id')} movie={movie} getValidationState={this.getValidationState} searchTerm={(this.props.searchTerm && this.props.searchArea)?this.props.searchTerm.toLowerCase():null} {...this.props} /> : null
        )}
        </tbody>
      </table>
      <AddMovie getValidationState={this.getValidationState} {...this.props} />
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    movies: state.get('movies')
  }
}

export const DisplayContainer = connect(
  mapStateToProps,
  actionCreators
)(Display);