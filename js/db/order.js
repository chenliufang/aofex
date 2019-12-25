DB.update('create table order_info(_id integer primary key autoincrement,timeStr text)');
var ORDER = {
    save: function (timeStr) {
        DB.update("insert into order_info(timeStr) values(?)", [timeStr]);
    },

    queryAll: function (callback) {
        return DB.query("select * from order_info", [], callback);
    }


};