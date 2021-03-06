import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            emailAddress: "",
            password: "",
            registerError: false
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onRegister = () => {
        const { name, emailAddress, password } = this.state;
        axios.post('https://afternoon-inlet-30408.herokuapp.com/register', {
            name,
            email: emailAddress,
            password
          })
          .then(user => {
              if(user.data) {
                this.props.updateUser(user.data);
                this.props.onRouteChange('home');
              } else {
                  this.setState({ registerError: true })
                  console.error("Couldn't register user");
              }
          })
          .catch(e => { if(e) this.setState({ registerError: true }) })
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        { this.state.registerError ? <p className="red b" >Oops! Invalid submission</p> : null}
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input onChange={ this.handleInput } className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="emailAddress">Email</label>
                            <input onChange={ this.handleInput } className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="emailAddress"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={ this.handleInput } className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                        </fieldset>
                        <div className="">
                        <input
                            onClick={ this.onRegister }
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Register"
                        />
                        </div>
                    </div>
                </main>
            </article>
        )

    }
}

export default Register;