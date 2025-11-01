import PropTypes from "prop-types";
import styled from "styled-components";

export default function AppLayout({ children }) {
  return (
    <PageShell>
      <AppShell>
        <Inner>{children}</Inner>
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
