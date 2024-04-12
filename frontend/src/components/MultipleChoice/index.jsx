import styled from "@emotion/styled";
import {
  CheckSquareOutlined,
  PlusSquareOutlined,
  CloseOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Input, Checkbox, Button, Form, Divider, message } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import BatchEditModal from "../BatchEditModal";
let nextId = 3;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const MultipleChoice = (props) => {
  const {
    questionList,
    setQuestionList,
    editorStatus,
    setEditorStatus,
    editorType,
    setEditorType,
    currMultipleChoiceQues,
    isUpdate,
    setIsUpdate
  } = props;

  const [form] = Form.useForm();
  const [title, setTitle] = useState(currMultipleChoiceQues.title);
  const [remarks, setRemarks] = useState(currMultipleChoiceQues.remarks);
  const [option, setOption] = useState(
    JSON.parse(JSON.stringify(currMultipleChoiceQues.option))//深拷贝(option无需深拷贝)
  );
  const [isNecessary, setIsNecessary] = useState(currMultipleChoiceQues.isNecessary);
  const [hasRemarks, setHasRemarks] = useState(
    currMultipleChoiceQues.remarks === null ? false : true
  );
  const [open, setOpen] = useState(false);//批量编辑Modal显示
  const [mutiOption, setMutiOption] = useState("");//批量编辑

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    let newOptions = reorder(
      option,
      result.source.index,
      result.destination.index
    );
    setOption(newOptions);
  }

  function generateKey() {
    return Number(Math.random().toString().slice(2, 7) + Date.now()).toString(36);
  }

  const add = () => {
    let newChoices = [...option, { id: (nextId++).toString(), text: "" }];
    form.setFieldsValue({ option: newChoices });
    return setOption(newChoices);
  };
  const del = (deleteId) => {
    let newChoices = option.filter((item) => item.id !== deleteId);
    form.setFieldsValue({ option: newChoices });
    return setOption(newChoices);
  };
  const addOther = () => {
    let newChoices = [...option, { id: (nextId++).toString(), text: "其他" }];
    form.setFieldsValue({ option: newChoices });
    return setOption(newChoices);
  };

  const handleChange = (id, e) => {
    let newChoices = option.map((item) => {
      if (item.id === id) {
        return { ...item, text: e.target.value };
      }
      return item;
    })
    setOption(newChoices);
  };

  const onSubmit = () => {
    const questionItem = {
      id: currMultipleChoiceQues.id,
      type: currMultipleChoiceQues.type,
      title: title,
      remarks: hasRemarks ? remarks : null,
      isNecessary: isNecessary,
      option: option,
    };
    if (isUpdate && questionItem === currMultipleChoiceQues){
      setEditorStatus("NotEdit");
      setEditorType(null);
      setIsUpdate(false);
      message.success("问卷并未修改")
    }
    else if(isUpdate && questionItem !== currMultipleChoiceQues){
      let newQuestionList = questionList.map((item) => {
        if (item.id === questionItem.id) {
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

  const handleClick = () => {
    setOpen(true);
    setMutiOption(option.map((item) => item.text).join("\n"));
  }
  const handleCancel = () => {
    setOpen(false);
  }

    return (
    <EditerInner>
      <EditorType >
        <span><CheckSquareOutlined style={{color: "#01bd78"}}/>&nbsp;多选题</span>
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
        <Form.Item name="remarks" style={{margin: "16px 0 8px 0", height: "40px"}}>
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
                  // defaultValue={remarks}
                  value={remarks}
                  onChange={(e) => {
                    setRemarks(e.target.value);
                  }}
                />
                )
              }
            </EditorRowContent>
        </Form.Item>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="options">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {
                  option.map((item, index) => {
                    return(
                      <Draggable draggableId={item.id} key={item.id} index={index}>
                      {provided => (
                        <EditorRowContentDND
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <EditorRowTitle>
                            <UnorderedListOutlined style={{color: "#01bd78", fontSize: "20px"}}/>
                          </EditorRowTitle>
                          <EditorInput
                            value={item.text}
                            placeholder="选项"
                            onChange={(e) => {
                              handleChange(item.id, e);
                            }}
                          />
                          <EditorRowTitle 
                            onClick={() => del(item.id)}>
                            <CloseOutlined style={{color: "#01bd78", fontSize: "20px"}}/>
                          </EditorRowTitle>
                        </EditorRowContentDND>
                        // </Form.Item>
                      )}
                    </Draggable>
                    )
                  })
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Form.Item style={{margin: "8px 0", height: "40px"}}>
            <EditorRowContent>
              <Button 
                type="dashed" 
                style={{margin: "0 40px", width: "100%"}} 
                onClick={add}
              >
              <PlusSquareOutlined 
                style={{color: "#01bd78"}}
              />
              新建选项
              </Button>
            </EditorRowContent>
        </Form.Item>
        <Form.Item style={{margin: 0, height: "40px"}}>
            <EditorRowContent>
              <a onClick={handleClick} style={{marginLeft: 40, color: "#01bd78"}}>批量编辑</a>
              <a onClick={addOther} style={{marginLeft: 20, color: "#01bd78"}}>“其他”选项</a>
              <BatchEditModal 
                open={open} 
                onCancel={handleCancel} 
                setOption={setOption} 
                mutiOption={mutiOption} 
                setMutiOption={setMutiOption}/>
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

const EditorRowContentDND = styled.div`
  display: flex;
  flex: 1;
  height: 56px;
  align-items: center;
  padding: 8px 0;
  // background: red;
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