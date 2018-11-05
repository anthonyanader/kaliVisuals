import React from 'react';

import { Header, Segment, Icon } from 'semantic-ui-react';

class DashboardHeader extends React.Component {
    render() {
        return (
            <Segment clearing>
                <Header fluid="true" as="h2" floated="left" style={{marginBottom: 0 }}>
                    <span>
                        <Icon name="tag" />
                        Tag
                    </span>
                    <Header.Subheader>20 Days Remaining</Header.Subheader>    
                </Header>
            </Segment>
        )
    }
}

export default DashboardHeader;