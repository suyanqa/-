import React, { useEffect } from 'react';
import { Button, Form, Input, Modal, Radio } from 'antd';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

// GraphQL mutation
const ADD_TRAVELLER_MUTATION = gql`
  mutation AddTraveller($ticket: AddTicket!) {
    addTraveller(ticket: $ticket) {
      _id
      name
      phone
      seatStatus
      seatNumber
      date
      blacklist
    }
  }
`;

const AddTraveller = ({ data, showModal, setSm,setData}) => {
  const [form] = Form.useForm();
  const [addTraveller, { loading }] = useMutation(ADD_TRAVELLER_MUTATION);

  const handleCloseModal = () => {
    setSm(false); // 修改父组件的Modal渲染状态
  };

  const handleAddTraveller = async () => {
    // 获取表单的输入值
    const values = await form.validateFields();
  
    // 计算新旅客的 key
    const newKey = data.length > 0 ? Math.max(...data.map(item => item.key)) + 1 : 0;
  
    // 构建新旅客对象
    const newItem = {
      name: values.name,
      phone: values.phone,
      seatStatus: values.seatStatus,
      seatNumber: values.seatNumber,
      date: values.date,
    };
  
    console.log(newItem);
  
    // 使用扩展运算符更新 data 数组
    setData(data => [...data, newItem]);  // 这样不会直接修改原数组
    
    // 关闭模态框
    handleCloseModal();
  
    try {
      // 调用 GraphQL mutation 将新旅客数据发送到后端
      await addTraveller({
        variables: {
          ticket: newItem,
        },
      });
    } catch (error) {
      console.error('Error adding traveler:', error);
    }
  };
  

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };


  return (
    <Modal
      title="Add Traveller"
      open={showModal}
      onCancel={handleCloseModal}
      footer={[
        <Button key="close" onClick={handleCloseModal}>
          Close
        </Button>,
        <Button key="add" loading={loading} onClick={handleAddTraveller}>
          Add
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the traveler's name." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: "Please enter the traveler's phone." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="seatStatus"
          label="Seat Status"
          rules={[{ required: true, message: "Please enter the traveler's seat status." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="seatNumber"
          label="Seat Number"
          rules={[{ required: true, message: "Please enter the traveler's seat number." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please enter the traveler's date." }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTraveller;
