import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            loginError: false
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignin = () => {
        const { signInPassword, signInEmail } = this.state;
        axios.post('http://localhost:3000/signin', {
            email: signInEmail,
            password: signInPassword
          })
          .then(res => {
              if(res.data.id) {
                  this.props.updateUser(res.data);
                  this.props.onRouteChange('home');
              } else {
                  this.setState({ loginError: true });
                  console.log("User not auth");
              }
          })
          .catch(this.setState({ loginError: true }));
    }
    render() {
        const {onRouteChange} = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        { this.state.loginError ? <p className="red b" >Oops! Incorrect login</p> : null}
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={this.onPasswordChange}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                        <input
                            onClick={this.onSubmitSignin}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                        />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )

    }

}

export default Signin;