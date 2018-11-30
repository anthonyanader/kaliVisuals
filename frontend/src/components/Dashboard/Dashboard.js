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
        sentimentBucket: [],
        chartData: {},
    }

    componentWillMount() {
        const { currentTag, user } = this.state;

        if(currentTag && user) {
            this.fetchTagSentimentData(currentTag.tagId);
        }

    }

    componentDidMount(){
        const { sentimentBucket } = this.state;
        
        if(sentimentBucket.length > 0){
            this.prepareChartData();
        }
    }

    componentWillUnmount() {
        // this.removeListeners();
    }


    removeListeners = () => {
        this.state.monitoredTagsRef.off();
    }

    fetchTagSentimentData = tagId => {
        let loadedSentiments = [];

        this.state.monitoredTagsRef.child(tagId).child('sentimentBucket').once('value', snapshot => {
            snapshot.forEach(tag => {
                loadedSentiments.push(tag.val());
            })
            
            this.setState({
                sentimentBucket: loadedSentiments,
                sentimentLoading: false
            });
        })
    }

    prepareChartData = () => {
        const { sentimentBucket } = this.state;

        const dailyScore = [];
        const labels = [];
        
        sentimentBucket.forEach((sentiment, index) => {
            dailyScore.push(sentiment.sentimentScore);
            labels.push(`Day ${index + 1}`);
        });
        
        this.setState({
            chartData: {
                labels: labels,
                datasets:[{
                    data: dailyScore,
                    label: "Twitter Sentiment Score",
                    borderColor: "#2AA3F0"
                }]
            }
        });
        
    } 

    displayTagName = tag => tag ? `#${tag.tagName}` : '';
    
    timeFromNow = timestamp => moment(timestamp).fromNow();
    
    displayAddedTime = tag => tag ?`Added ${this.timeFromNow(tag.monitorStartDate)}` : '';
    
    render() {
        const { currentTag} = this.state;

        return (
            <React.Fragment>
                <DashboardHeader 
                    tagName={this.displayTagName(currentTag)} 
                    added={this.displayAddedTime(currentTag)}
                />
                <DashboardChart chartData={this.state.chartData} />
                <DashboardOptions 
                    currentTag={currentTag}
                />
            </React.Fragment>
        )
    }

}

export default Dashboard;