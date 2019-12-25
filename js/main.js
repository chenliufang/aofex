var data = [];
var url = "https://bird.ioliu.cn/v2?url=https://option.aofex.com/webApi/scene/getResultList?timeId=1&pairId=1&pageNo=1&pageSize=40";
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

var audio = new Audio("abc.mp3");
function play() {
    try{
        audio.play();
    }catch (e){
        addMsg("播放音乐失败："+ JSON.stringify(e));
    }

}

function addMsg(msg) {
    msg += "<br>";
    $("#result").append(msg);
}
