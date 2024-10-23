import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/Home/home";

const RouterConf = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home />} />
        {/* 如果你想要处理不存在的路由，可以使用以下 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);

export default RouterConf;