import styled from "styled-components";

import Topbar from "../../components/Topbar";
import ShowItem from "../../components/myPage/ShowItem";

import poster1 from "../../assets/mock/poster1.jpg";
import poster2 from "../../assets/mock/poster2.jpg";
import poster3 from "../../assets/mock/poster3.jpg";
import poster4 from "../../assets/mock/poster4.jpg";

function MyShow() {
  const mock_data = {
    response: 200,
    result: [
      {
        id: 1,
        title: "Pile up strands - 섬유예술 전공 과제전시회 어쩌고저쩌고 텍스트",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster1,
        haveReview: false,
        onGoing: true,
        code: "1246AUED",
      },
      {
        id: 2,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.09.10-09.11",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster2,
        haveReview: true,
        onGoing: false,
        code: "1246AUED",
      },
      {
        id: 3,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster3,
        haveReview: true,
        onGoing: true,
        code: "1246AUED",
      },
      {
        id: 4,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster4,
        haveReview: false,
        onGoing: false,
        code: "1246AUED",
      },
      {
        id: 5,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster4,
        haveReview: false,
        onGoing: false,
        code: "1246AUED",
      },
    ],
  };

  return (
    <Container>
      <Topbar title={"내 공연/전시"} icon={"none"} />

      <Content>
        {mock_data?.result.map((data) => (
          <ShowItem
            key={data.id}
            title={data.title}
            date={data.date}
            place={data.place}
            poster={data.poster}
            onGoing={data.onGoing}
            code={data.code}
          />
        ))}
        <Noti>
          <p>초대코드란?</p>
          <li>공연/전시 홍보글을 등록한 사람에게 주어지는 공유용 코드예요.</li>
          <li>초대코드를 입력하면 글 등록자와 같은 권한(글 수정, 삭제, 대댓글 작성 등)을 가질 수 있어요.</li>
        </Noti>
      </Content>
    </Container>
  );
}

export default MyShow;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding-top: 46px;

  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;
const Noti = styled.div`
  height: 162px;
  padding: 10px;
  margin: 14px 0;

  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.Primary5};

  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    color: ${({ theme }) => theme.colors.SubColor2};
    font-size: ${({ theme }) => theme.font.fontSize.title15};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
    margin-bottom: 12px;
  }

  li {
    color: ${({ theme }) => theme.colors.gray7};
    font-size: ${({ theme }) => theme.font.fontSize.body14};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
    list-style-position: inside;

    //그냥 li 태그 쓰면 디자인이 다르게 나옴
  }
`;
 