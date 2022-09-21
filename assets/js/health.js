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
        drawInfo();
    }

    return {
        init
    }

})();

function drawInfo() {
    db.ref(`/points/Queen/exp`).once('value').then((snapshot) => {
        var trapcyExp = snapshot.val();
        db.ref(`/points/罐罐/exp`).once('value').then((snapshot) => {
            var kenExp = snapshot.val();
            outputInfo(trapcyExp, kenExp);
        });
    });
}

function outputInfo(trapcyExp, kenExp) {
    var trapcyData = gnenrateInfo("trapcy女俠", trapcyExp, "bg-success");
    var kenData = gnenrateInfo("罐罐少俠", kenExp, "");
    trapcyInfo.innerHTML = trapcyData;
    kenInfo.innerHTML = kenData;
}

function gnenrateInfo(name, exp, color) {
    if (exp < 100)
    {
        var nowExp = `${exp}/100`;
        exp = (exp/100)*100;
        var degree = parseInt(exp/10)+1;
        var status = "練氣";
    }
    else if(exp < 200)
    {
        var nowExp = `${exp}/200`;
        exp -= 100;
        exp = (exp/200)*100;
        var degree = parseInt(exp/10)+1;
        var status = "築基";
    }
    else if(exp < 400)
    {
        var nowExp = `${exp}/400`;
        exp -= 200;
        exp = (exp/400)*100;
        var degree = parseInt(exp/10)+1;
        var status = "金丹";
    }
    else if(exp < 800)
    {
        var nowExp = `${exp}/800`;
        exp -= 400;
        exp = (exp/800)*100;
        var degree = parseInt(exp/10)+1;
        var status = "元嬰";
    }

    var info = `
    <div class="card-body">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${name}</li>
            <li class="list-group-item">${status}境第${degree}層</li>
            <li class="list-group-item">${nowExp}</li>
            <li class="list-group-item">
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated ${color}" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${exp}%"></div>
                </div>
            </li>
        </ul>
    </div>`;
    return info;
}

function updateInfo() {

}

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
            backgroundColor: "#0072E3",
            borderColor: "#0072E3",
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
                            suggestedMin: 55,
                            suggestedMax: 64,
                            stepSize: 0.5
                        }
                    }]
                },
            }
    });
};

function updateHealth() {
    var name = $('#name').val();
    var weight = $('#weight').val();
    var addExp = 0;
    if(document.getElementById('bf').checked) addExp += 1;
    if(document.getElementById('lunch').checked) addExp += 1;
    if(document.getElementById('dinner').checked) addExp += 1;
    if(document.getElementById('snack').checked) addExp -= 1;
    if(document.getElementById('workout').checked) addExp += 2;

    alert(`修練成功！你感受到真氣在經脈流轉！經驗值增加${addExp}`);

    db.ref(`/points/${name}/weight`).once('value').then((snapshot) => {
        var nowValue = snapshot.val();
        if(document.getElementById('weightCheck').checked)
        {
            db.ref(`/points/${name}/weight`).set(nowValue+=`, ${weight}`);
        }
    });
    db.ref(`/points/${name}/exp`).once('value').then((snapshot) => {
        var nowValue = snapshot.val();
        db.ref(`/points/${name}/exp`).set(nowValue+=addExp);
    });
    updateData();
    location.reload();
};