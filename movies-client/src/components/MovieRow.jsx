import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import {Button} from'react-bootstrap';
import Highlight from 'react-highlighter';
import FontAwesome from 'react-fontawesome';
import MovieFieldInput from './MovieFieldInput';

export default createReactClass({
  getInitialState() {
    return {
      editingMovie: false,
      id: this.props.movie.get('id'),
      thumbnail: this.props.movie.get('thumbnail'),
      title: this.props.movie.get('title'),
      genre: this.props.movie.get('genre').toJS(),
      actors: this.props.movie.get('actors').toJS(),
      year: this.props.movie.get('year'),
      rating: this.props.movie.get('rating')
    }
  },
  toggleEdit(bool) {
    if(!bool){ return this.setState(this.getInitialState()); }
    this.setState({'editingMovie': bool});
  },
  handleChange(key) {
    return function (e) {
      let state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  },
  editMovie(e) {
    e.preventDefault();
    let updatedMovie = _.pick(this.state, ['thumbnail', 'title', 'genre', 'actors', 'year', 'rating']);
    let validationFailed = (_.reduce(updatedMovie, (res, v, k)=>{
      if(res || this.props.getValidationState(this.state, k)==='error'){
        return true;
      }
      return res;
    }, false));
    if(validationFailed){ return false; }
    updatedMovie['id'] = this.state.id;
    updatedMovie['actors'] = Array.isArray(updatedMovie['actors'])?updatedMovie['actors']:updatedMovie['actors'].split(',');
    updatedMovie['genre'] = Array.isArray(updatedMovie['genre'])?updatedMovie['genre']:updatedMovie['genre'].split(',');
    this.props.updateMovie(updatedMovie);
    this.toggleEdit(false);
  },
  removeMovie() {
    this.props.removeMovie(this.state);
  },
  render: function() {
    return <tr>
      <td className="thumbnail-container">{(this.state.editingMovie) ?
        <MovieFieldInput state={this.state} handleChange={this.handleChange} getValidationState={this.props.getValidationState} value={this.state.thumbnail} type="thumbnail" label="Thumbnail Url" /> :
        <img src={this.props.movie.get('thumbnail')} alt={this.props.movie.get('title')} />}
      </td>
      <td>{(this.state.editingMovie)?
        <MovieFieldInput state={this.state} handleChange={this.handleChange} getValidationState={this.props.getValidationState} value={this.state.title} type="title" label="Title" /> :
        <Highlight search={this.props.searchTerm}>{this.props.movie.get('title')}</Highlight>}
      </td>
      <td>{(this.state.editingMovie)?
        <MovieFieldInput state={this.state} handleChange={this.handleChange} getValidationState={this.props.getValidationState} value={this.state.genre} type="genre" label="Genre" /> :
        <Highlight search={this.props.searchTerm}>{this.props.movie.get('genre').join(', ')}</Highlight>}
      </td>
      <td>{(this.state.editingMovie)?
        <MovieFieldInput state={this.state} handleChange={this.handleChange} getValidationState={this.props.getValidationState} value={this.state.actors} type="actors" label="Actors" /> :
        <Highlight search={this.props.searchTerm}>{this.props.movie.get('actors').join(', ')}</Highlight>}
      </td>
      <td>{(this.state.editingMovie)?
        <MovieFieldInput state={this.state} handleChange={this.handleChange} getValidationState={this.props.getValidationState} value={this.state.year} type="year" label="Year" /> :
        this.props.movie.get('year')}
      </td>
      <td>{(this.state.editingMovie)?
        <MovieFieldInput state={this.state} handleChange={this.handleChange} getValidationState={this.props.getValidationState} value={this.state.rating} type="rating" label="Rating" /> :
        this.props.movie.get('rating')}/10
      </td>
      <td>
        {this.state.editingMovie ? null : <Button className="edit-button" bsStyle="primary" bsSize="small" onClick={() => this.toggleEdit(true)}><FontAwesome name='pencil' /> Edit</Button>}
        {this.state.editingMovie ? null : <Button className="delete-button" bsStyle="danger" bsSize="small" onClick={this.removeMovie}><FontAwesome name='trash' /> Delete</Button>}
        {this.state.editingMovie ? <Button className="update-button" bsStyle="success" bsSize="small" onClick={this.editMovie}><FontAwesome name='pencil' /> Update</Button> : null}
        {this.state.editingMovie ? <Button className="cancel-button" bsStyle="danger" bsSize="small" onClick={() => this.toggleEdit(false)}><FontAwesome name='times' /> Cancel</Button> : null}
      </td>
    </tr>
  }
});