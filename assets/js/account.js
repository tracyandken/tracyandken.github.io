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

    // get and display data
    function _getData() {
        db.ref(`/accounts/Queen`).once('value').then((snapshot) => {
            var data = snapshot.val();
            if (data) {
                var events = [];
                var times = [];
                var len = 0;

                for (let key in data) {
                    events.push(data[key].event);
                    times.push(data[key].time);
                    len ++;
                }
                _createPageStr1(len, "Queen", events, times);
            }
        });
        db.ref(`/accounts/罐罐`).once('value').then((snapshot) => {
            var data = snapshot.val();
            if (data) {
                var events = [];
                var times = [];
                var len = 0;

                for (let key in data) {
                    events.push(data[key].event);
                    times.push(data[key].time);
                    len ++;
                }
                _createPageStr2(len, "罐罐", events, times);
            }
        });
    }

    // update to page
    function _createPageStr1(len, name, events, times) {
        var str = `
        <p>
            <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample">
            好寶寶${name}的紀錄
            </a>
        </p>

        <div class="collapse" id="collapseExample1" style="text-align: left;">
                   <ul class="list-group">
                   <li class="list-group-item border border-dark content"><b>好寶寶${name}的紀錄</b></li>
                   `;
        for (let i = 0; i < len; i++) {
            str += `
                <li class="list-group-item">${events[i]}<div style="float:right;">${times[i]}</div></li>
                `;
        }
        str += `</ul></div>`
        allComment1.innerHTML = str;
        db.ref(`/points/${name}/bravos`).once('value').then((snapshot) => {
            var nowValue = snapshot.val();
            cmtCnt1.innerHTML = nowValue;
        });
        db.ref(`/points/${name}/wish`).once('value').then((snapshot) => {
            var nowValue = snapshot.val();
            wishCnt1.innerHTML = nowValue;
        });
    }

    // update to page
    function _createPageStr2(len, name, events, times) {
        var str = `
        <p>
            <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample">
            好寶寶${name}的紀錄
            </a>
        </p>
        
        <div class="collapse" id="collapseExample2" style="text-align: left;">
                   <ul class="list-group">
                   <li class="list-group-item border border-dark content"><b>好寶寶${name}的紀錄</b></li>
                   `;
        for (let i = 0; i < len; i++) {
            str += `
                <li class="list-group-item">${events[i]}<div style="float:right;">${times[i]}</div></li>
                `;
        }
        str += `</ul></div>`
        allComment2.innerHTML = str;
        db.ref(`/points/${name}/bravos`).once('value').then((snapshot) => {
            var nowValue = snapshot.val();
            cmtCnt2.innerHTML = nowValue;
        });
        db.ref(`/points/${name}/wish`).once('value').then((snapshot) => {
            var nowValue = snapshot.val();
            wishCnt2.innerHTML = nowValue;
        });
    }

    function init() {
        _getData();
    }

    return {
        init
    }

})();

// Redeem 1
function redeem1()
{
    db.ref(`/accounts/Queen`).once('value').then((snapshot) => {
        var value = prompt("想要許什麼願~?");
        if (value != "" && value != null) {
            alert(`想${value}嘛？ 罐罐遵命！`);
            db.ref(`/accounts/Queen`).push({
            event: "Queen的願望：" + value,
            time: _DateTimezone(8)
            });
            db.ref(`/points/Queen/wish`).once('value').then((snapshot) => {
                var nowValue = snapshot.val();
                db.ref(`/points/Queen/wish`).set(nowValue-1);
            });
        }
    });

}

// Redeem 2
function redeem2()
{
    db.ref(`/accounts/罐罐`).once('value').then((snapshot) => {
        var value = prompt("想要許什麼願~?");
        if (value != "" && value != null) {
            alert(`想${value}嘛？ Queen遵命！`);
            db.ref(`/accounts/罐罐`).push({
            event: "罐罐的願望：" + value,
            time: _DateTimezone(8)
            });
            db.ref(`/points/罐罐/wish`).once('value').then((snapshot) => {
                var nowValue = snapshot.val();
                db.ref(`/points/罐罐/wish`).set(nowValue-1);
            });
        }
    });

}

function addPoint()
{
    // Click button update db
    var name, 
        event = $('#floatingEvent').val();
    if(document.getElementById('floatingInput1').checked) {
        name = $('#floatingInput1').val();
    }else if(document.getElementById('floatingInput2').checked) {
        name = $('#floatingInput2').val();
    }
    
    if (name != "" && event != "") {
        db.ref(`/accounts/${name}`).push({
            event: event,
            time: _DateTimezone(8)
        });
        db.ref(`/points/${name}/bravos`).once('value').then((snapshot) => {
            var nowValue = snapshot.val();
            db.ref(`/points/${name}/bravos`).set(nowValue+1);
        });
        alert(`和${name}說一聲好棒喲！`);
    }
    $('#applyForm')[0].reset();
}

// time
function _DateTimezone(offset)
{
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset)).toLocaleString();
}