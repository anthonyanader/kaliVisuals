import React from 'react';

import { connect } from 'react-redux';

import { Grid } from 'semantic-ui-react';

import './App.css';

import SidePanel from './SidePanel/SidePanel';
import Dashboard from './Dashboard/Dashboard';

const App = ({ currentUser }) => (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
        <SidePanel currentUser={ currentUser } />

        <Grid.Column style={{ marginLeft: 260 }}>
            <Dashboard />
        </Grid.Column>
    </Grid>
)

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App);
