import React from "react";
import { PicLeftOutlined, PhoneOutlined, GooglePlusOutlined, MailOutlined, FacebookOutlined, InstagramOutlined, EnvironmentOutlined } from '@ant-design/icons';
import "./Profile.css";
export default function Profile() {
    return (
        <div className="pro-body">
            <div className="Container">
                <div className="pro-container">
                    <div className="pro-1">
                        <img id="pro-img" src="https://cdn.pixabay.com/photo/2016/11/18/15/03/man-1835195_1280.jpg" alt="" />
                    </div>
                    <div className="pro-2">
                        <div>
                            <p className="p-pro1">HELLO EVERYBODY, I AM</p>
                            <h2 className="h2-pro">MICAEL</h2>
                            <h4 className="h4-pro">JUNIOR UI/UX DEVELOPER</h4>
                            <p className="p-pro2">You wib begin to realise why this exercise is<br />
                                called the Dickens Pattern (with refernce to<br />
                                the ghost showing Scroage different future)
                            </p>
                        </div>
                        <div>
                            <p className="p-pro1"><PicLeftOutlined className="p-pro1-sub" />13st December, 2002</p>
                            <p className="p-pro1"><PhoneOutlined className="p-pro1-sub" /> 0858250715</p>
                            <p className="p-pro1"><MailOutlined className="p-pro1-sub" /> xuanhieu0031@gmail.com</p>
                            <p className="p-pro1"><EnvironmentOutlined className="p-pro1-sub" /> Xuan Dai, Xuan Truong, Nam Dinh</p>
                        </div>
                        <div className="div-icon">
                            <span className="span-pro"><FacebookOutlined className="icon-pro" /></span>
                            <span className="span-pro"><InstagramOutlined className="icon-pro" /></span>
                            <span className="span-pro"><GooglePlusOutlined className="icon-pro" /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}