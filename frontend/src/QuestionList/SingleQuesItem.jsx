import { Radio, Space, Divider, Modal, message } from "antd";
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
  } = props;
  const [hovering, setHovering] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const ques_option = Object.values(questionItem.option);

  function next_id() {
    var current_id = 0;
    return function () {
      return ++current_id;
    };
  }

  const option_id = next_id();

  const deleteQues = () => {
    Modal.confirm({
      title: "确定删除这个问题吗",
      content: "点击确定删除这个问题",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        const newQuestionList = questionList.filter(
          (ques) => ques !== questionItem
        );
        setQuestionList(newQuestionList);
      },
    });
  };
  useEffect(() => {
    if(isEdit && editorStatus==="Edit"){
      message.error("仍有问题未编辑完成...")
      setIsEdit(false);
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
                    <DeleteOutlined 
                      onClick={deleteQues} 
                      style={{ fontSize: "20px", color: "#01bd78" }}
                      />
                </SubjectControlBar>
              ) : (
                <></>
              )}
          
        </QuestionnaireItem>
        <div style={{width: "90%", margin: "0 auto"}}><Divider /></div>
        
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
