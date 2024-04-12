import styled from "@emotion/styled";
import zhCN from 'antd/locale/zh_CN';
import React, { useState, useEffect, useRef } from "react";
import { Layout, ConfigProvider, Tooltip, message, Modal } from "antd";
import { UpSquareFilled } from "@ant-design/icons";

import { EditorLeft } from "./EditorLeft";
import { EditorMain } from "./EditorMain";
import SubmitModal from "../../components/SubmitModal";
import ErrorModal from "../../components/ErrorModal";

const { Header, Content, Footer, Sider } = Layout;

export const Editor = () => {
    const [editorStatus, setEditorStatus] = useState("NotEdit");//是否在编辑
    const [editorType, setEditorType] = useState(null);//编辑题目的类型

    const [questionnaireTitle, setquestionnaireTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questionList, setQuestionList] = useState([]);
    const [questionnaire, setQuestionnaire] = useState("");

    const listRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorInfo, setErrorInfo] = useState("");
    const [errorTitle, setErrorTitle] = useState("");

    useEffect(() => {
      if(editorType === "SingleChoice"){
        const current = listRef.current;
        current.scrollTop = current.scrollHeight;
      }
      else if(editorType === "MultipleChoice"){
        const current = listRef.current;
        current.scrollTop = current.scrollHeight;
      }
      else if(editorType === "Text"){
        const current = listRef.current;
        current.scrollTop = current.scrollHeight;
      }
    },[editorType])

    function generateKey() {
        return Number(Math.random().toString().slice(3, 8) + Date.now()).toString(36);
    }
    //默认单选题
    const currSingleChoiceQues = {
        id: generateKey(),
        title: "",
        type: 0,
        remarks: null,
        isNecessary: false,
        option: [
          { id: "1", text: "选项1" },
          { id: "2", text: "选项2" },
        ],
    };
    //默认多选题
    const currMultipleChoiceQues = {
        id: generateKey(),
        title: "",
        type: 1,
        remarks: null,
        isNecessary: false,
        option: [
          { id: "1", text: "" },
          { id: "2", text: "" },
        ],
    };
    //默认文本题
    const currTextQues = {
        id: generateKey(),
        type: 2,
        title: null,
        isNecessary: false,
        remarks: null,
        lineHeight: 1,
    };


    const handleCancel = () => {
        setOpen(false);
    }
    const handleCancelError = () => {
      setOpenError(false);
    }
    const onFinish = () => {
        if(questionnaireTitle === ""){  
          setErrorTitle("问卷尚未完成编辑");
          setErrorInfo("当前问卷还没有标题...");
          setOpenError(true);
          return;
        }
        else if(questionList.length === 0){  
          setErrorTitle("问卷尚未完成编辑");
          setErrorInfo("当前问卷还没有问题...");
          setOpenError(true);
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
          <Sider style={{background: "#eee"}} width="232px" >
            <EditorLeft 
              editorStatus={editorStatus}
              setEditorStatus={setEditorStatus}
              editorType={editorType}
              setEditorType={setEditorType}
            />
          </Sider>
            <MiddleContent ref={listRef}>
              <EditorMain 
                questionnaireTitle={questionnaireTitle}
                setquestionnaireTitle={setquestionnaireTitle}
                description={description}
                setDescription={setDescription}
                editorStatus={editorStatus}
                setEditorStatus={setEditorStatus}
                editorType={editorType}
                setEditorType={setEditorType}
                questionList={questionList}
                setQuestionList={setQuestionList}
                currSingleChoiceQues={currSingleChoiceQues}
                currMultipleChoiceQues={currMultipleChoiceQues}
                currTextQues={currTextQues}
              />
            </MiddleContent>
            <SettingContent>
              <SettingItem onClick={onFinish}>
                <Tooltip placement="left" title={<span>发布问卷</span>} color="#01bd78">
                <UpSquareFilled
                  style={{ fontSize: '25px', color: '#01bd78'}}
                />
                </Tooltip>
              </SettingItem>
              <SubmitModal open={open} onCancel={handleCancel} questionnaire={questionnaire}/>
              <ErrorModal open={openError} onCancel={handleCancelError} errorInfo={errorInfo} errorTitle={errorTitle}/>
            </SettingContent>
        </Layout>
      </ConfigProvider>
    )
}

const MiddleContent = styled(Content)`
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