import React, { Component } from 'react';
import firebase from '../../firebase';

import { Dropdown, Grid, Header, Image } from 'semantic-ui-react';

class UserPanel extends Component {
  state = {
    user: this.props.currentUser
  };

  dropdownOptions = () => [
    {
      key: 'user',
      text: (
        <span>
          Signed in as <strong>{this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: 'avatar',
      text: <span>Change Avatar</span>
    },
    {
      key: 'signout',
      text: <span onClick={this.handleSignOut}>Sign Out</span>
    }
  ];

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Signed Out');
      });
  };
  render() {
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            {/* App Header */}
            <Header inverted floated='left' as='h1'>
              <Header.Content>Kali Visuals</Header.Content>
            </Header>
          </Grid.Row>
          {/* User Dropdown */}
          <Header style={{ padding: '0.25em' }} as='h4' inverted>
            <Dropdown
              trigger={
                <span>
                  <Image src={this.state.user.photoURL} spaced='right' avatar />
                  {this.state.user.displayName}
                </span>
              }
              options={this.dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
