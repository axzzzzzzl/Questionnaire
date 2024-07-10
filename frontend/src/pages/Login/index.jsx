import styled from "@emotion/styled";
import { Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { post } from "../../services/axios";
import { message } from "antd";

export const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
      post("/login", values)?.then((res) => {
        message.success('登录成功!');
        localStorage.setItem('refresh_token', res.data.data.refresh_token)
        localStorage.setItem('access_token', res.data.data.access_token)
        navigate("/Questionnaire/", { replace: true });
      })
    }
    return (
        <Container>
          <ShadowCard>
              <Title>登录</Title>
              <Form onFinish={handleSubmit} initialValues={{ username: "admin", password: "123456"}}>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "请输入用户名" }]}
                >
                  <Input placeholder={"用户名"}  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "请输入密码" }]}
                >
                  <Input.Password placeholder={"密码"} />
                </Form.Item>
                <Form.Item>
                  <LongButton type="primary" htmlType={"submit"}>
                    登录
                  </LongButton>
                </Form.Item>
              </Form>
          </ShadowCard>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-width: 400px;
  min-height: 560px;
  text-align: center;
  background: #eee;
  overflow: auto;
`;

const ShadowCard = styled(Card)`
  flex: none;
  width: 400px;
  height: 560px;
  padding: 16px;
  border-radius: 3px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;

const Title = styled.div`
  margin: 3.2rem 0 2.4rem;
  font-size: 2.5rem;
  font-weight: 600;
  // font-family: SimSun;
`;

const LongButton = styled(Button)`
  width: 100%;
  height: 40px;
`;