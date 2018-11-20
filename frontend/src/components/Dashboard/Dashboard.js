import React from 'react';

import moment from 'moment';
import ReactHighcharts from 'react-highcharts';

import { Segment } from 'semantic-ui-react';

import firebase from '../../firebase'
import DashboardHeader from './DashboardHeader';
import HighchartsConfig from './HighchartsConfig';

class Dashboard extends React.Component {
    state = {
        user: this.props.currentUser,
        currentTag: this.props.currentTag,
        monitoredTagsRef: firebase.database().ref('monitoredTags'),
        sentimentLoading: true,
        sentimentBucket: []
    }

    componentDidMount() {
        const { currentTag, user } = this.state;

        if(currentTag && user) {
            this.addListeners(currentTag.tagId);
        }
    }

    displayTagName = tag => tag ? `#${tag.tagName}` : '';
    
    timeFromNow = timestamp => moment(timestamp).fromNow();
    
    displayAddedTime = tag => tag ?`Added ${this.timeFromNow(tag.monitorStartDate)}` : '';

    addListeners = tagId => {
        this.addTagListener(tagId)
    }

    addTagListener = tagId => {
        let loadedSentiments = [];
        this.state.monitoredTagsRef.child(tagId).child('sentimentBucket').on('child_added', snapshot => {
            loadedSentiments.push(snapshot.val())
            this.setState({
                sentimentBucket: loadedSentiments,
                sentimentLoading: false
            })
        })
    }

   prepareChartData = sentimentBucketArray => {
        let sentimentScore = [];
        
        sentimentBucketArray.length > 0 && 
        sentimentBucketArray.map((sentiment, index) => (
            sentimentScore.push({
                name: `Day ${index + 1}`,
                data:[sentiment.sentimentScore]
            })
        ));
        return sentimentScore;
   }
    

    render() {
        const { currentTag, sentimentBucket } = this.state;
        return (
            <React.Fragment>
                <DashboardHeader 
                    tagName={this.displayTagName(currentTag)} 
                    added={this.displayAddedTime(currentTag)}
                />
                <Segment>
                    <ReactHighcharts config={HighchartsConfig(this.prepareChartData(sentimentBucket))}/>
                </Segment>
            </React.Fragment>
        )
    }

}

export default Dashboard;