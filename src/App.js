import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      species: '',
      petData: [],
      showPets: false
    }
  }

  handleInput = e => this.setState({ species: e.target.value});

  handleSubmit = async e => {
    e.preventDefault();

    // console.log('button clicked');
    // route  to hit:  http://localhost:3002/pets?species=dog
    let url = `${process.env.REACT_APP_SERVER_URL}/pets?species=${this.state.species}`
    let petResults = await axios.get(url)
    console.log(petResults.data);
    this.setState({
      showPets: true,
      petData: petResults.data
    })
  }

  render() {
    console.log(this.state);
    return (
      <>
        <h1>Pets</h1>

        <form onSubmit={this.handleSubmit}>
          <label>enter a pet species(dog, cat, fish)
            <input type="text" onInput={this.handleInput} />
          </label>
          <button>ClickMe</button>
        </form>

        {
          this.state.showPets &&
          this.state.petData.map(pet => <h3>{pet.name}</h3>)
        }
      </>
    );
  }
}

export default App;
