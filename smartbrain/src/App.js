import React, {Component} from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import Rank from './components/rank/rank'
import ImageLinkForm from './components/imagelinkform/imageLinkForm'
import Particles from 'react-particles-js';
import 'tachyons';

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
      input: ''
    }
  }

  onInputChange = (event) => {
      console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('button clicked');
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
      </div>
    );
  }
}

export default App;
