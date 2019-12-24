//WSS
var ws;

function createWs() {
    ws = new WebSocket(wssURL);
    ws.onopen = function (evt) {
        try {
            addMsg("ws连接成功");
            req(klineUrl150);
            viewResult();
        } catch (e) {
            createWs();
        }
    };
    ws.onmessage = function (event) {
        var data = JSON.parse(event.data).data;
        var categoryData = [];
        categoryData.push(getLocalTime(data["openDate"]));
        var dataArr = [];
        var values = [];
        dataArr.push(data["open"]);
        dataArr.push(data["close"]);
        dataArr.push(data["low"]);
        dataArr.push(data["high"]);
        values.push(dataArr);
        lastData = {categoryData: categoryData, values: values};
        showKLine();
    };

    //[【于指定连接关闭后的回调函数。】
    ws.onclose = function (evt) {
        addMsg("ws连接断开！");
        createWs();
    };


    ws.onerror = function (event) {
        addMsg("ws出错！");
        createWs();
    };
}
