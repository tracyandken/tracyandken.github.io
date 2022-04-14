var chats = ``;
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
    var objDiv = document.getElementById("scrollDown");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function getContent()
{
    content = $('#chatInput').val();
    chats += `
            <div class="chat-message-right pb-4">
                <div>
                    <img src="https://bootdey.com/img/Content/avatar/avatar8.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
                    <div class="text-muted small text-nowrap mt-2">2:33 am</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                    <div class="font-weight-bold mb-1">Queen</div>
                    ${content}
                </div>
            </div>
            `
    $('#applyForm')[0].reset();
    _getData()
    setTimeout(function (){response(random())}, 2000);
}

function response(content)
{
    chats += `
                <div class="chat-message-left pb-4">
                    <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
                        <div class="text-muted small text-nowrap mt-2">${_DateTimezone(8)}</div>
                    </div>
                    <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                        <div class="font-weight-bold mb-1">罐罐</div>
                        ${content}
                    </div>
                </div>
            `
    _getData()
}

function random()
{
    var list = ["好啦快點去睡覺！",
                "最喜歡妳囉！",
                "我覺得這個現場很讚，快看看~ https://www.youtube.com/watch?v=j49CRvEGXOc",
                "妳是大魅魔！",
                "輕輕的~嚐一口~妳說的~愛我~",
                "星期六來約會吧！"]
    return list[getRandomInt(6)];
}

function getRandomInt(max)
{
    return Math.floor(Math.random() * max);
}

// time
function _DateTimezone(offset)
{
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var date = new Date(utc + (3600000 * offset)).toLocaleTimeString();
    if (date.includes("上午"))
    {
        date = date.substring(2, 7);
        date += ` am`;
    }
    else
    {
        date = date.substring(2, 7);
        date += ` pm`;
    }
    return date;
}