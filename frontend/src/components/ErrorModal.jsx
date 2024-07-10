import React from 'react'
import { Modal, ConfigProvider, Button } from 'antd';

const ErrorModal = (props) => {
    const { open, onCancel, errorInfo, errorTitle } = props;
    return (
        <ConfigProvider
            theme={{
                token: {
                colorPrimary: '#fa8c16',
                borderRadius: 5
                },
            }}
        >
        <Modal 
          title={errorTitle}
          open={open} 
          onOk={onCancel} 
          onCancel={onCancel}
          width={500}
          footer={[
            <Button type="primary" onClick={onCancel}>确定</Button>,
          ]}
          >
            {/* <br /> */}
            <div>{errorInfo}</div>
            {/* <br /> */}
        </Modal>
        </ConfigProvider>
    )
}

export default ErrorModal