import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Space, Modal, Radio } from 'antd';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

// GraphQL Mutation
const CHANGE_STATUS_MUTATION = gql`
  mutation ChangeStatus($_id: ID!, $seatStatus: String!) {
    changeStatus(_id: $_id, seatStatus: $seatStatus)
  }
`;

const View = ({ traveller, setTraveller }) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制模态框显示状态
  const [selectedTraveller, setSelectedTraveller] = useState(null); // 选中的旅客
  const [unreservedTravellers, setUnreservedTravellers] = useState([]); // 未预订的旅客信息
  const [currentSeat, setCurrentSeat] = useState(null); // 当前选择的座位

  const [changeStatus] = useMutation(CHANGE_STATUS_MUTATION); // 使用 GraphQL Mutation

  const columns = [
    {
      title: 'seatNumber',
      dataIndex: 'seatNumber',
      key: 'seatNumber',
      render: text => <Badge status="success" text={text} />,
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      render: text => (
        <Space>
          {text === 'Reserved' ? (
            <Badge status="success" text={text} />
          ) : (
            <Badge status="error" text={text} />
          )}
        </Space>
      ),
    },
    {
      title: 'action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          disabled={record.status === 'Reserved'}
          onClick={() => handleOpenModal(record)}
        >
          Reserve
        </Button>
      ),
    },
  ];

  // 打开模态框并获取未预订的旅客信息
  const handleOpenModal = (record) => {
    setCurrentSeat(record); // 保存当前座位信息
    const unreserved = traveller.filter(t => t.seatStatus === 'Not Reserved');
    setUnreservedTravellers(unreserved); // 设置未预订旅客
    setIsModalVisible(true); // 打开模态框
  };

  // 确认预订操作
  const handleOk = async () => {
    if (selectedTraveller) {
      try {
        // 调用 GraphQL Mutation 更新座位状态
        await changeStatus({
          variables: {
            _id: selectedTraveller._id,
            seatStatus: 'Reserved',
          },
        });

        // 更新本地状态
        const updatedTravellers = traveller.map(item =>
          item._id === selectedTraveller._id
            ? { ...item, seatStatus: 'Reserved' }
            : item
        );
        console.log(updatedTravellers);
        // setTraveller(updatedTravellers);
      } catch (error) {
        console.error('Failed to update seat status:', error);
      }
    }
    setIsModalVisible(false); // 关闭模态框
  };

  // 取消操作
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 选择旅客时触发
  const onTravellerChange = (e) => {
    setSelectedTraveller(e.target.value); // 保存选中的旅客信息
  };

  useEffect(() => {
    if (Array.isArray(traveller)) {
      const newData = traveller.map(item => ({
        key: item.key,
        seatNumber: item.seatNumber,
        status: item.seatStatus,
      }));
      setData(newData);
    } else {
      console.error('traveller is not an array:', traveller);
    }
  }, [traveller]);

  // 初始化旅客数据
  useEffect(() => {
    if (data && data.listTravellers && Array.isArray(data.listTravellers)) {
      const formattedTravellers = data.listTravellers.map(traveller => {
        const formattedDate = formatDate(traveller.date);
        return { ...traveller, date: formattedDate };
      });
      setTravellers(formattedTravellers);
    }
  }, [data]);

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} size="large" />

      {/* 模态框 */}
      <Modal
        title="Select traveller"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Notarize"
        cancelText="Close"
      >
        <Radio.Group onChange={onTravellerChange} value={selectedTraveller}>
          {unreservedTravellers.map(traveller => (
            <Radio key={traveller.key} value={traveller}>
              {traveller.name} - {traveller.phone}
            </Radio>
          ))}
        </Radio.Group>
      </Modal>
    </>
  );
};

export default View;
