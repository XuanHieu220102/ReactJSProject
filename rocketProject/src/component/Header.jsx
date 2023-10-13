import React from "react";
import { HomeOutlined , LoginOutlined, LogoutOutlined} from "@ant-design/icons";
import { Outlet, Link } from "react-router-dom";
import LoginForm from "./login/Login";

export default function Header() {
    const username = localStorage.getItem('username')
    return (
        <div id="Content-1">
            <div className="sign">
                <p className="welcome">Xin chào, <span className="user-name"> {username}</span></p> 
            </div>
            <div>
                <p className="title-header">WELCOME TO WEBSITE REACTJS</p>
            </div>
            <div className="db">
                <p className="d1"><HomeOutlined /> Dashboard</p>
                <h3 className="d2">Dashboard</h3>
            </div>
       </div>

    )
}