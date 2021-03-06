import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment
} from 'semantic-ui-react';

import firebase from '../../firebase';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: [],
      loading: false
    };
  }

  displayErrors = errors =>
    errors.map((error, key) => <p key={key}>{error.message}</p>);

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });

      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedUser => {
          console.log(signedUser);
        })
        .catch(err => {
          console.log(err);
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

  isFormValid = ({ email, password }) => email && password;

  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <Grid
        data-test='component-login'
        textAlign='center'
        verticalAlign='middle'
        className='app'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' icon color='violet' textAlign='center'>
            <Icon name='pie chart' color='violet' />
            Login to Kali Visuals
          </Header>
          <Form onSubmit={this.handleSubmit} size='large'>
            <Segment raised>
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
            Don't have an account? <Link to='/register'>Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
