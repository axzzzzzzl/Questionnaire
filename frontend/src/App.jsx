import React, { useState, useEffect, useRef } from "react";
import { Layout, Input, Modal, Divider, ConfigProvider, Tooltip, message } from "antd";
import { UpSquareFilled, EditFilled } from "@ant-design/icons";
import styled from "@emotion/styled";
import './App.css';
import { LeftSide } from "./LeftSide";
import { QuestionList } from "./QuestionList";
import { SingleChoice } from "./SingleChoice";
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import SubmitModal from "./SingleChoice/SubmitModal";
// import { useNavigate } from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

const Questionnaire = () => {
    const [editorStatus, setEditorStatus] = useState("NotEdit");//是否在编辑
    const [editorType, setEditorType] = useState(null);//编辑题目的类型

    const [questionnaireTitle, setquestionnaireTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questionList, setQuestionList] = useState([]);
    const [questionnaire, setQuestionnaire] = useState("");

    const listRef = useRef(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if(editorType === "SingleChoice"){
        const current = listRef.current;
        current.scrollTop = current.scrollHeight;
      }
    },[editorType])

    function generateKey() {
        return Number(Math.random().toString().slice(3, 8) + Date.now()).toString(36);
    }

    const currSingleChoiceQues = {
        no: generateKey(),
        title: "",
        type: 0,
        remarks: null,
        isNecessary: false,
        option: [
          { no: generateKey(), text: "" },
          { no: generateKey(), text: "" },
        ],
    };
    const currMultipleChoiceQues = {
        no: generateKey(),
        title: "",
        type: 1,
        remarks: null,
        isNecessary: false,
        option: [
          { no: 1, text: "" },
          { no: 2, text: "" },
        ],
    };
    const currSingleLineTextQues = {
        no: generateKey(),
        type: 2,
        title: null,
        isNecessary: false,
        remarks: null,
    };


    const handleCancel = () => {
        setOpen(false);
    }
    const onFinish = () => {
        if(questionnaireTitle === ""){
          message.error("请输入问卷标题");
          return;
        }
        const newQuestionnaire = {
            title: questionnaireTitle,
            description: description,
            id: generateKey(),
            questions: questionList,
        };
        setQuestionnaire(newQuestionnaire);
        setOpen(true);
        // alert("Questionnaire:   " + JSON.stringify(questionnaire, null, 2))
    };

    return (
      <ConfigProvider
          theme={{
              token: {
              colorPrimary: '#01bd78',
              borderRadius: 2,
              },
          }}
          locale={zhCN}
      >
        <Layout style={{minHeight: '100vh', minWidth: '1100px', textAlign: "center", background: "#eee"}}>
          <Sider
            style={{
              background: "#eee",
            }}
            width="232px"
          >
            <LeftSide 
              editorStatus={editorStatus}
              setEditorStatus={setEditorStatus}
              editorType={editorType}
              setEditorType={setEditorType}
            />
          </Sider>
          {/* <Layout style={{ minHeight: '100vh', background: "#eee" }}> */}
            <QuestionnaireContent ref={listRef}>
              <div
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                  overflow: "auto",
                  // marginRight: "10px",
                  // padding: "20px 0px",
                  // background: "skyblue"
                }}
              >
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
              </div>
                {
                    editorStatus === "NotEdit" && editorType === null && questionList.length === 0 &&
                    <QuesitonnairePageText>
                        <EditFilled style={{color: "#01bd78", fontSize: "40px", margin: "70px 0 30px 0"}}/>
                        您还没有添加问题，请点击左侧问题控件开始出题吧。
                    </QuesitonnairePageText>
                }
                {/* <div>{JSON.stringify(currSingleChoiceQues, null, 2)}</div>
                <div>list: {JSON.stringify(questionList, null, 2)}</div>
                <div>title: {questionnaireTitle}</div>
                <div>editorStatus: {editorStatus}</div>
                <div>editorType: {editorType}</div> */}

                <QuestionList
                  questionList={questionList}
                  setQuestionList={setQuestionList}
                  editorStatus={editorStatus}
                  setEditorStatus={setEditorStatus}
                  editorType={editorType}
                  setEditorType={setEditorType}
                //   isUpdate={isUpdate}
                //   setIsUpdate={setIsUpdate}
                ></QuestionList>

                <div style={{background: '#eee'}}>
                    {editorType === "SingleChoice"   && 
                    <SingleChoice
                      questionList={questionList}
                      setQuestionList={setQuestionList}
                      editorStatus={editorStatus}
                      setEditorStatus={setEditorStatus}
                      editorType={editorType}
                      setEditorType={setEditorType}
                      currQues={currSingleChoiceQues}
                    ></SingleChoice>
                    }
                    {editorType === "MultipleChoice" && <p>多选题</p>}
                    {editorType === "SingleLineText" && <p>文本题</p>}
                </div>
              
            </QuestionnaireContent>
            <SettingContent>
              <SettingItem onClick={onFinish}>
                <Tooltip placement="left" title={<span>发布问卷</span>} color="#01bd78">
                <UpSquareFilled
                  style={{ fontSize: '25px', color: '#01bd78'}}
                />
                </Tooltip>
              </SettingItem>
              <SubmitModal open={open} onCancel={handleCancel} questionnaire={questionnaire}/>
            </SettingContent>
          {/* </Layout> */}
        </Layout>
      </ConfigProvider>
    )
}

const QuestionnaireContent = styled(Content)`
  overflow: auto;
  margin: 16px 0px 0px 16px;
  background: white;
  box-shadow: 0 3px 4px 0 grey;
  height: 95vh;
  min-width: 800px;
  min-height: 600px;
`
const SettingContent = styled.div`
  width: 40px;
  height: 95vh;
  margin: 16px 58px 0px 0px;
`
const SettingItem = styled.div`
  width: 25px;
  height: 25px;
  margin: 7.5px;
`

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

export default Questionnaire;