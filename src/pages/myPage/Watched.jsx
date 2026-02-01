import styled from "styled-components";

import useCustomFetch from "../../utils/hooks/useCustomFetch";
import useLogin from "../../utils/hooks/useLogin";

import Topbar from "../../components/Topbar";
import WatchedHis from "../../components/myPage/WatchedHis";
import KakaoBtn from "../../components/myPage/KakaoBtn";
import Nothing from "../../components/Nothing";

function Watched() {
  const login = useLogin();
  const {
    data: myWatchedData,
    error,
    loading,
  } = useCustomFetch(`/scraps/viewed?pageNum=0&limit=10`);

  console.log(myWatchedData?.data.exhibitions);

  return (
    <Container>
      <Topbar title={"관람 내역"} icon={null} />
      {login ? (
        <Content>
          {myWatchedData?.data.exhibitions?.length === 0 ? (
            <Nothing text={"아직 관람한 공연이 없어요"} />
          ) : (
            myWatchedData?.data.exhibitions.map((data) => (
              <WatchedHis
                key={data.exhibitionId}
                exhibitionId={data.exhibitionId}
                title={data.exhibitionName}
                startDate={data.startDate}
                endDate={data.endDate}
                place={data.place}
                poster={data.posterUrl}
                haveReview={data.reviewed}
              />
            ))
          )}
        </Content>
      ) : (
        <LoginContainer>
          <p>로그인 후 기능을 이용해보세요!</p>
          <KakaoBtn />
        </LoginContainer>
      )}
    </Container>
  );
}

export default Watched;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 46px;

  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  padding: 0px 20px 0px 20px;
`;
const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 12px;

  margin-bottom: 60px;

  text-align: center;
  p {
    font-weight: ${({ theme }) => theme.textStyles.semiBold};
    color: ${({ theme }) => theme.colors.gray7};
  }
`;
