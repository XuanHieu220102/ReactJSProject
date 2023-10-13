import React, { useEffect, useRef, useState } from "react";
import './AddItemTable.css';
import { Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, Space } from 'antd';
import { fa } from "faker/lib/locales";


export default function AddItemTable() {
    const groupNameRef = useRef('');
    const groupMemberRef = useRef('');
    const api = 'http://localhost:8080/api/v1/group/add';
    const redirectUrl = useNavigate("")
    const creator = localStorage.getItem('username');
    const [groupNameMessage, setGroupNameMessage] = useState('')
    const [groupMemberMessage, setGroupMemberMessage] = useState('')
    const handleInputNameFocus = () => {
        setGroupNameMessage('');
    }
    const handleInputMemberFocus = () => {
        setGroupMemberMessage('')
    }
    const [data, setDataTable] = useState([]);
    const apiGroup = 'http://localhost:8080/api/v1/group';
    // const api = 'https://64e5f67f09e64530d17f54dc.mockapi.io/rocket35class';
    const apiCall = () => {
        const token = localStorage.getItem('token')
        axios.get(apiGroup).then(res => {
            setDataTable(res?.data.content);
        }).catch(err => {          
            console.log(err);
        })
    }
    const [kt, setKt] = useState(false)
        useEffect(() => {
            apiCall();
        }, []);
    const AddItem = () => {
        setKt(false);

        const result = {
            groupName: groupNameRef.current.value,
            groupMember: groupMemberRef.current.value,
            userId: localStorage.getItem('userId')
        }
        console.log(result);
        const { groupName, groupMember } = result;
        if (groupName.trim() === '') {
            setGroupNameMessage('Vui lòng nhập trường này')
        }
        if (groupMember.trim() === '') {
            setGroupMemberMessage('Vui lòng nhập trường này')
        } else {
            if (groupMember <= 0) {
                setGroupMemberMessage('Group member phải lớn hơn 0')
            }

        }

        if (groupNameRef.current.value === '' || groupMemberRef.current.value === '') {
            console.log(1);
            return;
        }
        data.forEach(e => {
            if(e.groupName === groupName){
                alert("Group name đã tồn tại");
                setKt(true)
            }
            return;
        })
        if(kt === true){
            return;
        }
        axios.post(api, result)
            .then(response => {
                console.log(response.status);
                if (response.status == 200) {
                    alert("Add success fully")
                    redirectUrl("/Table")
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="add-container">
            <div className="add-title">
                <h2>ADD GROUP</h2>
            </div>
            <div className="form-container">
                <div className="form-add">
                    <div>
                        <label htmlFor="name" className="tb">GROUP NAME: </label>
                        <input className="add-input" type="text" ref={groupNameRef} name="name" onFocus={handleInputNameFocus} placeholder='Input group name' />
                        <p className="err-message">{groupNameMessage}</p>
                    </div>
                    <div>
                        <label htmlFor="age" className="tb">GROUP MEMBER: </label>
                        <input className="add-input" type="text" ref={groupMemberRef} name="age" onFocus={handleInputMemberFocus} placeholder='Input group member' />
                        <p className="err-message">{groupMemberMessage}</p>
                    </div>
                    <Button onClick={() => AddItem()} id="add-btn">ADD GROUP</Button>
                </div>
            </div>

        </div>
    )
}