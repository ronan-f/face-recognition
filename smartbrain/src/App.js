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

const app = new Clarifai.App({
  apiKey: '2c417064a9c24d7bbef96facc3c2d388'
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
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
      console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.COLOR_MODEL, "https://samples.clarifai.com/face-det.jpg").then(
      function(response) {
        console.log(response);
      },
      function(err) {
        // there was an error
      }
    );
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
