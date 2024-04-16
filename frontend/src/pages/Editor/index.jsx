import styled from "@emotion/styled";
import zhCN from 'antd/locale/zh_CN';
import React, { useState, useEffect, useRef } from "react";
import { Layout, ConfigProvider, Tooltip } from "antd";
import { UpSquareFilled } from "@ant-design/icons";
import { useSelector } from 'react-redux';

import { EditorLeft } from "./EditorLeft";
import { EditorMain } from "./EditorMain";
import SubmitModal from "../../components/SubmitModal";
import ErrorModal from "../../components/ErrorModal";

const { Header, Content, Footer, Sider } = Layout;

export const Editor = () => {

    const listRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorInfo, setErrorInfo] = useState("");
    const [errorTitle, setErrorTitle] = useState("");

    const questionnaire = useSelector(state => state.questionnaire)
    const status = useSelector(state => state.editStatus)

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
        setErrorTitle("问卷尚未完成编辑");
        setErrorInfo("当前问卷还没有标题...");
        setOpenError(true);
        return;
      }
      else if(questionnaire.questions.length === 0){  
        setErrorTitle("问卷尚未完成编辑");
        setErrorInfo("当前问卷还没有问题...");
        setOpenError(true);
        return;
      }
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
            <EditorLeft />
          </Sider>
          <MiddleContent ref={listRef}>
            <EditorMain />
          </MiddleContent>
          <SettingContent>
            <SettingItem onClick={onFinish}>
              <Tooltip placement="left" title={<span>发布问卷</span>} color="#01bd78">
              <UpSquareFilled
                style={{ fontSize: '25px', color: '#01bd78'}}
              />
              </Tooltip>
            </SettingItem>
            <SubmitModal open={open} onCancel={handleCancel}/>
            <ErrorModal open={openError} onCancel={handleCancelError} errorInfo={errorInfo} errorTitle={errorTitle}/>
          </SettingContent>
        </Layout>
      </ConfigProvider>
    )
}

const MiddleContent = styled(Content)`
  overflow-y: auto;
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