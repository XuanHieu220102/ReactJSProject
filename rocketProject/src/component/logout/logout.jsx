import { ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';

const Logout = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Ấn vào đây để đăng xuất
      </Button>
      <Modal
        title="Modal"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Cancel"
        cancelText="OK"
      >
        <h2>Bạn có muốn đăng xuất không</h2>
      </Modal>
    </>
  );
};


export default Logout;