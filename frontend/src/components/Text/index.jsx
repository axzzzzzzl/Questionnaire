import styled from "@emotion/styled";
import {
    MinusSquareOutlined
} from "@ant-design/icons";
import { Input, Checkbox, Button, Form, Divider, message, InputNumber } from "antd";
import React, { useState } from "react";

export const Text = (props) => {
  const {
    questionList,
    setQuestionList,
    editorStatus,
    setEditorStatus,
    editorType,
    setEditorType,
    currTextQues,
    isUpdate,
    setIsUpdate
  } = props;

  const [form] = Form.useForm();
  const [title, setTitle] = useState(currTextQues.title);
  const [remarks, setRemarks] = useState(currTextQues.remarks);
  const [isNecessary, setIsNecessary] = useState(currTextQues.isNecessary);
  const [hasRemarks, setHasRemarks] = useState(
    currTextQues.remarks === null ? false : true
  );
  const [lineHeight, setLineHeight] = useState(currTextQues.lineHeight);

  const onSubmit = () => {
    const questionItem = {
      id: currTextQues.id,
      type: currTextQues.type,
      title: title,
      remarks: hasRemarks ? remarks : null,
      isNecessary: isNecessary,
      lineHeight: lineHeight,
    };
    if (isUpdate && questionItem === currTextQues){
      setEditorStatus("NotEdit");
      setEditorType(null);
      setIsUpdate(false);
      message.success("问卷并未修改")
    }
    else if(isUpdate && questionItem !== currTextQues){
      let newQuestionList = questionList.map((item) => {
        if (item.no === questionItem.no) {
          return questionItem;
        }
        return item;
      })
      setQuestionList(newQuestionList);
      setEditorStatus("NotEdit");
      setEditorType(null);
      setIsUpdate(false);
      message.success("问题修改成功")
    }
    else{
      questionList.push(questionItem);
      setQuestionList(questionList);
      setEditorStatus("NotEdit");
      setEditorType(null);
      message.success("问题添加成功")
    }

  };
  const Cancel = () => {
    setEditorStatus("NotEdit");
    setEditorType(null);
    if (isUpdate) {
      setQuestionList(questionList);
      setIsUpdate(false);
    }
  };

    return (
    <EditerInner>
      <EditorType >
        <span><MinusSquareOutlined style={{color: "#01bd78"}}/>&nbsp;文本题</span>
      </EditorType>
      <Form form={form} name="quesionItem" onFinish={onSubmit} initialValues={{title: title}}>
        <Form.Item 
          name="title" 
          value={title}
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
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
        </EditorRowContent>
        </Form.Item>
        <Form.Item name="remarks" style={{margin: "16px 0", height: "40px"}}>
            <EditorRowContent>
              <Checkbox 
                style={{marginLeft: "40px"}}
                checked={isNecessary}
                onChange={(e) => {
                  setIsNecessary(e.target.checked);
                }}>
                必填
              </Checkbox>
              <Checkbox 
                checked={hasRemarks}
                onChange={(e) => {
                  setHasRemarks(e.target.checked);
                }}
              >
                备注
              </Checkbox>
              {hasRemarks && (
                <EditorInput
                  value={remarks}
                  onChange={(e) => {
                    setRemarks(e.target.value);
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
                value={lineHeight}
                min={1} 
                max={10}
                onChange={(value) => {
                  setLineHeight(value);
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