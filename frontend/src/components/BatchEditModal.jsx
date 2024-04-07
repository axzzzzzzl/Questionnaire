import React, { useState, useEffect } from 'react'
import _ from "lodash";
import { Modal, Input, Button } from 'antd';
const { TextArea } = Input;

const BatchEditModal = (props) => {
  const{
    open,
    onCancel,
    setOption,
    mutiOption,
    setMutiOption,
  } = props;

  function generateKey() {
    return Number(Math.random().toString().slice(2, 7) + Date.now()).toString(36);
  }

  const handleOk = () => {
    let newChoices = mutiOption.split('\n').map((item) => {
        return { no: generateKey(), text: item };
    })
    setOption(newChoices);
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