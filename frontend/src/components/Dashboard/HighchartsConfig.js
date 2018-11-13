export default (data) => {
    return {
        title: {
            text: 'Sentiment Analysis'
        },
        
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        credits: false,
        
        plotOptions: {
            series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
            }
        },
        
        series: data,
        
        responsive: {
            rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
                }
            }
            }]
        }
    }

}