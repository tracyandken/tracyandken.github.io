// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBItDXZqrN92UgcokiCBdFLL9pfY1Lxlqw",
    authDomain: "tracyandken-8610a.firebaseapp.com",
    projectId: "tracyandken-8610a",
    storageBucket: "tracyandken-8610a.appspot.com",
    messagingSenderId: "223376251660",
    appId: "1:223376251660:web:65a731eb8e9ab9a8ac0729",
    measurementId: "G-Z39MFM2JLG",
    databaseURL: "https://tracyandken-8610a-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

var get_start = (function () {
    
    function init() {
        updateData();
    }

    return {
        init
    }

})();

function updateData() {
    var ctx = document.getElementById("canvas").getContext("2d");
    var kenData = [];
    var queenData = [];
    db.ref(`/points/Queen/weight`).once('value').then((snapshot) => {
        var nowValue = snapshot.val();
        queenData = nowValue.split(',');
        db.ref(`/points/罐罐/weight`).once('value').then((snapshot) => {
            var nowValue = snapshot.val();
            kenData = nowValue.split(',');
            var lineChartData = createLineChartData(queenData, kenData);
            drawLineCanvas(ctx,lineChartData);
        });
    });
}

function createLineChartData(queenData, kenData)
{
    var lineChartData = {
        labels: Array.from(Array(41).keys()), //顯示區間名稱
        datasets: [{
            label: 'trapcy', // tootip 出現的名稱
            lineTension: 0, // 曲線的彎度，設0 表示直線
            backgroundColor: "#29b288",
            borderColor: "#29b288",
            borderWidth: 2,
            data: queenData, // 資料
            fill: false, // 是否填滿色彩
        }, {
            label: '罐罐',
            lineTension: 0,
            fill: false,
            backgroundColor: "#272727",
            borderColor: "#272727",
            borderWidth: 2,
            data: kenData,
        },]
    };
    return lineChartData;
}

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
                            suggestedMax: 65,
                            stepSize: 1
                        }
                    }]
                },
            }
    });
};

function updateHealth() {
    var name = $('#name').val();
    var weight = $('#weight').val();
    db.ref(`/points/${name}/weight`).once('value').then((snapshot) => {
        var nowValue = snapshot.val();
        db.ref(`/points/${name}/weight`).set(nowValue+=`, ${weight}`);
    });
    updateData();
    location.reload();
};