function upgrade() {
    var date = new Date();
    var minute = date.getMinutes();
    ws.send(date.getTime());
    var upgradeArr = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56];
    if (upgradeArr.indexOf(minute) >= 0) {
        try {
            req(klineUrl150);
            viewResult();
        } catch (e) {
            addMsg("获取数据失败：" + JSON.stringify(e));
        }

    }
    var suggestArr = [3, 8, 13, 18, 23, 28, 33, 38, 43, 48, 53, 58];
    if (suggestArr.indexOf(minute) >= 0) {
        try {
            suggest();
        } catch (e) {
            addMsg("吹号失败：" + JSON.stringify(e));
        }
    }
}

var lastCategory = "";

function suggest() {
    var category = lastData.categoryData[0];
    if (!lastData || category == lastCategory) {
        return;
    }
    var item = lastData.values[0];
    var ratio = (item[1] - item[0]) / item[0];
    var lastChar = 4;
    if (ratio < -0.0003) {
        lastChar = 2;
    } else if (ratio > 0.0003) {
        lastChar = 1;
    }
    var testStr = "";
    for (var i = 0; i < data.length; i++) {
        testStr += data[i];
        if (testStr.length > 20) {
            testStr = testStr.substring(10);
        }
    }
    testStr += lastChar;
    var msg;
    if (testStr.endWith("111")) {
        msg = category + " 连涨行情出现";
        lastCategory = category;
    } else if (testStr.endWith("222")) {
        msg = category + " 连跌行情出现";
        lastCategory = category;
    }
    if (!!msg) {
        play();
        addMsg(msg);
    }
}
