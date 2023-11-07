import React from 'react';
import { Input, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
// import thu vien call api
import axios from 'axios';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { Outlet, Link } from "react-router-dom";
import './Table.css';
const { confirm } = Modal;
import { NavLink } from 'react-router-dom';
import instance from '../api/api';
const { Search } = Input;
import { Select } from 'antd';
// import type { SearchProps } from '../Search';

const TableCp = () => {
    const [data, setDataTable] = useState([]);
    const [selectedValue, setSelectedValue] = useState("id")
    const [search, setSearch] = useState('')
    // const api = 'http://localhost:8080/api/v1/group?size=999';
    // const api = 'https://64e5f67f09e64530d17f54dc.mockapi.io/rocket35class';
    const apiCall = () => {
        const token = localStorage.getItem('token')
        instance.get("/group").then(res => {
            console.log(res?.data);
            setDataTable(res?.data.content);
        }).catch(err => {          
            console.log(err);
        })
    }
    // useEffect(() => {
    //     console.log(selectedValue);
    // }, [selectedValue]);
    useEffect(() => {
        instance.get(`group?size=99&&sort=${selectedValue},asc`)
            .then(response => {
                setDataTable(response?.data.content);
            })
            .catch(err => {
                console.log("error: " + err);
            });
    }, [selectedValue]);

    const columns = [
        {
            title: 'Stt',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'GroupName',
            dataIndex: 'groupName',
            key: 'groupName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Member',
            dataIndex: 'groupMember',
            key: 'groupMember',
        },
        {
            title: 'Creator',
            dataIndex: 'userUsername',
            key: 'userUsername',
        },
        {
            title: 'CreateDate',
            key: 'createDate',
            dataIndex: 'createDate',
        },
        {
            title: 'Action',
            key: 'action',
            // fixed: 'center',
            render: (_, itemTable) => (
                <Space size="middle">
                    <Tag color='green' onClick={() => showUpdateTable(itemTable)}>
                        EDIT
                    </Tag>
                    <Tag color={'red'} onClick={() => showDeleteConfirm(itemTable)}>
                        Delete
                    </Tag>
                </Space>
            ),
        },
    ];

    const [itemToUpdate, setItemToUpdate] = useState(null);
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
        setItemToUpdate(null);
    };

    const showUpdateTable = (itemTable) => {
        setItemToUpdate(itemTable);
        setGroupName(itemTable.groupName);
        setGroupMember(itemTable.groupMember);
        showModal();
    }


    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value)
    }

    const sortTable = () => {
        instance.get(`/group?size=99&&sort=${selectedValue},asc`)
            .then(res => {
                setDataTable(res?.data.content);
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }

    const reset = () => {
        instance.get("/group?size=99")
            .then(res => {
                setDataTable(res?.data.content);
            })
            .catch(err => {
                console.log("Error: ", err);
            })
        document.getElementById("input-search").value = '';
        setSelectedValue("id");
    }

    const [groupName, setGroupName] = useState('');
    const [groupMember, setGroupMember] = useState('');
    const renderModalContent = () => {
        return (
            <div>
                {itemToUpdate && (
                    <div>
                        <div>
                            Group name: <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder='Input group name' />
                        </div>
                        <div>
                            Group member: <input type="text" value={groupMember} onChange={(e) => setGroupMember(e.target.value)} placeholder='Input total member' />
                        </div>
                    </div>
                )}
            </div>
        );
    };


    const updateItemTb = () => {
        instance.put(`/group/update/${itemToUpdate?.id}`, { groupName, groupMember })
            .then(res => {
                alert('Update successfully');
                apiCall();
                hideModal();
            })
            .catch(err => {
                console.error(err);
            })
    }

    const deleteItemTb = (itemTable) => {
        console.log(itemTable);
        if (itemTable?.id) {
            instance.delete(`/group/delete/${itemTable?.id}`).then(res => {
                alert("Delete successfully")
                apiCall();
            }).catch(err => {
                console.error(err);
            })
        }
    }
    const showDeleteConfirm = (item) => {
        confirm({
            title: `Are you sure delete ${item.groupName} ?`,
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteItemTb(item)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleInputSearch = (e) => {
        setSearch(e.target.value);
    }

    const searchItem = () => {
        console.log(search);
        instance.get(`group?search=${search}`)
            .then(res => {
                setDataTable(res?.data.content);
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }
    return <>
        <div style={{ display: 'flex', justifyContent: 'center', fontSize: '24px' }}>
            <h2>GROUP LIST</h2>
        </div>
        <div>
            <NavLink to={"/addItemTable"} replace={true}>
                <Tag className='new-group'>
                    NEW GROUP
                </Tag>
            </NavLink>

            <div className='box-header'>
                <div>
                    <input id='input-search' type="text" onChange={handleInputSearch} />
                    <button id='btn-search' onClick={searchItem}>Search</button>
                </div>
                <div className='sort'>
                    <span className='sort-by'>Sort by: </span><select className='custom-select' value={selectedValue} onChange={handleSelectChange}>
                        <option value="id">Mặc định</option>
                        <option value="groupName">Groupname</option>
                        <option value="createDate">Createdate</option>
                    </select>
                    {/* <button onClick={sortTable}>Sort</button> */}
                    <button className='reset' onClick={reset}>Reset</button>
                </div>


            </div>

        </div>


        {/* {data.length > 0 && <Table columns={columns} dataSource={data} scroll={{ x: 1000, y: 1500 }} />} */}
        {data.length > 0 ? (
            <Table columns={columns} dataSource={data} scroll={{ x: 1000, y: 1500 }} />
        ) : (
            <p>Không tìm thấy đối tượng nào.</p>
        )}
        <Modal
            title="UPDATE"
            open={open}
            onOk={updateItemTb}
            onCancel={hideModal}
            okText="Confirm"
            cancelText="Cancel"
        >
            {renderModalContent()}
        </Modal>

    </>
};
export default TableCp;
