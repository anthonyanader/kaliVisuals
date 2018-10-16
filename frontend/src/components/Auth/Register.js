import React from 'react';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';
import { Grid, Form, Segment, Button, Header, Message, Icon }from 'semantic-ui-react';

class Register extends React.Component{
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
            console.log(createdUser)
        })
        .catch(err => {
            console.error(err)
        })
    }

    render(){
        const {
            username,
            email,
            password,
            passwordConfirmation 
        } = this.state;

        return(
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="blue" textAlign="center">
                        <Icon name="chart pie" color="blue" />
                        Register for Kali-Visuals
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment raised>
                        <Form.Input 
                            fluid name="username" 
                            iconPosition="left" 
                            icon="user"
                            placeholder="Username" 
                            onChange={this.handleChange} 
                            type="text"
                            value={username} />

                            <Form.Input 
                            fluid name="email" 
                            iconPosition="left" 
                            icon="mail"
                            placeholder="Email" 
                            onChange={this.handleChange} 
                            type="email"
                            value={email} />

                            <Form.Input 
                            fluid name="password" 
                            iconPosition="left" 
                            icon="lock"
                            placeholder="Password" 
                            onChange={this.handleChange} 
                            type="password"
                            value={password} />

                            <Form.Input
                            fluid name="passwordConfirmation" 
                            iconPosition="left" 
                            icon="repeat"
                            placeholder="Password Confirmation" 
                            onChange={this.handleChange} 
                            type="password"
                            value={passwordConfirmation} />

                            <Button 
                            color="blue" 
                            fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    <Message>Already a user? <Link to="/login">Login</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;