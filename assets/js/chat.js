var chats = `<li class="list-group-item">罐罐：嗨！</li>`;
var content = ``;

var get_start = (function () {

    function init() {
        _getData();
    }

    return {
        init
    }

})();

function _getData() {
    allChats.innerHTML = chats;
}

function getContent()
{
    content = $('#chatInput').val();
    chats += `<li class="list-group-item">Queen：${content}</li>`
    //`<li class="list-group-item"><div style="float:right;">Queen：${content}</div></li>`;
    $('#applyForm')[0].reset();
    chats += `<li class="list-group-item">罐罐：早點睡覺啦XD 晚安！</li>`
    _getData()
}