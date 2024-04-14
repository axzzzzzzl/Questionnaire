import React, { useState, useEffect } from 'react'
import _ from "lodash";
import { Modal, Input, Button } from 'antd';
import { singleOptionBatchSetted } from './SingleChoice/singleSlice';
import { multipleOptionBatchSetted } from './MultipleChoice/multipleSlice';
import { useDispatch, useSelector } from 'react-redux'
const { TextArea } = Input;

const BatchEditModal = (props) => {
  const{
    open,
    onCancel,
    mutiOption,
    setMutiOption,
  } = props;

  const dispatch = useDispatch()
  const status = useSelector(state => state.editStatus)

  const handleOk = () => {
    if(status.editorType === "SingleChoice")
      dispatch(singleOptionBatchSetted(mutiOption));
    else if(status.editorType === "MultipleChoice")
      dispatch(multipleOptionBatchSetted(mutiOption));
    onCancel();
  }
  
  const handleChangeOption = (e) => {
    setMutiOption(e.target.value);
  }

  return (
    <Modal title="选项批量编辑" open={open} onOk={handleOk} onCancel={onCancel}>
        <TextArea 
          rows={6} 
          value={mutiOption}
          onChange={handleChangeOption}
        />
    </Modal>
  )
}

export default BatchEditModal