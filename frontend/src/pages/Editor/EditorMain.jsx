import React, { useState, useEffect, useRef } from "react";
import { Input, Divider, ConfigProvider } from "antd";
import { EditFilled } from "@ant-design/icons";
import styled from "@emotion/styled";
import { QuestionList } from "../../components/QuestionList";
import { SingleChoice } from "../../components/SingleChoice";
import { MultipleChoice } from "../../components/MultipleChoice";
import { Text } from "../../components/Text";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { titleUpdated, descriptionUpdated } from "../../components/QuestionList/quesListSlice";
const { TextArea } = Input;

export const EditorMain = (props) => {

    const questionnaire = useSelector(state => state.questionnaire)
    const status = useSelector(state => state.editStatus)
    const dispatch = useDispatch()

    return (
      <>
        <QuestionnaireHeader>
          <ConfigProvider
            theme={{
            token: {
                colorBorder: "transparent",
            }
            }}
          >
            <QuestionnaireTitle>
              <InputTitle
                placeholder="问卷标题"
                value={questionnaire.title}
                onChange={(e) => {
                dispatch(titleUpdated(e.target.value));
                }}
              />
            </QuestionnaireTitle>
            <QuestionnaireDescription>
              <InputDescription
                autoSize
                placeholder="问卷说明"
                value={questionnaire.description}
                onChange={(e) => {
                  dispatch(descriptionUpdated(e.target.value));
                }}
              />
            </QuestionnaireDescription>
          </ConfigProvider>
          <Divider style={{ border: '1px solid #01bd78', marginTop: '5px' }} />
        </QuestionnaireHeader>
        {
          status.editorStatus === "NotEdit" && status.editorType === null && questionnaire.questions.length === 0 &&
          <QuesitonnairePageText>
            <EditFilled style={{color: "#01bd78", fontSize: "40px", margin: "70px 0 30px 0"}}/>
            您还没有添加问题，请点击左侧问题控件开始出题吧。
          </QuesitonnairePageText>
        }
        <QuestionList />
        <QuestionEditor>
          {status.editorType === "SingleChoice"   &&
            <SingleChoice />
          }
          {status.editorType === "MultipleChoice" && 
            <MultipleChoice />
          }
          {status.editorType === "Text" && 
            <Text />
          }
        </QuestionEditor>
      </>
    )
}
const QuestionnaireHeader = styled.div`
  margin-top: 10px;
`;
const QuestionnaireTitle = styled.div`
  width: 100%;
  padding: 10px 0;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: #eee;
  }
`;
const QuestionnaireDescription = styled.div`
  width: 100%;
  padding: 5px 0;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: #eee;
  }
`;
const InputTitle = styled(Input)`
  width: 700px;
  height: 45px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 2px;
  color: #01bd78;
`;
const InputDescription = styled(TextArea)`
  width: 900px;
  font-size: 16px;
  border-radius: 2px;
`;
const QuesitonnairePageText = styled.div`
  font-size: 16px;
  color: #999;
  margin-top: 100px;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const QuestionEditor = styled.div`
  background: #eee;
`;