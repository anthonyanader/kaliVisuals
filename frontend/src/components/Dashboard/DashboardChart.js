import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

class DashboardChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                userCallback: function(label) {
                  if (Math.floor(label) === label) {
                    return label;
                  }
                }
              }
            }
          ]
        }
      }
    };
  }

  render() {
    return (
      <Segment>
        <Line
          data={this.props.chartData}
          width={400}
          redraw={true}
          height={175}
          options={this.state.options}
        />
      </Segment>
    );
  }
}
export default DashboardChart;
