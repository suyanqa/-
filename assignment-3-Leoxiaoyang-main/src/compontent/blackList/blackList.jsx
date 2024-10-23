import React from 'react';
import { Button, Form, Input, Modal, Radio, Select } from 'antd';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

// GraphQL mutation
const ADD_TRAVELLER_MUTATION = gql`
  mutation AddTraveller($ticket: InputTicket!) {
    addTraveller(ticket: $ticket) {
      _id
      key
      name
      phone
      seatStatus
      seatNumber
      date
      blacklist
    }
  }
`;

const BlackList = ({ data, showModal, setSm }) => {
  const [form] = Form.useForm();
  const [addTraveller, { loading }] = useMutation(ADD_TRAVELLER_MUTATION);

  const handleCloseModal = () => {
    setSm(false); // 修改父组件的Modal渲染状态
  };

  const handleAddTraveller = async () => {
    try {
      const values = await form.validateFields();
      const newItem = {
        ...values,
        blacklist: values.blacklist === 'Yes', // Convert string to boolean
      };
  
      await addTraveller({
        variables: {
          ticket: newItem,
        },
      });
      handleCloseModal();
    } catch (error) {
      console.error('Error adding traveler:', error);
    }
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

export default BlackList;