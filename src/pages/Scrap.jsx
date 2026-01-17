// pages/Scrap.jsx
import styled from "styled-components";
import { useState } from "react";

import useCustomFetch from "../utils/hooks/useCustomFetch";

import Scraped from "../components/scrap/Scraped";
import MenuTrigger from "../components/menu/MenuTrigger";
import TabBar from "../components/home/TabBar";
import ViewedModal from "../components/scrap/ViewedModal";
import KakaoBtn from "../components/myPage/KakaoBtn";
import Nothing from "../components/Nothing";

function Scrap() {
  const [login, setLogin] = useState(!!sessionStorage.getItem("accessToken"));
  const {
    data: scrapData,
    error,
    loading,
  } = useCustomFetch(`/scraps?pageNum=1&limit=10`);
  console.log(scrapData?.data.exhibitions);

  const { fetchData } = useCustomFetch();

  const handleDeleteBookmark = async (id) => {
    try {
      const response = await fetchData(`/scraps/${id}`, "DELETE", null);

      if (response?.status === 200) {
        console.log("북마크 삭제 완료");
        window.location.reload();
      } else {
        console.error("삭제 실패:", response);
      }
    } catch (error) {
      console.error("북마크 삭제 중 오류:", error);
    }
  };

  const [showViewedModal, setShowViewedModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleViewedChange = ({ newSeen, exhibitionId }) => {
    if (newSeen === true) {
      setShowViewedModal(true);
      setSelectedId(exhibitionId);
    }
  };

  return (
    <Container>
      {showViewedModal && (
        <ViewedModal
          onClose={() => setShowViewedModal(false)}
          exhibitionId={selectedId}
        >
          <p>관람내역에 저장되었어요</p>
          <p>관람 후 느낀 점을 남겨주세요!</p>
        </ViewedModal>
      )}

      <Header>
        <PageTitle>스크랩</PageTitle>
        <MenuTrigger variant="black" />
      </Header>

      {login ? (
        <Content>
          {scrapData?.data.exhibitions?.length === 0 ? (
            <Nothing text={"아직 스크랩한 글이 없어요"} />
          ) : (
            scrapData?.data.exhibitions?.map((data) => (
              <Scraped
                key={data.exhibitionId}
                exhibitionId={data.exhibitionId}
                title={data.exhibitionName}
                endDate={data.endDate}
                startDate={data.startDate}
                place={data.place}
                poster={data.posterUrl}
                scraped={true}
                viewed={data.viewed}
                reviewed={data.reviewed}
                onDelete={handleDeleteBookmark}
                onViewedChange={handleViewedChange}
              />
            ))
          )}
        </Content>
      ) : (
        <LoginContainer>
          <p>로그인 후 스크랩 기능을 이용해보세요!</p>
          <KakaoBtn />
        </LoginContainer>
      )}

      <TabBar />
    </Container>
  );
}

export default Scrap;

const Header = styled.div`
  width: 100%;
  height: 47px;
  padding: 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 12px 20px 0 20px;
  background: ${({ theme }) => theme.colors.white};
`;

const PageTitle = styled.h3`
  margin: 0 0 12px;
  font-weight: ${({ theme }) => theme.textStyles.headline1Bold};
  color: ${({ theme }) => theme.colors.gray10};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 80px;
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
