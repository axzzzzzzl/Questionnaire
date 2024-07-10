import styled from "@emotion/styled";
import { Card, Space, Table, Tag, Divider } from 'antd';
const { Meta } = Card;
import { useNavigate, useLocation } from "react-router-dom";
import template1 from "../../assets/template1.png";
import template2 from "../../assets/template2.png";
import template3 from "../../assets/template3.png";
import template4 from "../../assets/template4.png";
import template5 from "../../assets/template5.png";
import { get } from "../../services/axios";
import { useEffect, useState } from "react";

export const HomeMain = (props) => {
    const navigate = useNavigate()
    const params = new URLSearchParams(window.location.search);
    const left = params.get('left');
    const [questionnaireList, setQuestionnaireList] = useState([])

    useEffect(() => {
        if(left === "mycreate" || left === "mywrite"){     
            setQuestionnaireList([])
        }
        else {
            get("/questionnaire/list").then((res) => {
                setQuestionnaireList(res.data.data.result)
            })
        }
    },[left])

    return(
        <MainContent>
        <QuestionnaireTemplate>
            <TemplateTitle>
                <h2>推荐模板</h2>
                <a style={{color: "black"}} href="#">更多模板&nbsp;&gt;</a>
            </TemplateTitle>
            <TemplateContent>
                <TemplateCard
                    cover={<img alt="template1" src={ template1 } style={{height: "110px"}} />}
                    hoverable
                    styles={{body: {padding: "0"}}}
                    // onClick={() => alert("模板1")}
                >
                    <h4 style={{margin: "8px 0"}}>收集应聘简历</h4>
                </TemplateCard>
                <TemplateCard
                    cover={<img alt="template2" src={ template2 } style={{height: "110px"}} />}
                    hoverable
                    styles={{body: {padding: "0"}}}
                >
                    <h4 style={{margin: "8px 0"}}>签到考勤表</h4>
                </TemplateCard>
                <TemplateCard
                    cover={<img alt="template3" src={ template3 } style={{height: "110px"}} />}
                    hoverable
                    styles={{body: {padding: "0"}}}
                >
                    <h4 style={{margin: "8px 0"}}>大学生心理健康调查问卷</h4>
                </TemplateCard>
                <TemplateCard
                    cover={<img alt="template4" src={ template4 } style={{height: "110px"}} />}
                    hoverable
                    styles={{body: {padding: "0"}}}
                >
                    <h4 style={{margin: "8px 0"}}>大学生消费情况调查问卷</h4>
                </TemplateCard>
                <TemplateCard
                    cover={<img alt="template5" src={ template5 } style={{height: "110px"}} />}
                    hoverable
                    styles={{body: {padding: "0"}}}
                >
                    <h4 style={{margin: "8px 0"}}>大学生环保意识调查问卷</h4>
                </TemplateCard>
            </TemplateContent>
        </QuestionnaireTemplate>
        <QuestionnaireTable>  
            <QuestionnaireThead>问卷列表</QuestionnaireThead>
            <div style={{ padding: "0 8px 0 32px" }}> 
                <QuestionnaireDivider />
            </div>
            {
                questionnaireList.map((questionnaire, index) => {
                    return(
                        <div key={questionnaire?.id}>
                            <QuestionnaireItem 
                                onClick={() => {
                                    // navigate(`/Questionnaire/${questionnaire?.id}/edit`)
                                    window.location.href = `/Questionnaire/${questionnaire?.id}/edit`
                                }}
                            >
                                <QuestionnaireTitle>{ questionnaire?.title }</QuestionnaireTitle>
                            </QuestionnaireItem>
                            <div style={{ padding: "0 8px 0 32px" }}>      
                                <QuestionnaireDivider />
                            </div>
                        </div>
                    )
                })
            }
        </QuestionnaireTable>
        </MainContent>
    )
}

const MainContent = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    min-width: 875px;
`
const QuestionnaireTemplate = styled.div`
    width: 100%;
    min-width: 875px;
    height: 264px;
    margin: 20px 0;
`
const QuestionnaireTable = styled.div`
    width: 100%;
    min-width: 875px;
    padding: 10px 32px 10px 8px;
`
const QuestionnaireThead = styled.div`
    padding: 0 32px;
    height: 40px;
    width: 100%;
    // background: skyblue;
    display: flex;
    align-items: center;
    font-size: 16px;
    user-select: none;
`
const QuestionnaireItem = styled.div`
    width: 100%;
    height: 60px;
    padding: 0 32px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover{
        background: #f1f1f1;
    }
`
const QuestionnaireTitle = styled.h3`
    user-select: none;
    &:hover{
        color: #01bd78;
    }
`
const QuestionnaireDivider = styled(Divider)`
    background: #f1f1f1;
    margin: 0;
`
const TemplateTitle = styled.div`
    padding: 0 40px;
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const TemplateContent = styled.div`
    height: 200px;
    padding: 0 40px;
    display: flex;
    justify-content: flex-start;
`
const TemplateCard = styled(Card)`
    box-shadow: 0 0.5px 1px 0 #999;
    width: 240px;
    min-width: 180px;
    height: 150px;
    border-radius: 10px;
    margin-right: 25px;
    &:last-child{
        margin-right: 0;
    }
    @media screen and (max-width: 1417px) {
        &:nth-of-type(5){
            display: none;
        }
        &:nth-of-type(4){
            margin-right: 0;
        }
    }
`