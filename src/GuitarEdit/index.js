import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

export default class GuitarNewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      price: props.price,
      isElectric: props.isElectric,
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })
  toggle = () => this.setState((prevState) => ({ isElectric: !prevState.isElectric }))

  onSubmit = (e) => {
    e.preventDefault();
    const guitar = {
      name: this.state.name,
      price: this.state.price,
      is_electric: this.state.isElectric
    }
    this.props.onEdit(guitar, this.props.id);
    this.setState({
      name: "",
      price: "",
      isElectric: false
    })
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Name:</label>
          <input
            name='name' 
            placeholder='Name'
            value={this.state.name}
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Price:</label>
          <input
            name='price'
            placeholder='Price'
            value={this.state.price}
            onChange={this.onChange} 
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            name='isElectric' 
            label='is electric'
            onChange = {this.toggle}
            checked = {this.state.isElectric}
          />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}