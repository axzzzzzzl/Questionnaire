import { SingleQuesItem } from "./SingleQuesItem.jsx";
import { MultipleQuesItem } from "./MultipleQuesItem.jsx";
import { TextItem } from "./TextLtem.jsx"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { questionReordered } from './quesListSlice.jsx'
import { useSelector } from 'react-redux';

export const QuestionList = (props) => {

  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const questionnaire = useSelector(state => state.questionnaire.questions)
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    dispatch(questionReordered({
      startIndex: result.source.index,
      endIndex: result.destination.index,
    }));
  }
  return(
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="options">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {questionnaire.map((questionItem, index) => {
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
                          setDisabled={setDisabled}
                        />
                      }
                      {questionItem.type === 1 && 
                        <MultipleQuesItem
                          ques_id={index+1}
                          questionItem={questionItem}
                          setDisabled={setDisabled}
                        />
                      }
                      {questionItem.type === 2 && 
                        <TextItem
                          ques_id={index+1}
                          questionItem={questionItem}
                          setDisabled={setDisabled}
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