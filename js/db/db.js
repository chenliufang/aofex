var DB = {
    db: openDatabase('aofex', '1.0', 'Test DB', 20 * 1024 * 1024),
    update: function (sql, arr) {
        this.db.transaction(function (tx) {
            if (!arr) {
                arr = [];
            }
            try {
                tx.executeSql(sql, arr);
            } catch (e) {
                alert(JSON.stringify(e));
            }
        })
    },
    query: function (sql, arr, callback) {
        this.db.transaction(function (tx) {
            if (!arr) {
                arr = [];
            }
            tx.executeSql(sql, arr, function (tx, results) {
                var result = [];
                var len = results.rows.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        result.push(results.rows.item(i));
                    }
                }
                callback(result);
            });
        })
    }
};


function resultAsTable(rows) {
    var result = "";
    if (!!rows && rows.length > 0) {
        for (var i = 0, length = rows.length; i < length; i++) {
            var item = rows[i];
            if (i == 0) {
                result += "<tr>";
                for (var p in item) {
                    result += "<th>" + p + "</th>";
                }
                result += "</tr>";
            }
            result += "<tr>";
            for (var p2 in item) {
                result += "<td>" + item[p2] + "</td>";
            }
            result += "</tr>";
        }
    }
    return result;
}


