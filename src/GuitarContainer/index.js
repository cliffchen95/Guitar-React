import React, { Component } from 'react';

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
      console.log('here is the json')
      console.log(json);

    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <React.Fragment>
        Guitar COntainer 
      </React.Fragment>
    )
  }
}