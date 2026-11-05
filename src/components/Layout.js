import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => (
    <div className="app-container">
        <NavBar />
        <main className="main-content">
        {loading ? (
            <p className="status-message">Đang tải câu hỏi...</p>
        ) : error ? (
            <p className="status-message error-text">{error}</p>
        ) : (
            <Outlet />
        )}
        </main>
    </div>
);

export default Layout;
