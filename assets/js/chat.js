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
    var list = ["排序、日曆、健康督促表、還有罐罐機器人，加班！加班！我要加班！",
                "妳笑起來真的很好看，所以我想讓妳一直一直都開開心心",
                "士林>>>文山>>>然後用大餐結束暑假這回合嘿嘿！",
                "窩要把妳送上天國之門，用力撞開門的那種 >0<",
                "去基隆還有高雄的路上小心喲~",
                "我也愛妳"]
    return list[getRandomInt(6)];
}

function getRandomInt(max)
{
    return Math.floor(Math.random() * max);
}
