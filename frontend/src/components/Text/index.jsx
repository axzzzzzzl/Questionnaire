import styled from "@emotion/styled";
import {
    MinusSquareOutlined
} from "@ant-design/icons";
import { Input, Checkbox, Button, Form, Divider, message, InputNumber } from "antd";
import React, { useState } from "react";
import { questionAdded, questionUpdated } from '../QuestionList/quesListSlice'
import { 
  titleUpdated, 
  remarksUpdated,
  isNecessaryUpdated,
  lineHeightUpdated,
  textSetted,
  textCleared
} from './textSlice'
import { editorStatusUpdated, editorTypeUpdated } from "../editStatusSlice";
import { useSelector, useDispatch} from 'react-redux';

export const Text = (props) => {
  const {
    isUpdate,
    setIsUpdate
  } = props;

  const text = useSelector(state => state.text)
  const dispatch = useDispatch()
  const [form] = Form.useForm();

  const onSubmit = () => {
    if(isUpdate){
      dispatch(editorStatusUpdated("NotEdit"));
      dispatch(editorTypeUpdated(null));
      setIsUpdate(false);
      dispatch(questionUpdated(text))
      dispatch(textCleared())
      message.success("问题修改成功")
    }
    else{
      dispatch(editorStatusUpdated("NotEdit"));
      dispatch(editorTypeUpdated(null));
      dispatch(questionAdded(text))
      dispatch(textCleared())
      message.success("问题添加成功");
    }
  };
  const Cancel = () => {
    dispatch(editorStatusUpdated("NotEdit"));
    dispatch(editorTypeUpdated(null));
    dispatch(textCleared())
    if (isUpdate) {
      setIsUpdate(false);
    }
  };

    return (
    <EditerInner>
      <EditorType >
        <span><MinusSquareOutlined style={{color: "#01bd78"}}/>&nbsp;文本题</span>
      </EditorType>
      <Form form={form} name="quesionItem" onFinish={onSubmit} initialValues={{title: text.title}}>
        <Form.Item 
          name="title" 
          style={{margin: "16px 0", height: "40px"}}
          rules={[
            {
              required: true,
              message: '请输入题目',
            },
          ]}
          >
        <EditorRowContent>
          <EditorRowTitle>题目</EditorRowTitle>
            <EditorInput
              value={text.title}
              onChange={(e) => {
                dispatch(titleUpdated(e.target.value));
              }}
            />
        </EditorRowContent>
        </Form.Item>
        <Form.Item name="remarks" style={{margin: "20px 0 16px", height: "40px"}}>
            <EditorRowContent>
              <Checkbox 
                style={{marginLeft: "40px"}}
                checked={text.isNecessary}
                onChange={(e) => {
                  dispatch(isNecessaryUpdated(e.target.checked))
                }}>
                必填
              </Checkbox>
              <Checkbox 
                checked={text.remarks === null ? false : true}
                onChange={(e) => {
                  dispatch(remarksUpdated(e.target.checked ? "" : null))
                }}
              >
                备注
              </Checkbox>
              {text.remarks === null ? false : true && (
                <EditorInput
                  value={text.remarks}
                  onChange={(e) => {
                    dispatch(remarksUpdated(e.target.value))
                  }}
                />
                )
              }
            </EditorRowContent>
        </Form.Item>
        <Form.Item name="remarks" style={{margin: "16px 0", height: "40px"}}>
            <EditorRowContent>
              <EditorLineHeight>文本框高度</EditorLineHeight>
              <InputNumber 
                value={text.lineHeight}
                min={1} 
                max={10}
                onChange={(value) => {
                  dispatch(lineHeightUpdated(value))
                }}
                style={{width: "80px"}}
              />
              <span>&nbsp;行</span>
            </EditorRowContent>
        </Form.Item>
        <Divider />
        <Form.Item>
          <div 
            style={{display: "flex", justifyContent: "center", height: "40px", marginBottom: "16px"}}>
              <Button 
                htmlType="submit" 
                type="primary" 
                style={{marginRight: "10px", height: "40px", width: "10vw", minWidth: "60px"}}
              >
                确定
              </Button>
              <Button 
                onClick={Cancel} 
                style={{marginLeft: "10px", height: "40px", width: "10vw", minWidth: "60px"}}
              >
                取消
              </Button>
              {/* 防抖 */}
          </div>
        </Form.Item>
      </Form>
    </EditerInner>);

};

const EditerInner = styled.div`
  box-sizing: border-box;
  user-select: none;
  width: 700px;
  margin: 0 auto;
  padding-top: 10px;
  margin-bottom: 20px;
  background: #eee;
  // color: #666;
`
const EditorType = styled.div`
  font-size: 16px;
  text-align: left;
  // background: skyblue;
`;

const EditorRowContent = styled.div`
  display: flex;
  flex: 1;
  height: 40px;
  align-items: center;
  // background: skyblue;
`;

const EditorRowTitle = styled.div`
  width: 40px;
  height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EditorLineHeight = styled.div`
  width: 80px;
  height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditorInput = styled(Input)`
  flex: 1;
  width: 100%;
  height: 100%;
`;