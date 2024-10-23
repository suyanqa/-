import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// 创建 HTTP 链接，指向 GraphQL 后端地址
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// 创建 Apollo Client 实例
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),  // 使用内存缓存优化查询
});

export default client;  
