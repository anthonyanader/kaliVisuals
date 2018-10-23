import React from 'react';
import { Grid } from 'semantic-ui-react';

import './App.css';

import ColorPanel from './ColorPanel/ColorPanel'
import SidePanel from './SidePanel/SidePanel';
import MetaPanel from './MetaPanel/MetaPanel';
import Dashboard from './Dashboard/Dashboard';

const App = () => (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
        <ColorPanel />
        <SidePanel />

        <Grid.Column style={{ marginLeft: 320 }}>
            <Dashboard />
        </Grid.Column>
        <Grid.Column width={4}>
            <MetaPanel />
        </Grid.Column>
    </Grid>
)

export default App;
