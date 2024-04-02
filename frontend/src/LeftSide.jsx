import styled from "@emotion/styled";
import {
  CheckCircleOutlined,
  CheckSquareOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";
import { Tabs, message } from "antd";

export const LeftSide = (props) => {
    const {
        editorStatus,
        setEditorStatus,
        editorType,
        setEditorType,
        ques_no,
        setQuesno,
    } = props;

    const handleSingleChoiceClick= () => {
        if (editorStatus === "NotEdit") {
            setEditorType("SingleChoice");
            setEditorStatus("Edit");
            setQuesno(ques_no + 1);
        } else {
            // Modal.info({
            //   title: "提示",
            //   content: "仍有问题未编辑完成...",
            //   okText: "确定",
            // });
            message.error("仍有问题未编辑完成...")
        }
    }
    const handleMultipleChoiceClick= () => {
        if (editorStatus === "NotEdit") {
            setEditorType("MultipleChoice");
            setEditorStatus("Edit");
            setQuesno(ques_no + 1);
        } else {
            message.error("仍有问题未编辑完成...")
          }
    }
    const handleSingleLineTextClick= () => {
        if (editorStatus === "NotEdit") {
            setEditorType("SingleLineText");
            setEditorStatus("Edit");
            setQuesno(ques_no + 1);
        } else {
            message.error("仍有问题未编辑完成...")
            setEditorStatus("NotEdit");
        }
    }
    const items = [
        {
            key: "1",
            label: "问题控件",
            children:(
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Btn onClick={handleSingleChoiceClick}><CheckCircleOutlined />&nbsp;单选题</Btn>
                    <Btn onClick={handleMultipleChoiceClick}><CheckSquareOutlined />&nbsp;多选题</Btn>
                    <Btn onClick={handleSingleLineTextClick}><MinusSquareOutlined />&nbsp;文本题</Btn>
                </div>
            )
        },
        {
            key: "2",
            label: "问题大纲",
            children:(
                <div style={{textAlign: 'center', color: "#01bd78"}}>正在实现中...</div>
            )
        }
    ]

    return(
        <Left>
            <Tabs defaultActiveKey="1" centered items={items} />
        </Left>
    )
}

const Left = styled.div`
  border: 1px solid #eee;
  margin: 16px;
  height: 95vh;
  min-height: 600px;
  background: white;
  box-shadow: 0 3px 4px 0 grey;
  user-select: none;
`;

const Btn = styled.div`
    height: 40px;
    margin: 8px 16px;
    border: 1px solid #01bd78;
    border-radius: 2px;
    color: #01bd78;
    font-size: 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
    transition: all 0.5s ease-in-out, border-width 0.4s;
    &:hover {
        border-width: 3px;
        background: #34ca93;
        color: white;
    }
`;