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
        var name = $('#floatingInput').val(),
            event = $('#floatingEvent').val();
        if (name != "" && event != "") {
            var accounts = [];
            db.ref(`/accounts`).on('value', function (snapshot) {
                snapshot.forEach(child => {
                    accounts.push(child.key);
                });
            });
            
            db.ref(`/accounts/${name}`).push(event);
            alert(`和${name}說一聲好棒喲！`);
            
        }
        $('#applyForm')[0].reset();
    });



    // get and display data
    function _getData() {
        db.ref(`/accounts/Queen`).on('value', function (snapshot) {
            var accounts = [];
            snapshot.forEach(child => {
                accounts.push(child.key);
            });
            
            if (accounts) {
                _createPageStr(accounts.length, accounts);
            }
        });
    }

    // update to page
    function _createPageStr(len, names) {
        var str = `<div class="container row" style="text-align: left;">
                   <ul class="list-group">
                   <li class="list-group-item border border-dark content"><b>好寶寶紀錄</b></li>
                   `;
        for (let i = 0; i < len; i++) {
            str += `
                <li class="list-group-item">${names[i]}</li>
                `;
        }
        str += `</ul></div>`
        allComments.innerHTML = str;
        cmtCnt.innerHTML = len;
    }

    function init() {
        _getData();
    }

    return {
        init
    }

})();