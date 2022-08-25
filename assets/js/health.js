var lineChartData = {
    labels: ["1", "3", "5", "7", "9", "11", "13", "15", "17", "19", "21", "23", "25", "27", "29"], //顯示區間名稱
    datasets: [{
        label: 'Queen', // tootip 出現的名稱
        lineTension: 0, // 曲線的彎度，設0 表示直線
        backgroundColor: "#29b288",
        borderColor: "#29b288",
        borderWidth: 2,
        data: [62, 62, 61, 60, 61, 59, 58, 56, 55], // 資料
        fill: false, // 是否填滿色彩
    }, {
        label: '罐罐',
        lineTension: 0,
        fill: false,
        backgroundColor: "#272727",
        borderColor: "#272727",
        borderWidth: 2,
        data: [64, 64, 63, 64, 63, 62, 61, 60, 60],
    },]
};

function drawLineCanvas(ctx,data) {
    window.myLine = new Chart(ctx, {  //先建立一個 chart
        type: 'line', // 型態
        data: data,
        options: {
                responsive: true,
                legend: { //是否要顯示圖示
                    display: true,
                },
                tooltips: { //是否要顯示 tooltip
                    enabled: true
                },
                scales: {  //是否要顯示 x、y 軸
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            suggestedMin: 50,
                            suggestedMax: 70,
                            stepSize: 1
                        }
                    }]
                },
            }
    });
};