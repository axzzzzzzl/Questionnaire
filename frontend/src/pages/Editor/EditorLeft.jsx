import styled from "@emotion/styled";
import {
  CheckCircleOutlined,
  CheckSquareOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";
import { Tabs, message } from "antd";
import { useSelector, useDispatch} from 'react-redux';
import { editorStatusUpdated, editorTypeUpdated } from '../../components/editStatusSlice';

export const EditorLeft = (props) => {

    const status = useSelector(state => state.editStatus)
    const dispatch = useDispatch()

    const handleSingleChoiceClick= () => {
        if (status.editorStatus === "NotEdit") {
            dispatch(editorStatusUpdated("Edit"));
            dispatch(editorTypeUpdated("SingleChoice"));
        } else {
            message.error("仍有问题未编辑完成...")
        }
    }
    const handleMultipleChoiceClick= () => {
        if (status.editorStatus === "NotEdit") {
            dispatch(editorStatusUpdated("Edit"));
            dispatch(editorTypeUpdated("MultipleChoice"));
        } else {
            message.error("仍有问题未编辑完成...")
          }
    }
    const handleSingleLineTextClick= () => {
        if (status.editorStatus === "NotEdit") {
            dispatch(editorStatusUpdated("Edit"));
            dispatch(editorTypeUpdated("Text"));
        } else {
            message.error("仍有问题未编辑完成...")
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
    border: 1.5px solid #01bd78;
    border-radius: 2px;
    color: #01bd78;
    font-size: 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out, border-width 0.1s;
    &:hover {
        border-width: 3px;
        background: #34ca93;
        color: white;
    }
`;