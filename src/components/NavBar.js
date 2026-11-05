import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const navClass = ({ isActive }) =>
        isActive ? 'nav-link active' : 'nav-link';

    return (
        <nav className="navbar">
        <NavLink to="/" end className={navClass}>
            Trang chủ
        </NavLink>
        <NavLink to="/questions" className={navClass}>
            Ngân hàng câu hỏi
        </NavLink>
        <NavLink to="/history" className={navClass}>
            Lịch sử
        </NavLink>
        </nav>
    );
};

export default NavBar;
