import { Radio, Space, Divider, Modal, Button, message, Popconfirm } from "antd";
import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";
import { DeleteOutlined, HighlightOutlined, CopyOutlined } from "@ant-design/icons";
import DeleteModal from "../DeleteModal";
import { SingleChoice } from "../SingleChoice/index";

import { useSelector, useDispatch } from 'react-redux'
import { questionDeleted, questionCopyed } from './quesListSlice'
import { singleChoiceSetted } from '../SingleChoice/singleSlice'
import { editorStatusUpdated } from '../editStatusSlice'

export const SingleQuesItem = (props) => {
  const {
    ques_id,
    questionItem,
    setDisabled,
  } = props;
  const [hovering, setHovering] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const dispatch = useDispatch();
  const status = useSelector(state => state.editStatus)

  const listRef = useRef(null);
  useEffect(() => {
    if(isEdit){
      listRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  },[isEdit])

  useEffect(() => {
    if(status.editorStatus==="Edit"){
      // 编辑时所有问题禁止拖拽
      setDisabled(true)
    }
    else {
      setDisabled(false)
    }
  },[status.editorStatus])

  const handleEdit = () => {
    setIsEdit(true);
    if(status.editorStatus==="Edit"){
      message.error("仍有问题未编辑完成...")
      setIsEdit(false);
    }
    else{
      dispatch(editorStatusUpdated("Edit"));
      dispatch(singleChoiceSetted(questionItem));
      setHovering(false);
    }
  }

  const handleCopy = () => {
    dispatch(questionCopyed(questionItem))
    message.success('复制成功')
  }

  const handleDeleteOk = () => {
    setOpenDelete(true)
  }
  const handleCancel = () => {
    setOpenDelete(false)
  }
  const handleDelete = () => {
    dispatch(questionDeleted(questionItem.id))
  }
  return(
      !isEdit ? (
      <>
        <QuestionnaireItem
          onMouseEnter={() => {
            setHovering(true);
          }}
          onMouseLeave={() => {
            setHovering(false);
          }}
        >
          <QuestionnaireSubjectInner>
            <SubjectRow>
              <span>{ques_id + "."}&nbsp;</span>
              <span>{questionItem.title}</span>
              {questionItem.isNecessary && (
                  <SubjectRowRequire>*&nbsp;&nbsp;</SubjectRowRequire>
              )}
            </SubjectRow>
            {questionItem.remarks && (
                <SubjectRemarks>{questionItem.remarks}</SubjectRemarks>
            )}
              <Radio.Group defaultValue={null}>
                <Space direction="vertical">
                  {questionItem.options.map((choice, index) => {
                    return (
                      <Radio key={index} value={choice}>
                        {choice.text}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>
            </QuestionnaireSubjectInner>
              <SubjectControlBar style={{transform: hovering ? "translateX(0)" : ""}}>
                <IconBar>
                  <HighlightOutlinedIcon
                    onClick={handleEdit}
                  />
                </IconBar>
                <IconBar>
                  <CopyOutlinedIcon
                    onClick={handleCopy}
                  />
                </IconBar>
                <IconBar>
                  <DeleteOutlinedIcon
                    onClick={handleDeleteOk}
                  />
                  <DeleteModal 
                    open={openDelete} 
                    onCancel={handleCancel}
                    handleDelete={handleDelete}
                  />
                </IconBar>
              </SubjectControlBar>
          <div style={{width: "90%", margin: "0 auto"}}><Divider /></div>
        </QuestionnaireItem>
        
        
      </>
      ) : (
        <>
          <div style={{background: '#eee'}} ref={listRef}>
            <SingleChoice
              isUpdate={isEdit}
              setIsUpdate={setIsEdit}
            />
          </div>
        </>
      )
  )
};

const QuestionnaireItem = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  min-height: 100px;
  // background: #eee;
  text-align: left;
  z-index: 1;
  &: hover {  
  background: rgb(245, 245, 245);
  }
`;

const QuestionnaireSubjectInner = styled.div`
  width: 900px;
  margin: 0 auto;
  // background: skyblue;
  z-index: 2;
  padding-left: 30px;
`;

const SubjectRow = styled.div`
  margin-bottom: 6px;
  width: 100%;
`;

const SubjectControlBar = styled.div`
  width: 50px;
  height: 100%;
  background: #eee;
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateX(100%);
  transition: transform .2s;
`;

const SubjectRowRequire = styled.span`
  color: red;
  vertical-align: middle;
  margin-left: 5px;
`;

const SubjectRemarks = styled.div`
  font-size: 12px;
  color: #999;
  margin-bottom: 6px;
`;

const HighlightOutlinedIcon = styled(HighlightOutlined)`
  font-size: 17px;
  &:hover{
    color: #01bd78;
  }
`;
const DeleteOutlinedIcon = styled(DeleteOutlined)`
  font-size: 17px;
  &:hover{
    color: #01bd78;
  }
`;
const CopyOutlinedIcon = styled(CopyOutlined)`
  font-size: 17px;
  &:hover{
    color: #01bd78;
  }
`;
const IconBar = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;