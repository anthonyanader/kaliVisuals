import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../../firebase';
import uuid from 'uuid/v1';

import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment
} from 'semantic-ui-react';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: [],
      loading: false,
      usersRef: firebase.database().ref('users')
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${uuid(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log('user saved');
              });
            })
            .catch(err => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              });
            });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? 'error'
      : '';
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: 'Please fill in all fields' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: 'Password must be at least 6 characters and match' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    }
    return true;
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;

    return (
      <Grid
        data-test='component-register'
        textAlign='center'
        verticalAlign='middle'
        className='app'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' icon color='violet' textAlign='center'>
            <Icon name='chart pie' color='violet' />
            Register for Kali-Visuals
          </Header>
          <Form onSubmit={this.handleSubmit} size='large'>
            <Segment raised>
              <Form.Input
                fluid
                name='username'
                iconPosition='left'
                icon='user'
                placeholder='Username'
                onChange={this.handleChange}
                type='text'
                className={this.handleInputError(errors, 'username')}
                value={username}
              />

              <Form.Input
                fluid
                name='email'
                iconPosition='left'
                icon='mail'
                placeholder='Email'
                onChange={this.handleChange}
                type='email'
                className={this.handleInputError(errors, 'email')}
                value={email}
              />

              <Form.Input
                fluid
                name='password'
                iconPosition='left'
                icon='lock'
                placeholder='Password'
                onChange={this.handleChange}
                type='password'
                className={this.handleInputError(errors, 'password')}
                value={password}
              />

              <Form.Input
                fluid
                name='passwordConfirmation'
                iconPosition='left'
                icon='repeat'
                placeholder='Password Confirmation'
                onChange={this.handleChange}
                type='password'
                className={this.handleInputError(errors, 'password')}
                value={passwordConfirmation}
              />

              <Button
                disabled={loading}
                className={loading ? 'loading' : ''}
                color='violet'
                fluid
                size='large'
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Already a user? <Link to='/login'>Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
