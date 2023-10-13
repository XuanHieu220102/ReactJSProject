import React from "react";
import './FooterItem.css';
import {UserOutlined, SketchOutlined, CompassOutlined, CrownOutlined} from '@ant-design/icons'; 

export default function FooterItem() {
    return (
        <div className="footer-contain">
            <div className="box-item">
                <div>
                    <span className="abc"><UserOutlined /> User</span>
                </div>
                <div>
                    <h2>36K</h2>
                    <div className="ctn">
                        <div className="skill User"></div>
                    </div>
                </div>
            </div>
            <div className="box-item">
                <div>
                    <span><SketchOutlined /> Click</span>
                </div>
                <div>
                    <h2>2M</h2>
                    <div className="ctn">
                        <div className="skill Click"></div>
                    </div>
                </div>
            </div>
            <div className="box-item">
                <div>
                    <span><CompassOutlined /> Sale</span>
                </div>
                <div>
                    <h2>$435</h2>
                    <div className="ctn">
                        <div className="skill Sales"></div>
                    </div>
                </div>
            </div>
            <div className="box-item">
                <div>
                    <span><CrownOutlined /> Items</span>
                </div>
                <div>
                    <h2> 43</h2>
                    <div className="ctn">
                        <div className="skill Items"></div>
                    </div>
                </div>
            </div>
        </div>

    )
}