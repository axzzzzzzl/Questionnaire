import { Radio, Space, Divider, Modal, Button, message, Popconfirm } from "antd";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { SingleChoice } from "../SingleChoice/index";

export const SingleQuesItem = (props) => {
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

  const ques_option = Object.values(questionItem.option);

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
              <Radio.Group defaultValue={null}>
                <Space direction="vertical">
                  {ques_option.map((choice, index) => {
                    return (
                      <Radio key={index} value={choice}>
                        {choice.text}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>
            </QuestionnaireSubjectInner>
              {hovering ? (
                <SubjectControlBar>
                    <EditOutlined
                      onClick={() => {
                        setIsEdit(true);
                      }}
                      style={{ fontSize: "20px", color: "#01bd78" }}
                    />
                    <Popconfirm
                      title="您确定删除这个问题吗?"
                      icon={
                        <DeleteOutlined
                          style={{
                            color: '#01bd78',
                          }}
                        />
                      }
                      onConfirm={() => {
                        const newQuestionList = questionList.filter(
                          (ques) => ques !== questionItem
                        );
                        setQuestionList(newQuestionList);
                        message.success('删除成功')
                      }}
                      onCancel={() => message.success('取消成功')}
                      okText="确定"
                      cancelText="取消"
                    >
                      <DeleteOutlined
                      style={{ fontSize: "20px", color: "#01bd78" }}
                      />
                    </Popconfirm>
                </SubjectControlBar>
              ) : (
                <></>
              )}
          <div style={{width: "90%", margin: "0 auto"}}><Divider /></div>
        </QuestionnaireItem>
        
        
      </>
        ) : (
          <>
          <div style={{background: '#eee'}}>
          <SingleChoice
            questionList={questionList}
            setQuestionList={setQuestionList}
            editorStatus={editorStatus}
            setEditorStatus={setEditorStatus}
            editorType={editorType}
            setEditorType={setEditorType}
            currQues={questionItem}
            
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
  background: #eee;
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
  z-index: 3;
  transition: all 0.2s ease-in-out;
  &: hover {  
    background: #D3D3D3;
    }
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
