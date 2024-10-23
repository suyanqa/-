const fs = require('fs'); // 导入文件系统模块
const express = require('express'); // 导入Express框架模块
const { ApolloServer, UserInputError } = require('apollo-server-express'); // 导入Apollo Server模块
const { GraphQLScalarType } = require('graphql'); // 导入GraphQL标量类型模块
const { Kind } = require('graphql/language'); // 导入GraphQL语言模块中的Kind类型
const { MongoClient,ObjectId } = require('mongodb'); // 导入MongoDB客户端模块

let db; // 变量，指向实际的数据库。

async function listTravellers() {
    try {
        const collection = db.collection('Data');
    
        // 读取集合中的所有文档
        const travellers = await collection.find().toArray();
        
        // 映射MongoDB文档的 _id 字段为 GraphQL 的 id 字段，并处理日期字段
        return travellers.map(traveller => ({
          _id: traveller._id.toString(),  // MongoDB ObjectId 转换为字符串
          key: traveller.key,
          name: traveller.name,
          phone: traveller.phone,
          seatStatus: traveller.seatStatus,
          seatNumber: traveller.seatNumber,
          date: traveller.date ? new Date(traveller.date) : null,  // 转换为 Date 对象
          blacklist:traveller.blacklist
        }));
    } catch (err) {
        console.error('Error reading travellers from database:', err);
        throw new UserInputError('Failed to read travellers from database');
    }
}

async function addTraveller(_, { ticket }) {
  try {
    const collection = db.collection('Data');  // 获取 MongoDB 集合

    const result = await collection.insertOne(ticket);  // 插入数据
    const insertedTraveller = result.ops[0];  // 获取插入的文档

    return {
      _id: insertedTraveller._id.toString(),
      ...insertedTraveller,
    };
  } catch (error) {
    console.error('Error adding traveler:', error);
    throw new UserInputError('Failed to add traveler');
  }
}
 

// 下面的函数定义了一个有效的日期GraphQL标量。
// Serialize用于以字符串格式返回日期。
// ParseValue用于将所有作为输入JS变量提供的输入值进行转换。
// ParseLiteral用于将所有在Int、String等中的输入值转换为GraphQL理解的类似JSON的形式。
const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'GraphQL中的Date()类型作为一个标量',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    console.log(value)
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

async function deleteTraveller(_, { _id }) {
  try {
    const collection = db.collection('Data');

    const objectId = new ObjectId(_id);

    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      return true;  // 删除成功返回 true
    } else {
      console.log(`Traveller with _id: ${_id} not found`);
      return false;  // 如果未找到该旅客，返回 false
    }
  } catch (error) {
    console.error('Error deleting traveller:', error);
    throw new UserInputError('Failed to delete traveller');
  }
}

const changeStatus = async (_, { _id, seatStatus }) => {
  try {
    const collection = db.collection('Data');

    const objectId = new ObjectId(_id); // 转换为 ObjectId

    const result = await collection.updateOne(
      { _id: objectId },  // 查找条件
      { $set: { seatStatus: seatStatus } }  // 更新字段
    );

    if (result.modifiedCount === 1) {
      return true;  // 更新成功返回 true
    } else {
      return false;  // 未找到该旅客返回 false
    }
  } catch (error) {
    console.error('Error updating traveller:', error);
    throw new UserInputError('Failed to update traveller');
  }
};


const resolvers = {
  Query: {
    listTravellers,
  },
  Mutation: {
    addTraveller,
    deleteTraveller,
    changeStatus,
  },
  GraphQLDate,
};

const app = express();
app.use(express.static('public'));

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/travellerschema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error); // 打印错误
    return error;
  },
});


server.applyMiddleware({ app, path: '/graphql' }); // 将Apollo Server中间件应用到Express应用

async function connectToDb() {
  const url = process.env.MONGO_URL || 'mongodb://localhost:27017/tickettoride'; // 使用环境变量 MONGO_URL
  const client = new MongoClient(url, { useUnifiedTopology: true }); // 创建MongoDB客户端
  await client.connect(); // 连接到数据库
  console.log('Connected to MongoDB at', url); // 打印连接信息
  db = client.db(); // 将数据库实例赋值给db变量
}


(async function () {
  try {
    await connectToDb(); // 连接到数据库
    app.listen(3001, function () { // 启动Express应用并监听3001端口
      console.log('\n🚀 Server ready at http://localhost:3001/graphql'); // 打印启动信息
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();