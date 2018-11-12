import React from 'react';

import { Header, Segment, Icon } from 'semantic-ui-react';

class DashboardHeader extends React.Component {
    render() {
        const { tagName, added } = this.props;

        return (
            <Segment clearing>
                <Header fluid="true" as="h2" floated="left" style={{marginBottom: 0 }}>
                    <span>
                        <Icon name="tag" />
                        {tagName}
                    </span>
                    <Header.Subheader>
                        {added}
                    </Header.Subheader>    
                </Header>
            </Segment>
        )
    }
}

export default DashboardHeader;