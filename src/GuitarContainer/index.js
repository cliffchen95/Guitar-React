import React, { Component } from 'react';
import GuitarList from '../GuitarList';
import GuitarForm from '../GuitarForm';
import { Button } from 'semantic-ui-react';

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
      if (json.status === 201) {
        this.setState({ 
          guitars: [...this.state.guitars, json.data ],
          newGuitar: false
        })
      }

    } catch (err) {
      console.log(err)
    }
  }
  // show edit form
  editGuitar = (id) => {
    const guitars = this.state.guitars;
    const index = guitars.findIndex( (guitar) => guitar.id == id );
    guitars[index].edit = !guitars[index].edit;
    this.setState({ guitars: guitars })
  }

  // update guitar
  updateGuitar = async (updatedGuitar, guitarId) => {
   try {
      const url = process.env.REACT_APP_API_URL + '/' + guitarId;
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGuitar)
      });
      const json = await res.json();
      this.editGuitar(guitarId);
      if(json.status === 200) {
        const guitars = this.state.guitars;
        const index = guitars.findIndex( (guitar) => guitar.id == guitarId );
        guitars[index] = json.data;
        this.setState({ guitars: guitars });
      }
    } catch (err) {
      console.log(err);
    } 
  }
  // delete guitar
  deleteGuitar = async (guitarId) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/' + guitarId;
      const res = await fetch(url, { method: 'DELETE' });
      const json = await res.json();
      if (json.status === 200) {
        this.setState({
          guitars: this.state.guitars.filter( guitar => guitar.id !== guitarId)
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    console.log("here is states in container")
    console.log(this.state)
    return (
      <React.Fragment>
        <h1 className='ui header'>Welcome to my Guitar API</h1>
        <h2 className='ui header'>Here are some Guitars!!</h2>
        { this.state.newGuitar 
          ? <GuitarForm addGuitar={this.addGuitar} /> 
          : <Button 
              onClick={ () => this.setState({ newGuitar: true }) }
              fluid
            > 
            Put up A New Guitar
            </Button>
        }
        <div className="ui divider"></div>
        <GuitarList 
          guitars={this.state.guitars} 
          onDelete={this.deleteGuitar}
          onEdit={this.editGuitar}
          onSubmit={this.updateGuitar}
        />
      </React.Fragment>
    )
  }
}