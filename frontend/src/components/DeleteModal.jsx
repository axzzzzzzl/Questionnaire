import React from 'react'
import { Modal, ConfigProvider, Button } from 'antd';

const DeleteModal = (props) => {
    const { open, onCancel, handleDelete } = props;
    return (
        <ConfigProvider
            theme={{
                token: {
                colorPrimary: '#ff4d4f',
                borderRadius: 5
                },
            }}
        >
        <Modal 
          title="您确定要删除这个问题吗？"
          open={open} 
          onCancel={onCancel}
          width={500}
          footer={[
            <Button type="dashed" onClick={onCancel}>我再想想</Button>,
            <Button type="primary" onClick={handleDelete}>确定删除</Button>,
          ]}
          >
            <p>删除后问题不可恢复，请谨慎操作。</p>
        </Modal>
        </ConfigProvider>
    )
}

export default DeleteModal