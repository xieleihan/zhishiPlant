const mysql = require('mysql2');
const dbconfig = require('./database.js');

// 使用连接池
var pool = mysql.createPool(dbconfig.mysql);

module.exports = {
    query: function (sql) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err); // 处理获取连接错误
                } else {
                    connection.query(sql, function (err, rows) {
                        if (err) {
                            reject(err); // 查询执行错误
                        } else {
                            resolve(rows); // 查询成功
                        }
                        connection.release(); // 释放连接
                    });
                }
            });
        });
    }
};
