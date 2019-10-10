import React from 'react';

import { connect } from 'react-redux';

import { Grid } from 'semantic-ui-react';

import './App.css';

import SidePanel from './SidePanel/SidePanel';
import Dashboard from './Dashboard/Dashboard';

const App = ({ currentUser, currentTag }) => (
  <Grid columns='equal' className='app' style={{ background: '#eee' }}>
    <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser} />

    <Grid.Column style={{ marginLeft: 260 }}>
      <Dashboard
        key={currentTag && currentTag.tagId}
        currentTag={currentTag}
        currentUser={currentUser}
      />
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentTag: state.tags.selectedTag
});

export default connect(mapStateToProps)(App);
