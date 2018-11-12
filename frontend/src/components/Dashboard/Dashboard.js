import React from 'react';

import moment from 'moment';

import DashboardHeader from './DashboardHeader';

class Dashboard extends React.Component {
    state = {
        currentTag: this.props.currentTag
    }

    displayTagName = tag => tag ? `#${tag.tagName}` : '';
    
    timeFromNow = timestamp => moment(timestamp).fromNow();
    
    displayAddedTime = tag => tag ?`Added ${this.timeFromNow(tag.monitorStartDate)}` : '';

    render() {
        const { currentTag } = this.state;
        
        return (
            <React.Fragment>
                <DashboardHeader 
                    tagName={this.displayTagName(currentTag)} 
                    added={this.displayAddedTime(currentTag)}
                />
            </React.Fragment>
        )
    }

}

export default Dashboard;