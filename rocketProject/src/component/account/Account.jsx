import React, { useEffect, useState } from "react";
import './Account.css'
import axios from "axios";
import instance from "../../api/api";
import { Modal, Table } from 'antd';

const Account = () => {
    const [user, setUser] = useState({
        username: '',
        fullname: '',
        sex: '',
        phone: '',
        email: '',
        image: ''
    });

    const [changePasswordForm, setChangePasswordForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        instance.get(`user/${userId}`)
            .then(res => {
                const userData = res?.data;

                // Cập nhật trạng thái user với dữ liệu từ API
                setUser({
                    username: userData.username,
                    fullname: userData.fullname,
                    sex: userData.sex,
                    phone: userData.phone,
                    email: userData.email,
                    image: userData.image
                });
                console.log(user);
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        })
    }

    const handleInputChangePassword = (even) => {
        const { name, value } = even.target;
        setChangePasswordForm({
            ...changePasswordForm,
            [name]: value
        })
    }

    const handleSaveInfor = () => {
        console.log(user);
        instance.put(`user/update/${userId}`, user)
            .then(res => {
                alert("update successfully");
            })
            .catch(error => {
                console.log("Error: ", error);
            })
    }

    const renderModalChangPassword = () => {
        return (
            <div>
                <div>
                    <div>
                        <label htmlFor="">Old password: </label>: <input type="text" name="oldPassword" value={changePasswordForm.oldPassword} onChange={handleInputChangePassword} placeholder='Input old password' />
                    </div>
                    <div>
                        <label htmlFor="">New password: </label>: <input type="text" name="newPassword" value={changePasswordForm.newPassword} onChange={handleInputChangePassword} placeholder='Input new password' />
                    </div>
                    <div>
                        <label htmlFor="">Confirm : </label>: <input type="text" name="confirmPassword" value={changePasswordForm.confirmPassword} onChange={handleInputChangePassword} placeholder='Confirm password' />
                    </div>
                </div>
            </div>
        );
    };

    const handlechangePassword = () => {
        console.log(changePasswordForm);
        instance.post(`user/changePass/${userId}`, changePasswordForm)
            .then(res => {
                alert(res.data);
                hideModal();
            })
            .catch(err => {
                // alert(err.res.data)
                alert("Thông tin vừa nhập không đúng, vui lòng nhập lại")
                setChangePasswordForm({
                    oldPassword:"",
                    newPassword:"",
                    confirmPassword:""
                })
            })
    }
    return (
        <div className="account-infor">
            <h1 className="account-title">INFORMATION ACCOUNT</h1>
            <div>
                <img id="picture-user" name="image" src={user.image} alt="" />
                <p><label htmlFor="">Tên tài khoản :</label> <input className="input-infor" name="username" value={user.username} onChange={handleInputChange} disabled /></p>
                <p><label htmlFor="">Họ và tên:</label> <input className="input-infor" name="fullname" value={user.fullname} onChange={handleInputChange} /></p>
                <p><label htmlFor="">Giới tính:</label>  <input className="input-infor" name="sex" value={user.sex} onChange={handleInputChange} /></p>
                <p><label htmlFor="">Số điện thoại:</label> <input className="input-infor" name="phone" value={user.phone} onChange={handleInputChange} /></p>
                <p><label htmlFor="">Email:</label> <input className="input-infor" name="email" value={user.email} onChange={handleInputChange} /></p>
            </div>
            <div className="btn-infor">
                <button className="save-btn" onClick={handleSaveInfor}>SAVE</button>
                <button className="change-password" onClick={showModal}>CHANGE PASSWORD</button>
            </div>

            <div>
                <Modal
                    title="Change password"
                    open={open}
                    onOk={handlechangePassword}
                    onCancel={hideModal}
                    okText="Confirm"
                    cancelText="Cancel"
                >
                    {renderModalChangPassword()}
                </Modal>
            </div>
        </div>
    )
}

export default Account;