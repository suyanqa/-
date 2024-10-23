import React, {useEffect, useState} from 'react';
import {Menu} from 'antd';
import AddTraveller from "../addTraveller/addTraveller";

const items = [
    {
        label: 'Add Traveller',
        key: 'add',
        icon: <i className="iconfont icon-add" />
    },

];

const Navbar = ({ onVisibleChange,data,setTraveller,setData }) => {
    const [current, setCurrent] = useState('mail');
    const [showModal, setShowModal] = useState(false);

    const onClick = (e) => {
        setCurrent(e.key);
        if (e.key === 'add') {
            onVisibleChange(false);
            setShowModal(true)
        }
    };
    const setSm = (newShowModal) => {
        setShowModal(newShowModal);
    }

    const setDd = () => {
        
    }
    useEffect(() => {
  blacklist: Boolean
        console.log("navbar log: ",data);
    })

    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <AddTraveller data={data} setTraveller={setTraveller} showModal={showModal} setSm={setSm} setData={setData}/>
        </>
    );
};

export default Navbar;