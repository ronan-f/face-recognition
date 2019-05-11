import React, {Component} from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import Rank from './components/rank/rank'
import ImageLinkForm from './components/imagelinkform/imageLinkForm'
import Particles from 'react-particles-js';
import FaceRecognition from './components/faceRecognition/FaceRecognition'
import 'tachyons';
import Clarifai from 'clarifai';
const API_KEY = process.env.REACT_APP_FACE_KEY;

const app = new Clarifai.App({
  apiKey: API_KEY
 });

const particlesOptions = {
  particles: {
    number: {
      value: 300,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ['#1E1818']
    },
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {

  }

  onInputChange = (event) => {
      this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.calculateFaceLocation(response))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Particles className='particles'
            params={particlesOptions}
          />
        <Logo />
        <Rank />
        <ImageLinkForm
        onInput={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
