/*
 * 使用mongo shell运行。对于远程数据库，确保在命令行中提供了
 * 连接字符串。例如：
 * 本地主机:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

db.travellers.remove({}); // 清空travellers集合
db.blacklist.remove({}); // 清空blacklist集合

/*Q1. 在这里添加代码以添加初始的旅行者列表。
 * 创建一个带有必要字段的旅行者列表。
 * 将旅行者列表输入到名为'travellers'的DB集合中。
 * */


/*Q1代码结束*/

const count = db.travellers.count(); // 计算travellers集合中的文档数量
print('Inserted', count, 'Travellers'); // 打印插入的旅行者数量

// 下面的_id只是一个占位符。下面的集合实际上只有一行和一列。我们可以用任何名字来表示，但我们称之为fixedindex。
db.counters.remove({ _id: 'fixedindex' }); // 移除counters集合中的fixedindex文档
db.counters.insert({ _id: 'fixedindex', current: count }); // 插入或更新counters集合中的fixedindex文档

db.travellers.createIndex({ id: 1 }, { unique: true }); // 为travellers集合的id字段创建唯一索引
db.travellers.createIndex({ name: 1 }); // 为name字段创建索引
db.travellers.createIndex({ phone: 1 }); // 为phone字段创建索引
db.travellers.createIndex({ bookingTime: 1 }); // 为bookingTime字段创建索引