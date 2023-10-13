import React from 'react';
import { Space, Table, Tag } from 'antd';
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
const TableCp = () => {
    const [data, setDataTable] = useState([]);
    const api = 'http://localhost:8080/api/v1/group';
    // const api = 'https://64e5f67f09e64530d17f54dc.mockapi.io/rocket35class';
    const apiCall = () => {
        const token = localStorage.getItem('token')
        axios.get(api).then(res => {

            console.log(res?.data);
            setDataTable(res?.data.content);
        }).catch(err => {          
            console.log(err);
        })
    }
    useEffect(() => {
        apiCall();
    }, []);

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
                    <Tag color={'red'} onClick={() => showDeleteConfirm (itemTable)}>
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

    const [groupName, setGroupName] = useState('');
    const [groupMember, setGroupMember] = useState('');
    const renderModalContent = () => {
        return (
          <div>
            {itemToUpdate && (
              <div>
                <div>
                  Group name: <input type="text" value={groupName}  onChange={(e) => setGroupName(e.target.value)} placeholder='Input group name'/>
                </div>
                <div>
                  Group member: <input type="text" value={groupMember} onChange={(e) => setGroupMember(e.target.value)} placeholder='Input total member'/>
                </div>
              </div>
            )}
          </div>
        );
      };

      
    const updateItemTb = () => {
        axios.put(api + `/update/${itemToUpdate?.id}`, {groupName, groupMember})
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
            axios.delete(api + `/delete/${itemTable?.id}`).then(res => {
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

    const redirectAddItem= () => {

    }  
    return <>
    <div style={{display:'flex', justifyContent:'center', fontSize:'24px'}}>
        <h2>GROUP LIST</h2>
    </div>
    <NavLink to={"/addItemTable"} replace={true}>
        <Tag color='#fff' style={{fontSize:'20px', padding:'5px 10px', color:'black',border:'1px solid black'}}>
            NEW GROUP
        </Tag>
    </NavLink>

 
    {data.length > 0 && <Table columns={columns} dataSource={data} scroll={{x:1000, y:1500}}/>}
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
