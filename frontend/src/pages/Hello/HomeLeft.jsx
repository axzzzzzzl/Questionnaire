import styled from "@emotion/styled";
import {
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";

export const HomeLeft = (props) => {
    const navigate = useNavigate()
    const [choice, setChoice] = useState(1);
    const params = new URLSearchParams(window.location.search);
    
    const handleClick = () => {
        // navigate("/Questionnaire/create");
        window.location.href = '/Questionnaire/create';
    }

    const handleChoose = (index) => {
        setChoice(index);
        if (index === 1){
            params.set('left', 'all');
        }
        else if (index === 2){
            params.set('left', 'mycreate');
        }
        else if (index === 3){
            params.set('left', 'mywrite');
        }
        navigate(`/Questionnaire/?${ params.toString() }`);
    }

    useEffect(() => {
       setChoice(1) 
       if( params.get('left') === 'mycreate'){
           setChoice(2)
       }
       else if (params.get('left') === 'mywrite'){
           setChoice(3)
       }
    }, [])

    return (
        <Left>
            <CreateQuestionnaire onClick={handleClick}>新建</CreateQuestionnaire>
            <QuestionnaireList>
                <QuestionnaireItem selected={choice === 1} onClick={()=>handleChoose(1)}>所有问卷</QuestionnaireItem>
                <QuestionnaireItem selected={choice === 2} onClick={()=>handleChoose(2)}>我创建的</QuestionnaireItem>
                <QuestionnaireItem selected={choice === 3} onClick={()=>handleChoose(3)}>我填写的</QuestionnaireItem>
                <QuestionnaireItem selected={choice === 4} onClick={()=>handleChoose(4)}>问卷模板</QuestionnaireItem>
            </QuestionnaireList>
        </Left>
    )
}

const Left = styled.div`
  height: 100%;
  min-height: 600px;
  background: #eee;
  user-select: none;
`;
const CreateQuestionnaire = styled.div`
  width: 100%;
  height: 40px;
  background: #01bd78;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  color: white;
  font-size: 14px;
  &:hover {
      background: #1ac486;
  }
`
const QuestionnaireList = styled.div`
    width: 100%;
    height: calc(100% - 72px);
    margin: 16px 0;
    padding: 8px 0;
`
const QuestionnaireItem = styled.div`
    width: 100%;
    height: 32px;
    margin-bottom: 8px;
    border-radius: 5px;
    background: ${props => props.selected ? '#b3ebd7' : '#eee'};
    color: ${props => props.selected ? '#01aa6c' : 'black'};
    font-weight: ${props => props.selected ? 'bold' : 'normal'};
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background: ${props => props.selected ? '#b3ebd7' : '#d6d6d6'};
    }
`