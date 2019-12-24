
var myChart = echarts.init(document.getElementById('chart'));

var upColor = '#00da3c';
var downColor = '#ec0000';
var kLineData;
var lastData;

function splitData(rawData) {
    var candles = JSON.parse(rawData).result.data;
    var categoryData = [];
    var values = [];
    var volumes = [];
    for (var i = candles.length - 1; i >= 0; i--) {
        var item = candles[i];
        categoryData.push(getLocalTime(item["openDate"]));
        var dataArr = [];
        dataArr.push(item["open"]);
        dataArr.push(item["close"]);
        dataArr.push(item["low"]);
        dataArr.push(item["high"]);
        values.push(dataArr);
    }

    kLineData = {
        categoryData: categoryData,
        values: values
    };
}

function req(url) {
    $.get(url, function (rawData) {
        splitData(rawData);
    });
}


function showKLine() {
    if (!kLineData || kLineData.categoryData.length == 0) {
        return;
    }

    myChart.setOption(option = {
        backgroundColor: 'gray',
        animation: false,
        legend: {
            bottom: 10,
            left: 'center',
            data: ['BTC-5M', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            backgroundColor: 'rgba(245, 245, 245, 0.8)',
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                color: '#000'
            },
            position: function (pos, params, el, elRect, size) {
                var obj = {top: 10};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                return obj;
            }
            // extraCssText: 'width: 170px'
        },
        axisPointer: {
            link: {xAxisIndex: 'all'},
            label: {
                backgroundColor: '#777'
            }
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: false
                },
                brush: {
                    type: ['lineX', 'clear']
                }
            }
        },
        brush: {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {
                colorAlpha: 0.1
            }
        },
        visualMap: {
            show: false,
            seriesIndex: 5,
            dimension: 2,
            pieces: [{
                value: 1,
                color: downColor
            }, {
                value: -1,
                color: upColor
            }]
        },
        grid: [
            {
                left: '10%',
                right: '8%',
                height: '65%'
            }
        ],
        xAxis: [
            {
                type: 'category',
                data: kLineData.categoryData.concat(lastData.categoryData),
                scale: true,
                boundaryGap: false,
                axisLine: {onZero: false},
                splitLine: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
                axisPointer: {
                    z: 100
                }
            }
        ],
        yAxis: [
            {
                scale: true,
                splitLine: {show: false}
            }
        ],
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0],
                start: 70,
                end: 100
            },
            {
                show: true,
                xAxisIndex: [0],
                type: 'slider',
                top: '85%',
                start: 70,
                end: 100
            }
        ],
        series: [
            {
                name: 'BTC-5M',
                type: 'candlestick',
                data: kLineData.values.concat(lastData.values),
                itemStyle: {
                    normal: {
                        color: upColor,
                        color0: downColor,
                        borderColor: null,
                        borderColor0: null
                    }
                },
                tooltip: {
                    formatter: function (param) {
                        param = param[0];
                        return [
                            'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                            '高: ' + param.data[3] + '<br/>',
                            '低: ' + param.data[2] + '<br/>',
                            '开: ' + param.data[0] + '<br/>',
                            '收: ' + param.data[1] + '<br/>'
                        ].join('');
                    }
                }
            }
        ]
    }, true);

}
