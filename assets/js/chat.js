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
    if (content != "" && content != null)
    {
        chats += `
            <div class="chat-message-right pb-4">
                <div>
                    <img src="assets/img/tracy.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                    <div class="font-weight-bold mb-1">Queen</div>
                    ${content}
                </div>
            </div>
            `
        $('#applyForm')[0].reset();
        _getData()
        if(content.includes("test"))
        {
            setTimeout(function (){response(content)}, 2000);
        }
        else
        {
            setTimeout(function (){response(random())}, 2000);
        }
    }
}

function response(content)
{
    if(content.includes("test"))
    {
        call_jieba_cut(content, function (result) {
            chats += `
                    <div class="chat-message-left pb-4">
                        <div>
                            <img src="assets/img/ken.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
                            </div>
                        <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                            <div class="font-weight-bold mb-1">罐罐</div>
                            ${result}
                        </div>
                    </div>
                `
        _getData()
        });
    }
    else
    {
        chats += `
        <div class="chat-message-left pb-4">
            <div>
                <img src="assets/img/ken.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
                </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                <div class="font-weight-bold mb-1">罐罐</div>
                ${content}
            </div>
        </div>
    `
        _getData()
    }
}

function random()
{
    var list = ["寶貝期末周要結束啦，我們去台南約會囉！",
                "窩要努力開發窩自己！！！！！",
                "週五來去士林夜市約會吧！",
                "妳很努力很優秀哦，給妳愛的鼓勵~！",
                "為妳唱這首歌~沒有什麼風格~它僅僅代表著~我希望妳快樂~",
                "In software engineering, dependency injection is a design pattern in which an object receives other objects that it depends on. A form of inversion of control, dependency injection aims to separate the concerns of constructing objects and using them, leading to loosely coupled programs. The pattern ensures that an object which wants to use a given service should not have to know how to construct those services. Instead, the receiving object (or 'client') is provided with its dependencies by external code (an 'injector'), which it is not aware of."]
    return list[getRandomInt(6)];
}

function getRandomInt(max)
{
    return Math.floor(Math.random() * max);
}
