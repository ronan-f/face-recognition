import React, {Component} from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo';
import Signin from './components/singin/Signin';
import Register from './components/register/Register'
import Rank from './components/rank/rank'
import ImageLinkForm from './components/imagelinkform/imageLinkForm'
import Particles from 'react-particles-js';
import FaceRecognition from './components/faceRecognition/FaceRecognition'
import 'tachyons';
import Clarifai from 'clarifai';
import axios from 'axios';
const API_KEY = process.env.REACT_APP_FACE_KEY;

const app = new Clarifai.App({
  apiKey: API_KEY
 });

//  axios.get('http://localhost:3000/')
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })

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
      box: {},
      route: 'signin',
      signedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return({
      leftColumn: clarifaiBox.left_col * width,
      topRow: clarifaiBox.top_row * height,
      rightColumn: width - (clarifaiBox.right_col * width),
      bottomRow: height - (clarifaiBox.bottom_row * height)
    })
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log('something went wrong'));
  }

  onRouteChange = (route) => {
    route === 'home' ? this.setState({signedIn: true}) : this.setState({signedIn: false});
    this.setState({route});
  }

  render() {
    const {signedIn, route, box, imageUrl} = this.state;
    return (
      <div className="App">
        <Navigation signedIn={signedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' ?
        <div>
          <Particles className='particles'
            params={particlesOptions} />
          <Logo />
          <Rank />
          <ImageLinkForm
          onInput={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div> :
        (
          route === 'signin' ?

          <div>
            <Logo />
            <Signin onRouteChange={this.onRouteChange}/>
          </div> :

          <div>
            <Logo />
            <Register onRouteChange={this.onRouteChange} />
          </div>
        )


}
      </div>
    );
  }
}

export default App;
