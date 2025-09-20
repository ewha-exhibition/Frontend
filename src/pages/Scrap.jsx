import styled from "styled-components";

import Hamburger from "../assets/icons/HamburgerMenu.svg?react";

//npm install vite-plugin-svgr
import Scraped from "../components/Scraped";

import poster1 from "../assets/mock/poster1.jpg";
import poster2 from "../assets/mock/poster2.jpg";
import poster3 from "../assets/mock/poster3.jpg";

function Scrap() {
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
    ],
  };

  return (
    <Container>
      <Header>
        <Title>스크랩</Title>
        <Hamburger height={24} />
      </Header>

      <Content>
        {mock_data?.result.map((data) => (
          <Scraped
            key={data.id}
            title={data.title}
            date={data.date}
            place={data.place}
            poster={data.poster}
            onGoing={data.onGoing}
          />
        ))}
      </Content>
    </Container>
  );
}
export default Scrap;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 20px 20px 0px 20px;
`;
const Header = styled.div`
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  margin-bottom: 6px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.gray10};
  font-size: ${({ theme }) => theme.font.fontSize.headline20};
  font-weight: ${({ theme }) => theme.font.lineHeight.normal};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
