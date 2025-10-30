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

/* 페이지가 실제로 그려지는 박스 */
const Inner = styled.main`
  width: 100%;
  max-width: min(540px, 100vw); /* 혹시나 자식이 100vw 해도 여기서 컷 */
  margin: 0 auto; /* 실제 중앙 정렬 포인트 */
  padding-top: 46px; /* 헤더 높이 */
  padding-bottom: 50px; /* 탭바 높이 */

  /* 페이지에서 width: 100vw 해버린 경우 대비 */
  & > * {
    max-width: 100%;
  }
`;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(540px, 100vw);
  z-index: 100;
`;
