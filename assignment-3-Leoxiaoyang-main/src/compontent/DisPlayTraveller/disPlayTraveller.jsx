import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Modal } from 'antd';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Item from 'antd/es/list/Item';

/** recomposeVisible 函数控制disPlayTraveller组件的显示与隐藏
 *   visible 读取父组件属性确定是否渲染
 *  travellers 数据为home组件定义的
 * */

const DELETE_TRAVELLER = gql`
    mutation deleteTraveller($_id: String!) {
        deleteTraveller(_id: $_id)
    }
`;


const DisplayTraveller = ({ visible, travellers,setData,recomposeVisible }) => {
    const [selectedRecord, setSelectedRecord] = useState(null); // 存储被选中的记录
    const [isDeleting, setIsDeleting] = useState(false); // 控制是否正在删除的状态
    const [deleteTraveller] = useMutation(DELETE_TRAVELLER)

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'seatStatus',
            dataIndex: 'seatStatus',
            key: 'seatStatus',
            render: status => (
                <Badge status={status === 'Not Reserved' ? 'error' : 'success'} text={status} />
            ),
        },
        {
            title: 'seatNumber',
            dataIndex: 'seatNumber',
            key: 'seatNumber',
        },
        {
            title: 'date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'action',
            key: 'action',
            render: (_, record) => (
                <Button type="danger" onClick={() => handleDelete(record)}>
                    delete
                </Button>
            ),
        },
    ];

    const handleDelete = (record) => {
        setSelectedRecord(record); // 存储被选中的记录
        setIsDeleting(true); // 显示确认对话框
    };

    const handleConfirm = async () => {
        try {
            await deleteTraveller({
                variables: {
                    _id: selectedRecord._id // 确保这里传递的是记录的 _id
                }
            });
            // 过滤掉被删除的旅客信息
            let newData = travellers.filter(item => item._id !== selectedRecord._id);
            console.log(travellers, "\n", newData);
            setData(newData); 
        } catch (error) {
            console.log("Error deleting traveller: ", error);
        }
        console.log("visible:", visible, "travellers", travellers, "recomposeVisible", recomposeVisible, "setData", setData);
        handleClose();
    };

    const handleClose = () => {
        setSelectedRecord(null);  // 重置选中记录
        setIsDeleting(false);  // 关闭确认对话框
    };


    return (
        <>
            {visible && (
                <Table columns={columns} dataSource={travellers} rowKey="key" />
            )}
            {isDeleting && selectedRecord && (
                <Modal
                    title="Confirm deletion"
                    visible
                    onOk={handleConfirm}
                    onCancel={handleClose}
                    okText="notarize"
                    cancelText="close"
                >
                Are you sure you want to delete this traveler?
                </Modal>
            )}
            <Button type="primary" onClick={() => recomposeVisible(visible)}>
                {visible ? 'Hiding' : 'Displaying'} traveler information
            </Button>
        </>
    );
};

export default DisplayTraveller;