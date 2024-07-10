import styled from "@emotion/styled";
import zhCN from 'antd/locale/zh_CN';
import React, { useState, useEffect, useRef } from "react";
import { Layout, ConfigProvider, Tooltip, message } from "antd";
import { HomeLeft } from "./HomeLeft";
import { HomeMain } from "./HomeMain";

export const Hello = () => {
    return (
        <ConfigProvider
          theme={{
            token: { colorPrimary: '#01bd78' , borderRadius: 7, fontSize: 14 },
          }}
          locale={zhCN}
        >
          <Main>
            <Sider>
              <HomeLeft />
            </Sider>
            <Content>
              <HomeMain />
            </Content>
          </Main>
        </ConfigProvider>
    )
}
const Main = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  overflow: hidden;
  display: flex;
  background: #eee;
  text-align: center;
`
const Sider = styled.div`
  width: 240px;
  height: 100%;
  margin: 0 16px;
  @media screen and (max-width: 1160px) {
    flex: 1;
    width: auto;
    min-width: 150px;
    max-width: 240px;
  }
`
const Content = styled.div`
  width: calc(100% - 288px);
  height: 100%;
  margin-right: 16px;
  background: white;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 3px 2px 0 grey;
  overflow-y: hidden;
  overflow-x: auto;
  @media screen and (max-width: 1160px) {
    width: 875px;
  }
  @media screen and (max-width: 1070px) {
    width: calc(100% - 198px);
  }
`