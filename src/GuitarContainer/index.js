import React, { Component } from 'react';
import GuitarList from '../GuitarList';

export default class GuitarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { guitars: [] }
  }

  componentDidMount() {
    this.getGuitar();
  }
  getGuitar = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/';
      console.log(url)
      const res = await fetch(url);
      const json = await res.json();
      this.setState({ guitars: json.data });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    console.log("here is states in container")
    console.log(this.state)
    return (
      <React.Fragment>
        <h2>Guitars!!</h2>
        <GuitarList guitars={this.state.guitars} />
      </React.Fragment>
    )
  }
}