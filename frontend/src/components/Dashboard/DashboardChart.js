import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

import { Segment } from 'semantic-ui-react';

class DashboardChart extends React.Component {
  state = {
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
