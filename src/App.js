import React from 'react';
import axios from 'axios';
import { Col, Row, Card } from 'react-bootstrap';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      species: '',
      petData: [],
      showPets: false,
      showImages: false,
      images: []
    }
  }

  handleInput = e => this.setState({ species: e.target.value });

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

  handleImageType = e => this.setState({ imageType: e.target.value });

  getImageInfo = async e => {
    e.preventDefault();

    let url = `${process.env.REACT_APP_SERVER_URL}/images?imageType=${this.state.imageType}`
    let pictureResults = await axios.get(url)

    console.log(pictureResults.data)
    this.setState({
      images: pictureResults.data,
      showImages: true
    })
  }

  render() {
    console.log(this.state);
    // this.src = pic.urls.regular;
    // this.alt = pic.alt_description;
    // this.description = pic.description;
    // this.photographer = pic.user.name;


    let imageCards = this.state.images.map((pic, idx) => (
      <Col>
        <Card>
          <Card.Img variant="top" src={pic.src} alt={pic.alt} />
          <Card.Body>
            <Card.Title>Photo By: {pic.photographer}</Card.Title>
            <Card.Text>{pic.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))

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

        <form onSubmit={this.getImageInfo}>
          <label>Show Images
            <input type="text" onInput={this.handleImageType} />
          </label>
          <button>Show. Me. The. Pics!</button>
        </form>

        <Row xs={1} sm={2} md={3} lg={4} >
          {imageCards}
        </Row>

      </>
    );
  }
}

export default App;
