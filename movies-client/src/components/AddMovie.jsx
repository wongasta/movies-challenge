import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Button} from'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import MovieFieldInput from './MovieFieldInput';

export default createReactClass({
  mixins: [PureRenderMixin],
  getInitialState() {
    return {
      addingMovie: false,
      thumbnail: '',
      title: '',
      genre: '',
      actors: '',
      year: '',
      rating: '',
    }
  },
  isAdding() {
    return this.state.addingMovie;
  },
  toggleAdd() {
    this.setState({'addingMovie': !this.state.addingMovie});
  },
  resetFields() {
    return this.setState(this.getInitialState());
  },
  handleChange(key) {
    return function (e) {
      let state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  },
  addMovie(e){
    e.preventDefault();
    let newMovie = _.pick(this.state, ['thumbnail', 'title', 'genre', 'actors', 'year', 'rating']);
    let validationFailed = (_.reduce(newMovie, (res, v, k)=>{
      if(res || this.props.getValidationState(this.state, k)==='error'){
        return true;
      }
      return res;
    }, false));
    if(validationFailed){ return false; }
    newMovie['actors'] = newMovie['actors'].split(',');
    newMovie['genre'] = newMovie['genre'].split(',');
    this.props.addMovie(newMovie);
    this.resetFields();
  },
  render: function() {
    return <div className="add-movie text-center">
      {(this.isAdding())?
        <form onSubmit={this.addMovie}>
            <table className="table">
              <tbody>
                <tr>
                  <td><MovieFieldInput state={this.state} handleChange={this.handleChange} getValidationState={this.props.getValidationState} type="thumbnail" label="Thumbnail Url" /></td>
                  <td><MovieFieldInput state={this.state} handleChange={this.handleChange} getValidationState={this.props.getValidationState} type="title" label="Title" /></td>
                  <td><MovieFieldInput state={this.state} handleChange={this.handleChange} getValidationState={this.props.getValidationState} type="genre" label="Genre" /></td>
                  <td><MovieFieldInput state={this.state} handleChange={this.handleChange} getValidationState={this.props.getValidationState} type="actors" label="Actors" /></td>
                  <td><MovieFieldInput state={this.state} handleChange={this.handleChange} getValidationState={this.props.getValidationState} type="year" label="Year" /></td>
                  <td><MovieFieldInput state={this.state} handleChange={this.handleChange} getValidationState={this.props.getValidationState} type="rating" label="Rating" /></td>
                  <td style={{verticalAlign:'middle'}}>
                    <Button type="submit" bsStyle="success" bsSize="xsmall"><FontAwesome name='plus' /></Button>
                    <Button bsStyle="danger" bsSize="xsmall"><FontAwesome name='minus' onClick={() => this.resetFields()} /></Button>
                  </td>
                </tr>
              </tbody>
            </table>
        </form>
        :<Button bsStyle="primary" onClick={() => this.toggleAdd()}><FontAwesome name='plus' /> Add Movie</Button>
      }
    </div>;
  }
});