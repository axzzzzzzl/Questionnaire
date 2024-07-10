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
import { useDispatch, useSelector } from 'react-redux'
import { questionAdded, questionUpdated } from '../QuestionList/quesListSlice'
import { 
  titleUpdated, 
  remarksUpdated,
  isNecessaryUpdated,
  optionAdded, 
  optionDeleted, 
  optionReordered,
  optionUpdated,
  multipleChoiceCleared,
  optionOtherAdded 
} from "./multipleSlice";
import { editorStatusUpdated, editorTypeUpdated } from "../editStatusSlice";

export const MultipleChoice = (props) => {
  const {
    isUpdate,
    setIsUpdate
  } = props;

  const multipleChoice = useSelector(state => state.multipleChoice);
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);//批量编辑Modal显示
  const [mutiOption, setMutiOption] = useState("");//批量编辑

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    dispatch(optionReordered({
      startIndex: result.source.index,
      endIndex: result.destination.index
    }))
  }

  const add = () => {
    dispatch(optionAdded());
  };
  const del = (deleteId) => {
    dispatch(optionDeleted(deleteId));
  };
  const addOther = () => {
    dispatch(optionOtherAdded());
  };

  const onSubmit = () => {
    if(isUpdate){
      dispatch(editorStatusUpdated("NotEdit"));
      dispatch(editorTypeUpdated(null));
      setIsUpdate(false);
      dispatch(questionUpdated(multipleChoice))
      dispatch(multipleChoiceCleared())
      message.success("问题修改成功")
    }
    else{
      dispatch(editorStatusUpdated("NotEdit"));
      dispatch(editorTypeUpdated(null));
      dispatch(questionAdded(multipleChoice))
      dispatch(multipleChoiceCleared())
      message.success("问题添加成功");
    }
  };
  const Cancel = () => {
    dispatch(editorStatusUpdated("NotEdit"));
    dispatch(editorTypeUpdated(null));
    dispatch(multipleChoiceCleared())
    if (isUpdate) {
      setIsUpdate(false);
    }
  };

  const handleClick = () => {
    setOpen(true);
    setMutiOption(multipleChoice.options.map((item) => item.text).join("\n"));
  }
  const handleCancel = () => {
    setOpen(false);
  }

    return (
    <EditerInner>
      <EditorType >
        <span><CheckSquareOutlined style={{color: "#01bd78"}}/>&nbsp;多选题</span>
      </EditorType>
      <Form form={form} name="quesionItem" onFinish={onSubmit} initialValues={{title: multipleChoice.title}}>
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
              value={multipleChoice.title}
              onChange={(e) => {
                dispatch(titleUpdated(e.target.value));
              }}
            />
        </EditorRowContent>
        </Form.Item>
        <Form.Item name="remarks" style={{margin: "20px 0 8px 0", height: "40px"}}>
            <EditorRowContent>
              <Checkbox 
                style={{marginLeft: "40px"}}
                checked={multipleChoice.isNecessary}
                onChange={(e) => {
                  dispatch(isNecessaryUpdated(e.target.checked))
                }}>
                必填
              </Checkbox>
              <Checkbox 
                checked={multipleChoice.remarks === null ? false : true}
                onChange={(e) => {
                  dispatch(remarksUpdated(e.target.checked ? "" : null))
                }}
              >
                备注
              </Checkbox>
              {multipleChoice.remarks === null ? false : true && (
                <EditorInput
                  value={multipleChoice.remarks}
                  onChange={(e) => {
                    dispatch(remarksUpdated(e.target.value))
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
                  multipleChoice.options.map((item, index) => {
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
                              dispatch(optionUpdated({
                                id: item.id,
                                text: e.target.value
                              }))
                            }}
                          />
                          <EditorRowTitle 
                            onClick={() => del(item.id)}>
                            <CloseOutlined style={{color: "#01bd78", fontSize: "20px", cursor: "pointer"}}/>
                          </EditorRowTitle>
                        </EditorRowContentDND>
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
                mutiOption={mutiOption} 
                setMutiOption={setMutiOption}
              />
            </EditorRowContent>
        </Form.Item>
        <Divider />
        <Form.Item>
          <div 
            style={{display: "flex", justifyContent: "center", height: "40px", marginBottom: "16px"}}>
              <Button 
                htmlType="submit" 
                type="primary" 
                style={{marginRight: "10px", height: "40px", width: "20%", minWidth: "60px"}}
              >
                确定
              </Button>
              <Button 
                onClick={Cancel} 
                style={{marginLeft: "10px", height: "40px", width: "20%", minWidth: "60px"}}
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
  width: 85%;
  max-width: 700px;
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