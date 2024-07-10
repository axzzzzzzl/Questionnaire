import styled from "@emotion/styled";
import zhCN from 'antd/locale/zh_CN';
import React, { useState, useEffect, useRef } from "react";
import { Layout, ConfigProvider, Tooltip, message } from "antd";
import { UpSquareFilled } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { EditorLeft } from "./EditorLeft";
import { EditorMain } from "./EditorMain";
import SubmitModal from "../../components/SubmitModal";
import ErrorModal from "../../components/ErrorModal";
import { post } from "../../services/axios";

export const Editor = () => {

    const listRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorInfo, setErrorInfo] = useState("");
    const [errorTitle, setErrorTitle] = useState("");

    const questionnaire = useSelector(state => state.questionnaire)
    const status = useSelector(state => state.editStatus)
    const location = useLocation();
    const arr = location.pathname.split("/");

    const navigate = useNavigate()
    let timeoutId 

    useEffect(() => {
      listRef.current.scroll({
        top: listRef.current.scrollHeight,
        behavior: 'auto',
      })
    },[status.editorType])

    const handleCancel = () => {
        setOpen(false);
    }
    const handleCancelError = () => {
      setOpenError(false);
    }

    const onFinish = () => {
      if(questionnaire.title === ""){  
        setErrorTitle("问卷未完成编辑。");
        setErrorInfo("当前问卷还没有标题。");
        setOpenError(true);
        return;
      }
      else if(questionnaire.questions.length === 0){  
        setErrorTitle("问卷尚未完成编辑。");
        setErrorInfo("当前问卷还没有问题。");
        setOpenError(true);
        return;
      }
      // setOpen(true);

      if(arr[arr.length - 1] === "create") {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          post("/questionnaire/create", questionnaire)?.then((res) => { 
            message.success('问卷创建成功!');
            navigate('/Questionnaire/')
          })
        },500)
      }
      else {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          post("/questionnaire/update", { questionnaire })?.then((res) => {
            message.success('问卷更新成功!');
            navigate('/Questionnaire/')   
          })
        },500)
      }
    };

    return (
      <ConfigProvider
        theme={{
          token: { colorPrimary: '#01bd78', borderRadius: 2 },
        }}
        locale={zhCN}
      >
        <EditorLayout>
          <EditorSider>
            <EditorLeft />
          </EditorSider>
          <MiddleContent ref={listRef}>
            <EditorMain />
          </MiddleContent>
          <SettingContent>
            <SettingItem onClick={onFinish}>
              <Tooltip 
                placement="left" 
                title={<span>{arr[arr.length - 1] === "create" ? "创建问卷" : "更新问卷"}</span>} 
                color="#01bd78"
              >
              <UpSquareFilled
                style={{ fontSize: '25px', color: '#01bd78'}}
              />
              </Tooltip>
            </SettingItem>
            <SubmitModal open={open} onCancel={handleCancel}/>
            <ErrorModal open={openError} onCancel={handleCancelError} errorInfo={errorInfo} errorTitle={errorTitle}/>
          </SettingContent>
        </EditorLayout>
      </ConfigProvider>
    )
}

const EditorLayout = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  overflow: auto;
  overflow-y: hidden;
  display: flex;
  background: #eee;
  text-align: center;
`
const EditorSider = styled.div`
  width: 224px;
  margin: 0 16px 16px;
  flex: none;
`
const MiddleContent = styled.div`
  overflow: auto;
  margin: 0 0 16px 16px;
  background: white;
  box-shadow: 0 3px 4px 0 grey;
  // height: 100%;
  width: calc(100% - 312px);
  min-width: 600px;
`
const SettingContent = styled.div`
  width: 40px;
`
const SettingItem = styled.div`
  width: 25px;
  height: 25px;
  margin: 0 7.5px;
`