import { Input, Divider, message, Popconfirm } from "antd";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { DeleteOutlined, HighlightOutlined, CopyOutlined } from "@ant-design/icons";
import { Text } from "../Text";
import DeleteModal from "../DeleteModal";
const { TextArea } = Input;

export const TextItem = (props) => {
  const {
    ques_id,
    questionItem,
    questionList,
    setQuestionList,
    editorStatus,
    setEditorStatus,
    editorType,
    setEditorType,
    // isUpdate,
    // setIsUpdate,
    disabled,
    SetDisabled,
  } = props;
  const [hovering, setHovering] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    if(isEdit && editorStatus==="Edit"){
      message.error("仍有问题未编辑完成...")
      setIsEdit(false);
    }
  },[editorStatus, isEdit])

  useEffect(() => {
    if(editorStatus==="NotEdit" && isEdit){
      SetDisabled(true)
    }
  },[editorStatus, isEdit])

  useEffect(() => {
    if(!isEdit||editorStatus==="Edit"){
      SetDisabled(false)
    }
  },[editorStatus, isEdit])

  function generateKey() {
    return Number(Math.random().toString().slice(2, 7) + Date.now()).toString(36);
  }

  const handleCopy = () => {
    const newQuestionItem = {
      no: generateKey(),
      type: questionItem.type,
      title: questionItem.title,
      remarks: questionItem.remarks,
      isNecessary: questionItem.isNecessary,
      lineHeight: questionItem.lineHeight
    }
    const newQuestionList = [...questionList, newQuestionItem];
    setQuestionList(newQuestionList);
    message.success('复制成功')
  }
  const handleDeleteOk = () => {
    setOpenDelete(true)
  }
  const handleCancel = () => {
    setOpenDelete(false)
  }
  const handleDelete = () => {
    const newQuestionList = questionList.filter(
      (ques) => ques !== questionItem
    );
    setQuestionList(newQuestionList);
  }
  return(
      !isEdit||editorStatus==="Edit" ? (
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
            <TextArea
              autoSize={{ minRows: questionItem.lineHeight, maxRows: questionItem.lineHeight }}
              style={{width: "80%"}}
            />
            </QuestionnaireSubjectInner>
              <SubjectControlBar style={{transform: hovering ? "translateX(0)" : ""}}>
                <HighlightOutlinedIcon
                  onClick={() => {
                    setIsEdit(true);
                  }}
                />
                <CopyOutlinedIcon 
                  onClick={handleCopy}
                />
                <DeleteOutlinedIcon
                  onClick={handleDeleteOk}
                />
                <DeleteModal 
                  open={openDelete} 
                  onCancel={handleCancel}
                  handleDelete={handleDelete}
                />
              </SubjectControlBar>
          <div style={{width: "90%", margin: "0 auto"}}><Divider /></div>
        </QuestionnaireItem>
        
        
      </>
        ) : (
          <>
            <div style={{background: '#eee'}}>
                <Text
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                    editorStatus={editorStatus}
                    setEditorStatus={setEditorStatus}
                    editorType={editorType}
                    setEditorType={setEditorType}
                    currTextQues={questionItem}
                    
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
  width: 700px;
  margin: 0 auto;
  // background: skyblue;
  z-index: 2;
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
  justify-content: space-around;
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