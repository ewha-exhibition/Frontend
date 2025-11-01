// src/components/layout/AppLayout.jsx
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TabBar from "../home/TabBar.jsx";

export default function AppLayout({ children }) {
  return (
    <PageShell>
      <AppShell>
        <Inner>{children}</Inner>
        <BottomBar>
          <TabBar />
        </BottomBar>
      </AppShell>
    </PageShell>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node,
};

/* 화면 전체 배경 + 가운데 정렬 */
const PageShell = styled.div`
  min-height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
`;

/* 가운데 떠 있는 폰 프레임 */
const AppShell = styled.div`
  position: relative;
  width: min(540px, 100vw);
  min-height: 100vh;
`;

/* 라우터가 그려주는 실제 페이지 공간 */
const Inner = styled.main`
  width: 100%;
  max-width: min(540px, 100vw);
  margin: 0 auto;
  padding-bottom: 50px;
`;

/* 하단 탭바 공통 */
const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(540px, 100vw);
  z-index: 100;
`;
