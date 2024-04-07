import React from 'react'
import { Modal } from 'antd';

const SubmitModal = (props) => {
    const { open, onCancel, questionnaire} = props;
    // const q = JSON.stringify({id: 1, title: 1, content: [{id: 2, title: 2}] }, null, '\n');
    // alert(q);
    return (
        <Modal title="发布问卷信息:" open={open} onOk={onCancel} onCancel={onCancel}>
            <pre>{JSON.stringify(questionnaire, null, 2)}</pre>
            {/* div不会保留换行符 */}
        </Modal>
    )
}

export default SubmitModal