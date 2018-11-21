import React from 'react';

import moment from 'moment';
import firebase from '../../firebase';

import DashboardHeader from './DashboardHeader';
import DashboardChart from './DashboardChart';
import DashboardOptions from './DashboardOptions';

class Dashboard extends React.Component {
    state = {
        user: this.props.currentUser,
        currentTag: this.props.currentTag,
        monitoredTagsRef: firebase.database().ref('monitoredTags'),
        sentimentLoading: true,
        sentimentBucket: []
    }

    componentDidMount() {
        
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
                <DashboardChart />
                <DashboardOptions 
                    currentTag={currentTag}
                />
            </React.Fragment>
        )
    }

}

export default Dashboard;