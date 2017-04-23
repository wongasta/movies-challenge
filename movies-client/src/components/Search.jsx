import React from 'react';
import createReactClass from 'create-react-class';
import FontAwesome from 'react-fontawesome';
import {FormControl} from'react-bootstrap';

export default createReactClass({
  render: function() {
    return <div className="search-container">
      <FontAwesome name='search' style={{display:'inline', marginRight: 5, fontSize: 16}} />
      <FormControl componentClass="select" placeholder="Search Area" style={{display:'inline', marginRight: 5, fontSize: 16, width: '20%'}} onChange={this.props.handleSearchChange('searchArea')}>
        <option value="title" default="default">Title</option>
        <option value="genre">Genres</option>
        <option value="actors">Actors</option>
      </FormControl>
      <FormControl className="text-left" type="text" style={{display:'inline', width: '50%'}} value={this.props.searchTerm} placeholder="Type in search terms" onChange={this.props.handleSearchChange('searchTerm')} />
    </div>
  }
});