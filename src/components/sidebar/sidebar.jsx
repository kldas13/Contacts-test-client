// import '../node_modules/react-toastify/dist/ReactToastify.css'
import '../../../node_modules/react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'
import React, { useContext, useState } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import "./sidebar.css"
import { toast } from 'react-toastify';
import { ContactContext } from '../Context/ContactContext';
toast.configure();

export default function Sidebar() {
    const { setcontactdata } = useContext(ContactContext)
    const navigate = useNavigate();
    const [selstyle, setselstyle] = useState({ dashboard: true, contact: true })
    return (
        <div id='sidebar-wrap'>
            <div id='logo'>
                Logo
            </div>
            <div className='Sidebar-options' id={selstyle.dashboard ? "dashboard-cont" : "dashboard-cont-select"} onClick={() => { setselstyle({ ...selstyle, dashboard: false, contact: true }) }}>
                <img src="/dashboard.png" alt="dashboard" /><span>Dashboard</span>
            </div>
            <div className='Sidebar-options' id={selstyle.contact ? "contact-cont" : "contact-cont-select"} onClick={() => { setselstyle({ ...selstyle, contact: false, dashboard: true }) }}>
                <img src="/vector.png" alt="contact" /><span>Total contacts </span>
            </div>
            <div id='logout'>
                <img src="/logout.png" alt="logout" /><span onClick={() => {
                    window.localStorage.removeItem('jwt');
                    window.localStorage.removeItem('user_name');
                    sessionStorage.clear();
                    localStorage.clear();
                    setcontactdata([])
                    navigate('/');
                    toast.success("Logged Out", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }}>Logout</span>
            </div>
        </div>
    )
}
