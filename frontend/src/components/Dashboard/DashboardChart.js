import React from 'react';
import {Line} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

import { Segment } from 'semantic-ui-react';

class DashboardChart extends React.Component {
    render(){
        return(
            <Segment>
                <Line
                    data={this.props.chartData}
                    width={400}
                    redraw={true}
                    height={175}
                    options={{}}
                />
            </Segment>
        )    
    }       
}
export default DashboardChart;
