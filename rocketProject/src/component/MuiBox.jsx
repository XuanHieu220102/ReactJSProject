import React from "react";
import "./MuiBox.css";
import { MoneyCollectOutlined, ProfileOutlined } from '@ant-design/icons';
export default function MuiBox({title, money, per, isKT}) {
    const perClassName = isKT ? "per" : "per-sub";
    return (
        <>
            <div className="box">
                <div className="mui-box">
                    <div className="mui-box-1">
                        <p>{title}</p>
                        <h2>{money} <span className= {perClassName}>{ per}</span></h2>
                    </div>
                    <div className="mui-box-2">
                        <ProfileOutlined className="money-icon" />
                    </div>
                </div>
            </div>
        </>
    )
}