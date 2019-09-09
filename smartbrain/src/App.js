import React, {Component} from 'react';
import axios from 'axios';
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
// const API_KEY = process.env.REACT_APP_FACE_KEY;

const app = new Clarifai.App({
  apiKey: "301e652be2f441eab13c4cf835c97cf1"
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

const defaultState = {
  loading: false,
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  signedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = defaultState;
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

  onImageSubmit = () => {
    this.setState({ imageUrl: this.state.input, loading: true })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      this.setState({ loading: false })
      this.displayFaceBox(this.calculateFaceLocation(response));
      axios.put('https://afternoon-inlet-30408.herokuapp.com/image', { id: this.state.user.id })
        .then(res => this.setState({ user: { ...this.state.user, entries: res.data }}))
        .catch(console.error)
    })
    .catch(err => console.log('something went wrong'));
  }

  onRouteChange = (route) => {
    route === 'home' ? this.setState({signedIn: true}) : this.setState(defaultState);
    this.setState({route});
  }

  updateUser = (user) => {
    this.setState({ user });
  }

  render() {
    const {signedIn, route, box, imageUrl, user, loading} = this.state;
    return (
      <div className="App">
        <Navigation signedIn={signedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' ?
        <div>
          <Particles className='particles'
            params={particlesOptions} />
          <Logo />
          <Rank name={ user.name } entries={ user.entries } />
          <ImageLinkForm
          onInput={this.onInputChange}
          onButtonSubmit={this.onImageSubmit}/>
          <FaceRecognition loading={ loading } box={box} imageUrl={imageUrl}/>
        </div> :
        (
          route === 'signin' ?

          <div>
            <Logo />
            <Signin updateUser={this.updateUser} onRouteChange={this.onRouteChange}/>
          </div> :

          <div>
            <Logo />
            <Register updateUser={this.updateUser} onRouteChange={this.onRouteChange} />
          </div>
        )


}
      </div>
    );
  }
}

export default App;
