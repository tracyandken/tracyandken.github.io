var get_start = (function () {
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

    // Click button update db
    $('input:button').click(function(){
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
            alert(`和${name}說一聲好棒喲！`);
        }
        $('#applyForm')[0].reset();
    });



    // get and display data
    function _getData() {
        db.ref(`/accounts/Queen`).on('value', function (snapshot) {
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
        db.ref(`/accounts/罐罐`).on('value', function (snapshot) {
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
        cmtCnt1.innerHTML = len;
        wishCnt1.innerHTML = parseInt(len/6);
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
        cmtCnt2.innerHTML = len;
        wishCnt2.innerHTML = parseInt(len/6);
    }

    // time
    function _DateTimezone(offset) {
        d = new Date();
        utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        return new Date(utc + (3600000 * offset)).toLocaleString();
    }

    function init() {
        _getData();
    }

    return {
        init
    }

})();