import styled from "@emotion/styled";
import {
  CheckCircleOutlined,
  PlusSquareOutlined,
  CloseOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Input, Checkbox, Button, Form, Divider, Modal, message } from "antd";
import { useState } from "react";

export const SingleChoice = (props) => {
  const {
    questionList,
    setQuestionList,
    editorStatus,
    setEditorStatus,
    editorType,
    setEditorType,
    currQues,
    isUpdate,
    setIsUpdate
  } = props;

  const [form] = Form.useForm();
  const [title, setTitle] = useState(currQues.title);
  const [remarks, setRemarks] = useState(currQues.remarks);
  const [option, setOption] = useState(
    JSON.parse(JSON.stringify(currQues.option))
  );
  const [isNecessary, setIsNecessary] = useState(currQues.isNecessary);
  const [hasRemarks, setHasRemarks] = useState(
    currQues.remarks === null ? false : true
  );

  function generateKey() {
    return Number(Math.random().toString().slice(2, 7) + Date.now()).toString(36);
  }

  const add = () => {
    let newChoices = [...option, { no: generateKey(), text: "" }];
    form.setFieldsValue({ option: newChoices });
    return setOption(newChoices);
  };
  const del = (deleteId) => {
    let newChoices = option.filter((item) => item.no !== deleteId);
    form.setFieldsValue({ option: newChoices });
    return setOption(newChoices);
  };

  const onChange = (no, e) => {
    const choice = option.find((item) => item.no === no);
    choice["text"] = e.target.value;
  };
  const onBlur = () => {
    setOption(option);
  };

  const onSubmit = () => {
    const questionItem = {
      no: currQues.no,
      type: 0,
      title: title,
      remarks: hasRemarks ? remarks : null,
      isNecessary: isNecessary,
      option: option,
    };
    if (isUpdate && questionItem === currQues){
      setEditorStatus("NotEdit");
      setEditorType(null);
      setIsUpdate(false);
      message.success("问卷并未修改")
    }
    else if(isUpdate && questionItem !== currQues){
      var editQues = questionList.find((ques) => ques.no === questionItem.no);
      editQues.title = questionItem.title;
      editQues.isNecessary = questionItem.isNecessary;
      editQues.remarks = questionItem.remarks;
      editQues.option = questionItem.option;
      setQuestionList(questionList);
      setEditorStatus("NotEdit");
      setEditorType(null);
      setIsUpdate(false);
      message.success("问卷修改成功")
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
        <span><CheckCircleOutlined style={{color: "#01bd78"}}/>&nbsp;单选题</span>
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
              defaultValue={title}
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
              {hasRemarks ? (
                <EditorInput
                  defaultValue={remarks}
                  onChange={(e) => {
                    setRemarks(e.target.value);
                  }}
                />
                ) : (
                  <></>
              )}
            </EditorRowContent>
        </Form.Item>
        {/* <ul> */}
          {option.map((item, index) => (
            <Form.Item name={["option", item.no, "text"]} index={index} key={item.no} style={{margin: "16px 0", height: "40px"}}>
              <EditorRowContent>
                <EditorRowTitle><UnorderedListOutlined style={{color: "#01bd78", fontSize: "20px"}}/></EditorRowTitle>
                <EditorInput
                  defaultValue={item.text}
                  placeholder="选项"
                  onChange={(e) => {
                    onChange(item.no, e);
                  }}
                  onBlur={() => {
                    onBlur();
                  }}
                />
                <EditorRowTitle onClick={() => del(item.no)}><CloseOutlined style={{color: "#01bd78", fontSize: "20px"}}/></EditorRowTitle>
              </EditorRowContent>
              
            </Form.Item>
          ))}
        {/* </ul> */}
        <Form.Item>
            <EditorRowContent>
              <Button type="dashed" style={{margin: "0 40px", width: "100%"}} onClick={add}><PlusSquareOutlined style={{color: "#01bd78"}}/>新建选项</Button>
            </EditorRowContent>
        </Form.Item>
        <Divider />
        <Form.Item>
          <div style={{display: "flex", justifyContent: "center", height: "40px", marginBottom: "16px"}}>
              <Button htmlType="submit" type="primary" style={{marginRight: "10px", height: "40px", width: "10vw"}}>确定</Button>
              <Button onClick={Cancel} style={{marginLeft: "10px", height: "40px", width: "10vw"}}>取消</Button>
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
  // background: skyblue;
  align-items: center;
`;

const EditorRowTitle = styled.div`
  width: 40px;
  height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditorInput = styled(Input)`
  // display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
`;