import React from 'react';
import createReactClass from 'create-react-class';
import {FormGroup, ControlLabel, FormControl} from'react-bootstrap';

export default createReactClass({
  render: function() {
    return <FormGroup controlId={this.props.type+"Input"} validationState={this.props.getValidationState(this.props.state, this.props.type)} >
      <ControlLabel>{this.props.label}</ControlLabel>
      <FormControl className="text-center" type="text" value={this.props.value} placeholder={"Enter "+this.props.type} onChange={this.props.handleChange(this.props.type)} />
      <FormControl.Feedback />
    </FormGroup>
  }
});