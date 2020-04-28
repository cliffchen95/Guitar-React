import React, { Component } from 'react';
import GuitarList from '../GuitarList';
import GuitarNewForm from '../GuitarNewForm';

export default class GuitarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guitars: [],
      newGuitar: false
    }
  }

  componentDidMount() {
    this.getGuitar();
  }
  // get guitar list
  getGuitar = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/';
      const res = await fetch(url);
      const json = await res.json();
      this.setState({ guitars: json.data });
    } catch (err) {
      console.log(err);
    }
  }

  // submit new guitar info
  addGuitar = async (newGuitar) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGuitar)
      });
      const json = await res.json();
      if (json.status == 201) {
        this.setState({ guitars: [...this.state.guitars, newGuitar ]})
      }

    } catch (err) {
      console.log(err)
    }
  }

  // delete guitar
  deleteGuitar = async (guitarId) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/' + guitarId;
      const res = await fetch(url, { method: 'DELETE' });
      const json = await res.json();
      if (json.status == 200) {
        this.setState({
          guitars: this.state.guitars.filter( guitar => guitar.id !== guitarId)
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log("here is states in container")
    console.log(this.state)
    return (
      <React.Fragment>
        <h2>Guitars!!</h2>
        { this.state.newGuitar 
          ? <GuitarNewForm addGuitar={this.addGuitar} /> 
          : <button onClick={ () => this.setState({ newGuitar: true }) }>New Guitar</button>
        }
        <GuitarList 
          guitars={this.state.guitars} 
          onDelete={this.deleteGuitar}
        />
      </React.Fragment>
    )
  }
}