import { SingleQuesItem } from "./SingleQuesItem.jsx";

export const QuestionList = (props) => {
    const {
        questionList,
        setQuestionList,
        editorStatus,
        setEditorStatus,
        editorType,
        setEditorType,
    } = props;

    var initialId = 0;

    function generateId() {
        return ++initialId;
    }

    function generateKey() {
        return Number(Math.random().toString().slice(2, 7) + Date.now()).toString(36);
    }

    return(
        <div>
            {questionList.map((questionItem, index) => (
            <SingleQuesItem
                key={questionItem.no}
                ques_id={generateId()}
                questionItem={questionItem}
                questionList={questionList}
                setQuestionList={setQuestionList}
                editorStatus={editorStatus}
                setEditorStatus={setEditorStatus}
                editorType={editorType}
                setEditorType={setEditorType}
            />
            ))}
        </div>
    )
}