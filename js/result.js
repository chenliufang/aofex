function viewResult() {
    var htmlObj = $.ajax({"url": url, "async": false, timeout: 5000});
    var resp = JSON.parse(htmlObj.responseText);
    var list = resp.result.list;
    data = [];
    var html = '<div  class ="bar">';
    var preFlag;
    for (var i = list.length - 1; i >= 0; i--) {
        var obj = list[i];
        var flag = obj.upOrDown;
        var title = obj.endTimeStr;
        data.push(flag);
        if (i == list.length - 1) {
            preFlag = flag
        } else if (flag != preFlag) {
            preFlag = flag;
            html += '</div><div  class ="bar">';
        }
        switch (flag) {
            case 4:
                html += '<div class="triangle" title="' + title + '"></div>';
                break;
            case 2:
                html += '<div class="fall cycle"  title="' + title + '"></div>';
                break;
            case 1:
                html += '<div class="raise cycle"  title="' + title + '"></div>';
                break;
        }
    }
    $("#show").html(html);
}