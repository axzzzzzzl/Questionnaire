import React from 'react';
import styled from "@emotion/styled";
import { Layout, ConfigProvider, Popover, Divider } from 'antd';
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useOutlet, Navigate, useLoaderData } from "react-router-dom";

const { Header } = Layout;

export const ProtectedLayout = () => {
  // console.log("经过ProtectedLayout")
  const outlet = useOutlet();
  const navigate = useNavigate();
  const { userPromise } = useLoaderData();

  if (!userPromise) {
    return <Navigate to="/Questionnaire/login" replace />;
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate("/Questionnaire/login", { replace: true });
  };
  
  const content = (
    <>
    <h4 style={{margin: "-5px 0 5px 10px"}}>账号管理</h4>
    <UserContent>
      <UserInner>
        <UserIcon><UserOutlined /></UserIcon>
        个人中心&nbsp;[ {userPromise} ]
      </UserInner>
      <Divider style={{ margin: '4px 0' }} />
      <UserInner onClick={logout}>
        <UserIcon><PoweroffOutlined /></UserIcon>
        退出登录
        </UserInner>
    </UserContent>
    </>
  )
  return (
    <ConfigProvider
      theme={{
        token: {
        colorPrimary: '#01bd78', borderRadius: 2,
        },
      }}
    >
      <Layout style={{ width: "100%", height: "100%"}}>
        <ProtectedHeader>
          <p></p>
          <Popover 
            content={content} 
            arrow={false} 
            trigger="hover" 
            placement='bottomLeft' 
            color={'#eee'}
          >
            <UserItem>
              <UserOutlined style={{ fontSize: '17px', color: '#666'}} />
            </UserItem>
          </Popover> 
        </ProtectedHeader>
          {outlet}
      </Layout>
    </ConfigProvider>
  );
};

const ProtectedHeader = styled(Header)`
  padding: 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #eee;
  height: 50px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
`
const UserItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-right: 40px;
  border-radius: 50%;
  background: #fff;
`
const UserContent = styled.div`
  width: 225px;
  background: #fff;
  border-radius: 5px;
  padding: 3px;
`
const UserInner = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  &:hover {
    background: #eee;
  }
`
const UserIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`