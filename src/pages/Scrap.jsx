// pages/Scrap.jsx
import styled from "styled-components";
import useCustomFetch from "../utils/hooks/useCustomFetch";

import Scraped from "../components/Scraped";
import MenuTrigger from "../components/menu/MenuTrigger";
import TabBar from "../components/home/TabBar";

import poster1 from "../assets/mock/poster1.jpg";
import poster2 from "../assets/mock/poster2.jpg";
import poster3 from "../assets/mock/poster3.jpg";

function Scrap() {
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

  const mock_data = {
    response: 200,
    result: [
      {
        id: 1,
        title: "Pile up strands - 섬유예술 전공 과제전시회 어쩌고저쩌고 텍스트",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster1,
        scraped: true,
        onGoing: true,
      },
      {
        id: 2,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.09.10-09.11",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster2,
        scraped: true,
        onGoing: false,
      },
      {
        id: 3,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster3,
        scraped: true,
        onGoing: true,
      },
      {
        id: 4,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster3,
        scraped: true,
        onGoing: true,
      },
    ],
  };

  return (
    <Container>
      <Header>
        <PageTitle>스크랩</PageTitle>
        <MenuTrigger variant="black" />
      </Header>

      <Content>
        {scrapData?.data.exhibitions.map((data) => (
          <Scraped
            key={data.exhibitionId}
            title={data.exhibitionName}
            endDate={data.endDate}
            startDate={data.startDate}
            place={data.place}
            poster={data.posterUrl}
            scraped={true}
            onDelete={handleDeleteBookmark}
          />
        ))}
      </Content>
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
  min-height: calc(100vh - 46px - 50px);
  padding: 12px 20px 0 20px;
  background: #fff;
`;

const PageTitle = styled.h3`
  margin: 0 0 12px;
  ${({ theme }) => theme.textStyles.headline1Bold};
  color: ${({ theme }) => theme.colors.gray10};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
