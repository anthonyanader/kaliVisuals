export default (seriesData) => {
    return {
        chart: {
            type: 'column',
            animation: {
                duration: 2000
              }
        },
        title: {
            text: 'Sentiment Analysis'
        },
        yAxis: {
            title:{
                text: 'Sentiment Score'
            },
        },
        credits: {
            enabled: false
        },
        series: seriesData,

    }
}