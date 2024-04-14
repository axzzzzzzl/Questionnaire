import React from 'react'
import { Modal } from 'antd';
import { useSelector } from 'react-redux';

const SubmitModal = (props) => {
    const { open, onCancel } = props;
    const questionnaire = useSelector(state => state.questionnaire);
    return (
        <Modal title="发布问卷信息:" open={open} onOk={onCancel} onCancel={onCancel}>
            <pre>{JSON.stringify(questionnaire, null, 2)}</pre>
            {/* div不会保留换行符 */}
        </Modal>
    )
}

export default SubmitModal