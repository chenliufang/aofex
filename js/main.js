var data = [];
var url = "https://bird.ioliu.cn/v2?url=https://option.aofex.com/webApi/scene/getResultList?timeId=1&pairId=1&pageNo=1&pageSize=30";
var klineUrl150 = "https://bird.ioliu.cn/v2?url=https://option.aofex.com/webApi/scene/getKline?symbol=BTC/USDT&period=5min&size=100";
var wssURL = "wss://option.aofex.com/websocket/optionKline/BTC-USDT/5min";

function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}


String.prototype.endWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substring(this.length - s.length) == s)
        return true;
    else
        return false;
};
String.prototype.startWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substr(0, s.length) == s)
        return true;
    else
        return false;
};


function play() {
    try {
        var src = $('#abcFrame').attr('src');
        if(!src){
            src = "abc.mp3";
        }
        $('#abcFrame').attr('src',src );
    } catch (e) {
        addMsg("播放音乐失败：" + JSON.stringify(e));
    }

}

function addMsg(msg) {
    msg += "<br>";
    $("#result").append(msg);
}
