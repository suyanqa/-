import React, { useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
import View from '../../compontent/view/view';
import DisplayTraveller from '../../compontent/DisPlayTraveller/disPlayTraveller';
import './index.css';
import Navbar from '../../compontent/Navbar/navbar';
import { useQuery, gql } from '@apollo/client';

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

const LIST_TRAVELLERS_QUERY = gql`
  query ListTravellers {
    listTravellers {
      _id
      key
      name
      phone
      seatStatus
      seatNumber
      date
    }
  }
`;

const Home = () => {
  const [travellers, setTravellers] = useState([]);
  const [visible, setVisible] = useState(true);

  // 使用 useQuery 钩子执行 GraphQL 查询
  const { loading, error, data } = useQuery(LIST_TRAVELLERS_QUERY);

  useEffect(() => {
    if (data) {
      const formattedTravellers = data.listTravellers.map(traveller => {
        const formattedDate = formatDate(traveller.date);
        return { ...traveller, date: formattedDate, key: traveller._id }; 
      });
      setTravellers(formattedTravellers);
    }
  }, [data]);

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :( {error.message}</div>;

  const recomposeVisible = () => {
    setVisible(!visible);
  };

  const setData = (travellers) => {
    setTravellers(travellers)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ textAlign: 'center', lineHeight: '120px', color: '#fff', backgroundColor: '#1677ff' }}>Sider</Sider>
      <Layout>
        <Header style={{ textAlign: 'center', color: '#fff', height: '10vh', lineHeight: '64px', backgroundColor: '#4096ff' }}>
          <Navbar onVisibleChange={recomposeVisible} data={travellers} setData={setData}/>
        </Header>
        <Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', padding: 0, backgroundColor: '#0958d9' }}>
          <DisplayTraveller travellers={travellers} visible={visible} recomposeVisible={recomposeVisible} setData={setData}/>
          <Title style={{ textAlign: 'center', lineHeight: '120px', color: '#fff', backgroundColor: '#1677ff' }} level={2}>Train seat reservation status</Title>
          <View traveller={travellers} setTraveller={setData}/>
        </Content>
        <Footer style={{ textAlign: 'center', color: '#fff', backgroundColor: '#4096ff' }}>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;