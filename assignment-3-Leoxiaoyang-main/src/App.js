// App.js
import React from 'react';
import { ApolloProvider } from '@apollo/client';  // 从 @apollo/client 导入
import client from './applloClient/applloClient.js';  // 确保路径拼写正确
import Home from './pages/Home/home.jsx';
import RouterConf from './utils/RouterConf/RouterConf';

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterConf>
        <Home client={client}/>
      </RouterConf>
    </ApolloProvider>
  );
}

export default App;
