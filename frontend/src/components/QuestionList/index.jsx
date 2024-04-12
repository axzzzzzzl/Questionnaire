import { SingleQuesItem } from "./SingleQuesItem.jsx";
import { MultipleQuesItem } from "./MultipleQuesItem.jsx";
import { TextItem } from "./TextLtem.jsx"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};

export const QuestionList = (props) => {
    const {
        questionList,
        setQuestionList,
        editorStatus,
        setEditorStatus,
        editorType,
        setEditorType,
    } = props;

    const [disabled, SetDisabled] = useState(false);

    function onDragEnd(result) {
        if (!result.destination) {
          return;
        }
        if (result.destination.index === result.source.index) {
          return;
        }
        let newQuestionList = reorder(
          questionList,
          result.source.index,
          result.destination.index
        );
        setQuestionList(newQuestionList);
    
    }
    return(
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="options">
                {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {questionList.map((questionItem, index) => {
                        return(
                        <Draggable draggableId={questionItem.id} key={questionItem.id} index={index} isDragDisabled={disabled}>
                        {provided => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                {questionItem.type === 0 && 
                                <SingleQuesItem
                                  ques_id={index+1}
                                  questionItem={questionItem}
                                  questionList={questionList}
                                  setQuestionList={setQuestionList}
                                  editorStatus={editorStatus}
                                  setEditorStatus={setEditorStatus}
                                  editorType={editorType}
                                  setEditorType={setEditorType}

                                  disabled={disabled}
                                  SetDisabled={SetDisabled}
                                />
                                }
                                {questionItem.type === 1 && 
                                <MultipleQuesItem
                                  ques_id={index+1}
                                  questionItem={questionItem}
                                  questionList={questionList}
                                  setQuestionList={setQuestionList}
                                  editorStatus={editorStatus}
                                  setEditorStatus={setEditorStatus}
                                  editorType={editorType}
                                  setEditorType={setEditorType}

                                  disabled={disabled}
                                  SetDisabled={SetDisabled}
                                />
                                }
                                {questionItem.type === 2 && 
                                <TextItem
                                  ques_id={index+1}
                                  questionItem={questionItem}
                                  questionList={questionList}
                                  setQuestionList={setQuestionList}
                                  editorStatus={editorStatus}
                                  setEditorStatus={setEditorStatus}
                                  editorType={editorType}
                                  setEditorType={setEditorType}

                                  disabled={disabled}
                                  SetDisabled={SetDisabled}
                                />
                                }
                            </div>
                        )}
                        </Draggable>
                        )
                    })}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}