import React, { useState, useEffect, useRef } from "react";
import { Input, Divider, ConfigProvider } from "antd";
import { EditFilled } from "@ant-design/icons";
import styled from "@emotion/styled";
import { QuestionList } from "../../components/QuestionList";
import { SingleChoice } from "../../components/SingleChoice";
import { MultipleChoice } from "../../components/MultipleChoice";
const { TextArea } = Input;

export const EditorMain = (props) => {
    const {
      questionnaireTitle,
      setquestionnaireTitle,
      description,
      setDescription,
      editorStatus,
      setEditorStatus,
      editorType,
      setEditorType,
      questionList,
      setQuestionList,
      currSingleChoiceQues,
      currMultipleChoiceQues
    } = props;
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
                        value={questionnaireTitle}
                        onChange={(e) => {
                        setquestionnaireTitle(e.target.value);
                        }}
                    />
                </QuestionnaireTitle>
                <QuestionnaireDescription>
                    <InputDescription
                        autoSize
                        placeholder="问卷说明"
                        value={description}
                        onChange={(e) => {
                        setDescription(e.target.value);
                        }}
                    />
                </QuestionnaireDescription>
            </ConfigProvider>
            <Divider style={{ border: '1px solid #01bd78', marginTop: '5px' }} />
        </QuestionnaireHeader>
        {
            editorStatus === "NotEdit" && editorType === null && questionList.length === 0 &&
            <QuesitonnairePageText>
                <EditFilled style={{color: "#01bd78", fontSize: "40px", margin: "70px 0 30px 0"}}/>
                您还没有添加问题，请点击左侧问题控件开始出题吧。
            </QuesitonnairePageText>
        }
        <QuestionList
            questionList={questionList}
            setQuestionList={setQuestionList}
            editorStatus={editorStatus}
            setEditorStatus={setEditorStatus}
            editorType={editorType}
            setEditorType={setEditorType}
        />
        <QuestionEditor>
            {editorType === "SingleChoice"   && 
            <SingleChoice
              questionList={questionList}
              setQuestionList={setQuestionList}
              editorStatus={editorStatus}
              setEditorStatus={setEditorStatus}
              editorType={editorType}
              setEditorType={setEditorType}
              currSingleChoiceQues={currSingleChoiceQues}
            />
            }
            {editorType === "MultipleChoice" && 
            <MultipleChoice
              questionList={questionList}
              setQuestionList={setQuestionList}
              editorStatus={editorStatus}
              setEditorStatus={setEditorStatus}
              editorType={editorType}
              setEditorType={setEditorType}
              currMultipleChoiceQues={currMultipleChoiceQues}
            />
            }
            {editorType === "SingleLineText" && <p>文本题</p>}
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
  font-size: 18px;
  font-weight: bold;
  border-radius: 2px;
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